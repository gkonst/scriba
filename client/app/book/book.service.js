'use strict';

angular.module('scriba.book')
  .service('BookService', function ($resource) {
    return $resource('/api/books/:bookId');
  });

