'use strict';

angular.module('scribaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/bookcase', {
        templateUrl: 'app/bookcase/bookcase.list.html'
      });
  });
