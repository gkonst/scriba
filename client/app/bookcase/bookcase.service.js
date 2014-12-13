'use strict';

angular.module('scriba.bookcase')
  .factory('Bookcase', function ($resource) {
    return $resource('/api/bookcases/:id/:action', {}, {
      queryBooks: {
        method: 'GET',
        params: {
          action: 'books'
        },
        isArray: true
      }
    });
  });

