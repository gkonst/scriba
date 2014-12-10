'use strict';

angular.module('scriba.account', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/account/login/login.html',
      })
      .when('/signup', {
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/settings', {
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });
