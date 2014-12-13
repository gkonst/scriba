'use strict';

angular.module('scribaApp', [
  'ngStorage',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngMessages',
  'ui.bootstrap',
  'ui.bootstrap.showErrors',
  'scriba.account',
  'scriba.bookcase',
  'scriba.book'
])
  .config(['showErrorsConfigProvider', function (showErrorsConfigProvider) {
    showErrorsConfigProvider.showSuccess(true);
    showErrorsConfigProvider.trigger('keypress');
  }])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/bookcase'
      });

    $locationProvider.html5Mode(true);
  });
