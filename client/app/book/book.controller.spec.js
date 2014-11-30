'use strict';

describe('Controller: BookListCtrl', function () {

  beforeEach(module('scriba.book'));

  var BookListCtrl;

  beforeEach(inject(function ($controller) {
    BookListCtrl = $controller('BookListCtrl');
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
