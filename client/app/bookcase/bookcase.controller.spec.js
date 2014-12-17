'use strict';

describe('Controller: BookcaseListCtrl', function () {
  beforeEach(module('scriba.bookcase'));

  var sut, $httpBackend, scope, modalMock, deleteConfirmed;

  beforeEach(inject(function (_$httpBackend_, $controller) {
    $httpBackend = _$httpBackend_;
    modalMock = {
      confirm: {
        delete: function (callback) {
          return function (name, id) {
            if (deleteConfirmed) {
              callback(id);
            }
          };
        }
      }
    };
    sut = $controller('BookcaseListCtrl', {
      Modal: modalMock,
      $scope: scope
    });
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch list of bookcases', function () {
    // given
    $httpBackend.expectGET('/api/bookcase')
      .respond([{name: 'test1'}, {name: 'test2'}]);

    // when
    $httpBackend.flush();

    // then
    sut.bookcases.should.have.length(2);
  });

  it('should remove bookcase and refresh if confirmed', function () {
    // given
    var id = 'testId';
    deleteConfirmed = true;
    $httpBackend.expectGET('/api/bookcase')
      .respond([{name: 'test1'}, {name: 'test2'}]);
    $httpBackend.expectDELETE('/api/bookcase/testId')
      .respond();
    $httpBackend.expectGET('/api/bookcase')
      .respond([{name: 'test1'}]);

    // when
    sut.remove('name', id);
    $httpBackend.flush();

    // then
    sut.bookcases.should.have.length(1);
  });

  it('should not remove bookcase and if not confirmed', function () {
    // given
    var id = 'testId';
    deleteConfirmed = false;
    $httpBackend.expectGET('/api/bookcase')
      .respond([{name: 'test1'}, {name: 'test2'}]);

    // when
    sut.remove('name', id);
    $httpBackend.flush();

    // then
    sut.bookcases.should.have.length(2);
  });
});

describe('Controller: BookcaseDetailCtrl', function () {
  beforeEach(module('scriba.bookcase'));

  var sut, $httpBackend, $controller, modalInstanceMock, id;

  beforeEach(inject(function (_$httpBackend_, _$controller_) {
    $httpBackend = _$httpBackend_;
    $controller = _$controller_;
    modalInstanceMock = {close: sinon.spy()};
    id = undefined;
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  function initCtrl() {
    sut = $controller('BookcaseDetailCtrl', {
      $modalInstance: modalInstanceMock,
      id: id
    });
  }

  it('should create empty bookcase if id undefined', function () {
    // given
    id = undefined;

    // when
    initCtrl();

    // then
    sut.bookcase.should.not.be.undefined;
  });

  it('should fetch bookcase if id defined', function () {
    // given
    id = 'testId33';
    var bookcase = {name: 'test33', _id: 'testId33'};
    $httpBackend.expectGET('/api/bookcase/testId33')
      .respond(200, bookcase);

    // when
    initCtrl();
    $httpBackend.flush();

    // then
    sut.bookcase.name.should.equal(bookcase.name);
    sut.bookcase._id.should.equal(bookcase._id);

  });

  it('should save new bookcase and close modal if form valid and _id undefined', function () {
    // given
    initCtrl();
    sut.bookcase = {name: 'test1'};
    $httpBackend.expectPOST('/api/bookcase', {name: 'test1'})
      .respond(201, {name: 'test1'});

    // when
    sut.save({$valid: true});
    $httpBackend.flush();

    // then
    modalInstanceMock.close.should.have.been.calledOnce;
  });

  it('should update bookcase and close modal if form valid and _id defined', function () {
    // given
    initCtrl();
    sut.bookcase = {_id: 'testId', name: 'test2'};
    $httpBackend.expectPUT('/api/bookcase/testId', {_id: 'testId', name: 'test2'})
      .respond(201, {_id: 'testId', name: 'test2'});

    // when
    sut.save({$valid: true});
    $httpBackend.flush();

    // then
    modalInstanceMock.close.should.have.been.calledOnce;
  });

  it('should not save bookcase and close modal if form invalid', function () {
    // given
    sut.bookcase = {name: 'test1'};

    // when
    sut.save({$valid: false});

    // then
    modalInstanceMock.close.should.not.have.been.called;
  });
});
