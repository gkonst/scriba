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
  'scriba.admin',
  'scriba.bookcase',
  'scriba.book'
])
  .config(['showErrorsConfigProvider', function (showErrorsConfigProvider) {
    showErrorsConfigProvider.showSuccess(true);
    showErrorsConfigProvider.trigger('keypress');
  }])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/bookcase'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $localStorage, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($localStorage.token) {
          config.headers.Authorization = 'Bearer ' + $localStorage.token;
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function (response) {
        if (response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          delete $localStorage.token;
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
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
