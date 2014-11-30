'use strict';

describe('Controller: BookListCtrl', function () {

  beforeEach(module('scriba.book'));

  var BookListCtrl;

  beforeEach(inject(function ($controller) {
    BookListCtrl = $controller('BookListCtrl');
  }));

  it('should ...', function () {
    "foo".should.be.equal('foo');
  });
});
