'use strict';

angular.module('scriba.book')
  .factory('Book', function ($resource) {
    return $resource('/api/book/:id');
  });

