'use strict';

angular.module('scriba.bookcase')
  .service('BookcaseService', function ($resource) {
    return $resource('/api/bookcases/:bookcaseId');
  });

