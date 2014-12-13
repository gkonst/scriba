'use strict';

angular.module('scriba.account')
  .factory('AuthInterceptor', function ($rootScope, $q, $localStorage, $location) {
    return {
      request: function (request) {
        request.headers = request.headers || {};
        if ($localStorage.token) {
          request.headers.Authorization = 'Bearer ' + $localStorage.token;
        }
        return request;
      },
      responseError: function (response) {
        if (response.status === 401) {
          delete $localStorage.token;
          $location.path('/login');
        }
        return $q.reject(response);
      }
    };
  });
