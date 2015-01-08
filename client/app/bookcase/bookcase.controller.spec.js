'use strict';

describe('Controller: BookcaseListCtrl', function () {
  beforeEach(module('scriba.bookcase'));

  var sut, $httpBackend, modalMock, deleteConfirmed;

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
      Modal: modalMock
    });
    deleteConfirmed = false;
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
