'use strict';

angular.module('scriba.account', ['ngRoute', 'ngStorage', 'ngResource'])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/account/login/login.html'
      })
      .when('/login/:sessionToken', {
        template: ' ',
        controller: function ($routeParams, Auth, $location) {
          if ($routeParams.sessionToken) {
            Auth.postLogin({token: $routeParams.sessionToken}, function () {
              $location.path('/');
            });
          }
        }
      })
      .when('/signup', {
        templateUrl: 'app/account/signup/signup.html'
      })
      .when('/settings', {
        templateUrl: 'app/account/settings/settings.html'
      });

    $httpProvider.interceptors.push('AuthInterceptor');
  })
  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function (loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });
