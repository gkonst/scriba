'use strict';

angular.module('scriba.bookcase')
  .factory('Bookcase', function ($resource) {
    return $resource('/api/bookcase/:id/:action', {}, {
      update: {
        method: 'PUT'
      },
      queryBooks: {
        method: 'GET',
        params: {
          action: 'books'
        }
      }
    });
  });

