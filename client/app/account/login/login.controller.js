'use strict';

angular.module('scriba.account')
  .controller('LoginCtrl', function ($scope, $location, Auth) {
    var vm = this;
    vm.user = {};

    vm.login = function (form) {
      $scope.$broadcast('show-errors-check-validity');
      if (form.$valid) {
        Auth.login({
          email: vm.user.email,
          password: vm.user.password
        }).then(function () {
          $location.path('/bookcase');
        }).catch(function (err) {
          form[err.field].$setValidity(err.message, false);
        });
      }
    };
  });
