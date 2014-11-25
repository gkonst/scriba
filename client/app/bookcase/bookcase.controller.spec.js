'use strict';

describe('Controller: BookcaseCtrl', function () {

  // load the controller's module
  beforeEach(module('scriba.bookcase'));

  var bookcaseCtrl, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller) {
    $httpBackend = _$httpBackend_;
    bookcaseCtrl = $controller('BookcaseCtrl');
  }));

  it('should fetch list of bookcases', function () {
    // given
    $httpBackend.expectGET('/api/bookcases')
      .respond([{name: 'test1'}, {name: 'test2'}]);

    // when
    $httpBackend.flush();

    // then
    expect(bookcaseCtrl.bookcases.length).toBe(2);
  });
});
