'use strict';

describe('Controller: BookListCtrl', function () {
  beforeEach(module('scriba.book', 'scriba.bookcase'));

  var sut, $httpBackend, routeParams, $controller, modalMock;

  beforeEach(inject(function (_$httpBackend_, _$controller_) {
    $httpBackend = _$httpBackend_;
    $controller = _$controller_;
    modalMock = {
      confirm: {
        delete: function (callback) {
          return function (name, id) {
            callback(id);
          };
        }
      }
    };
    routeParams = {};
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  function initCtrl() {
    sut = $controller('BookListCtrl', {
      $routeParams: routeParams,
      Modal: modalMock
    });
  }

  it('should fetch list of books', function () {
    // given
    $httpBackend.expectGET('/api/book')
      .respond([{name: 'test1'}, {name: 'test2'}]);

    // when
    initCtrl();
    $httpBackend.flush();

    // then
    sut.books.should.have.length(2);
  });


  it('should fetch bookcase with list of books for given bookcaseId', function () {
    // given
    routeParams = {bookcaseId: '123'};
    $httpBackend.expectGET('/api/bookcase/123/books')
      .respond({name: 'testBookcase', _id: '123', books: [{name: 'test1'}, {name: 'test2'}]});

    // when
    initCtrl();
    $httpBackend.flush();

    // then
    sut.bookcase._id.should.equal('123');
    sut.books.should.have.length(2);
  });

  it('should remove book and refresh if confirmed', function () {
    // given
    var id = 'testId';
    $httpBackend.expectGET('/api/book')
      .respond([{name: 'test1'}, {name: 'test2'}]);
    $httpBackend.expectDELETE('/api/book/testId')
      .respond();
    $httpBackend.expectGET('/api/book')
      .respond([{name: 'test1'}]);
    initCtrl();

    // when
    sut.remove('name', id);
    $httpBackend.flush();

    // then
    sut.books.should.have.length(1);
  });
});
