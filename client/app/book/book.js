'use strict';

angular.module('scriba.book', ['ngRoute', 'ngResource', 'ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/book', {
        templateUrl: 'app/book/book.list.html'
      })
      .when('/bookcase/:bookcaseId/books', {
        templateUrl: 'app/book/book.list.html'
      });
  });
