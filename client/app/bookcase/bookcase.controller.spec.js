'use strict';

describe('Controller: BookcaseListCtrl', function () {

  // load the controller's module
  beforeEach(module('scriba.bookcase'));

  var bookcaseListCtrl, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller) {
    $httpBackend = _$httpBackend_;
    bookcaseListCtrl = $controller('BookcaseListCtrl');
  }));

  it('should fetch list of bookcases', function () {
    // given
    $httpBackend.expectGET('/api/bookcases')
      .respond([{name: 'test1'}, {name: 'test2'}]);

    // when
    $httpBackend.flush();

    // then
    bookcaseListCtrl.bookcases.should.have.length(2);
  });
});
