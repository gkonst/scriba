'use strict';

angular.module('scribaApp')
  .service('BookcaseService', function ($resource) {
    return $resource('/api/bookcases/:bookcaseId')
  });

