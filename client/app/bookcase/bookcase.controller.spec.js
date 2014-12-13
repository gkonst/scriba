'use strict';

describe('Controller: BookcaseListCtrl', function () {
  beforeEach(module('scriba.bookcase'));

  var bookcaseListCtrl, $httpBackend;

  beforeEach(inject(function (_$httpBackend_, $controller) {
    $httpBackend = _$httpBackend_;
    bookcaseListCtrl = $controller('BookcaseListCtrl');
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
});

describe('Controller: BookcaseDetailCtrl', function () {
  beforeEach(module('scriba.bookcase'));

  var bookcaseDetailCtrl, $httpBackend, modalInstanceMock;

  beforeEach(inject(function (_$httpBackend_, $controller) {
    $httpBackend = _$httpBackend_;
    modalInstanceMock = {close: sinon.spy()};
    bookcaseDetailCtrl = $controller('BookcaseDetailCtrl', {
      $modalInstance: modalInstanceMock
    });
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should save bookcase and close modal if form valid', function () {
    // given
    bookcaseDetailCtrl.bookcase = {name: 'test1'};
    $httpBackend.expectPOST('/api/bookcase', {name: 'test1'})
      .respond(201, {name: 'test1'});

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
