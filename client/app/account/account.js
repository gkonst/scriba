'use strict';

angular.module('scriba.account', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/account/login/login.html'
      })
      .when('/login/:sessionToken', {
        template: ' ',
        controller: function ($routeParams, Auth, $location) {
          if ($routeParams.sessionToken) {
            Auth.setSessionToken($routeParams.sessionToken, function () {
              $location.path('/');
            });
          }
        }
      })
      .when('/signup', {
        templateUrl: 'app/account/signup/signup.html'
      })
      .when('/settings', {
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });
