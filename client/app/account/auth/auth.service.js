'use strict';

angular.module('scriba.account')
  .factory('Auth', function Auth($location, $localStorage, User) {
    var currentUser = $localStorage.token ? User.get() : {};

    function postLogin(data) {
      $localStorage.token = data.token;
      currentUser = User.get();
    }

    function logout() {
      delete $localStorage.token;
      currentUser = {};
    }

    return {
      login: function (user) {
        return User.login(user, postLogin).$promise;
      },

      logout: logout,

      createUser: function (user) {
        return User.save(user, postLogin).$promise;
      },

      changePassword: function (oldPassword, newPassword) {
        return User.changePassword({id: currentUser._id}, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }).$promise;
      },

      getCurrentUser: function () {
        return currentUser;
      },

      isLoggedIn: function () {
        return currentUser.hasOwnProperty('role');
      },

      isLoggedInAsync: function (cb) {
        if (currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function () {
            cb(true);
          }).catch(function () {
            cb(false);
          });
        } else if (currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      setSessionToken: function (sessionToken, callback) {
        var cb = callback || angular.noop;
        $localStorage.token = sessionToken;
        currentUser = User.get(cb);
      }
    };
  });
