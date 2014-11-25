'use strict';

angular.module('scriba.bookcase', ['ngRoute', 'ngResource', 'ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/bookcase', {
        templateUrl: 'app/bookcase/bookcase.list.html'
      });
  });
