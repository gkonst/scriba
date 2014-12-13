'use strict';

angular.module('scriba.account')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
    var vm = this;
    vm.user = {};
    vm.done = false;

    vm.changePassword = function (form) {
      $scope.$broadcast('show-errors-check-validity');
      if (form.$valid) {
        Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
          .then(function () {
            vm.done = true;
          })
          .catch(function (err) {
            form.oldPassword.$setValidity(err.data.code, false);
          });
      }
    };
  });
