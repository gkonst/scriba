'use strict';

angular.module('scriba.account')
  .controller('SignupCtrl', function ($scope, Auth, $location) {
    var vm = this;
    vm.user = {};

    vm.register = function (form) {
      $scope.$broadcast('show-errors-check-validity');
      if (form.$valid) {
        Auth.createUser({
          name: vm.user.name,
          email: vm.user.email,
          password: vm.user.password
        })
          .then(function () {
            $location.path('/');
          })
          .catch(function (err) {
            angular.forEach(err.data.errors, function (error, field) {
              form[field].$setValidity(error.message, false);
            });
          });
      }
    };
  });
