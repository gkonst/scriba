'use strict';

angular.module('scriba.bookcase', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/bookcase', {
        templateUrl: 'app/bookcase/bookcase.list.html'
      });
  });
