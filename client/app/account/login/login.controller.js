'use strict';

angular.module('scriba.account')
  .controller('LoginCtrl', function ($scope, $location, Auth) {
    var vm = this;
    vm.user = {};

    vm.login = function (form) {
      $scope.$broadcast('show-errors-check-validity');
      if (form.$valid) {
        Auth.login(vm.user)
          .then(function () {
            $location.path('/');
          })
          .catch(function (err) {
            form[err.data.field].$setValidity(err.data.message, false);
          });
      }
    };
  });
