'use strict';

angular.module('scriba.account')
  .factory('Auth', function Auth($location, $localStorage, User) {
    var currentUser = $localStorage.token ? User.get() : {};

    function postLogin(data, callback) {
      var cb = callback || angular.noop;
      $localStorage.token = data.token;
      currentUser = User.get(cb);
    }

    function logout() {
      delete $localStorage.token;
      currentUser = {};
    }

    function isLoggedIn() {
      return currentUser.hasOwnProperty('_id');
    }

    return {
      postLogin: postLogin,

      login: function (user) {
        return User.login(user, postLogin).$promise;
      },

      logout: logout,

      createUser: function (user) {
        return User.save(user, postLogin).$promise;
      },

      changePassword: function (oldPassword, newPassword) {
        return User.changePassword({}, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }).$promise;
      },

      getCurrentUser: function () {
        return currentUser;
      },

      isLoggedIn: isLoggedIn,

      isLoggedInAsync: function (cb) {
        if (currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function () {
            cb(true);
          }).catch(function () {
            cb(false);
          });
        } else if (isLoggedIn()) {
          cb(true);
        } else {
          cb(false);
        }
      }
    };
  });
