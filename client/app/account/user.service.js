'use strict';

angular.module('scriba.account')
  .factory('User', function ($resource) {
    return $resource('/api/user/:id/:controller', {
        id: '@_id'
      },
      {
        login: {
          method: 'POST',
          url: '/auth/local'
        },
        changePassword: {
          method: 'PUT',
          params: {
            controller: 'password'
          }
        },
        get: {
          method: 'GET',
          params: {
            id: 'me'
          }
        }
      });
  });
