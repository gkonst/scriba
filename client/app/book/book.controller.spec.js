'use strict';

describe('Controller: BookListCtrl', function () {

  beforeEach(module('scriba.book', 'scriba.bookcase'));

  var sut, $httpBackend, routeParams, $controller;

  beforeEach(inject(function (_$httpBackend_, _$controller_) {
    $httpBackend = _$httpBackend_;
    $controller = _$controller_;
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  function initCtrl() {
    sut = $controller('BookListCtrl', {
      $routeParams: routeParams
    });
  }

  it('should fetch list of books for given bookcaseId', function () {
    // given
    routeParams = {bookcaseId: '123'};
    $httpBackend.expectGET('/api/bookcase/123/books')
      .respond([{name: 'test1'}, {name: 'test2'}]);

    // when
    initCtrl();
    $httpBackend.flush();

    // then
    sut.books.should.have.length(2);
  });
});
