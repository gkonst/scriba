'use strict';

describe('Controller: BookcaseListCtrl', function () {
  beforeEach(module('scriba.bookcase'));

  var bookcaseListCtrl, $httpBackend, modalMock;

  beforeEach(inject(function (_$httpBackend_, $controller) {
    $httpBackend = _$httpBackend_;
    modalMock = {confirm: {delete: sinon.spy()}};
    bookcaseListCtrl = $controller('BookcaseListCtrl', {
      Modal: modalMock
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
    bookcaseListCtrl.bookcases.should.have.length(2);
  });

  // TODO add more test for add, edit and remove
});

describe('Controller: BookcaseDetailCtrl', function () {
  beforeEach(module('scriba.bookcase'));

  var bookcaseDetailCtrl, $httpBackend, $controller, modalInstanceMock, id;

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
    bookcaseDetailCtrl = $controller('BookcaseDetailCtrl', {
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
    bookcaseDetailCtrl.bookcase.should.not.be.undefined;
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
    bookcaseDetailCtrl.bookcase.name.should.equal(bookcase.name);
    bookcaseDetailCtrl.bookcase._id.should.equal(bookcase._id);

  });

  it('should save new bookcase and close modal if form valid and _id undefined', function () {
    // given
    initCtrl();
    bookcaseDetailCtrl.bookcase = {name: 'test1'};
    $httpBackend.expectPOST('/api/bookcase', {name: 'test1'})
      .respond(201, {name: 'test1'});

    // when
    bookcaseDetailCtrl.save({$valid: true});
    $httpBackend.flush();

    // then
    modalInstanceMock.close.should.have.been.calledOnce;
  });

  it('should update bookcase and close modal if form valid and _id defined', function () {
    // given
    initCtrl();
    bookcaseDetailCtrl.bookcase = {_id: 'testId', name: 'test2'};
    $httpBackend.expectPUT('/api/bookcase/testId', {_id: 'testId', name: 'test2'})
      .respond(201, {_id: 'testId', name: 'test2'});

    // when
    bookcaseDetailCtrl.save({$valid: true});
    $httpBackend.flush();

    // then
    modalInstanceMock.close.should.have.been.calledOnce;
  });

  it('should not save bookcase and close modal if form invalid', function () {
    // given
    bookcaseDetailCtrl.bookcase = {name: 'test1'};

    // when
    bookcaseDetailCtrl.save({$valid: false});

    // then
    modalInstanceMock.close.should.not.have.been.called;
  });
});
