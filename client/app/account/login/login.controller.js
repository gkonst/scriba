'use strict';

angular.module('scriba.account')
  .controller('LoginCtrl', function (Auth, $location) {
    var vm = this;
    vm.user = {};
    vm.errors = {};

    vm.login = function (form) {
      if (form.$valid) {
        Auth.login({
          email: vm.user.email,
          password: vm.user.password
        }).then(function () {
          $location.path('/bookcase');
        }).catch(function (err) {
          vm.errors.other = err.message;
        });
      }
    };
  });
