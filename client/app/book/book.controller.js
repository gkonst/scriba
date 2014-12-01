'use strict';

angular.module('scriba.book')
  .controller('BookListCtrl', function ($log, $routeParams, BookcaseService) {
    this.books = BookcaseService.queryBooks({bookcaseId: $routeParams.bookcaseId});
  });
