'use strict';

angular.module('scriba.bookcase')
  .service('BookcaseService', function ($resource) {
    return $resource('/api/bookcases/:bookcaseId', {}, {
      queryBooks: {method: 'GET', url: '/api/bookcases/:bookcaseId/books', isArray: true}
    });
  });

