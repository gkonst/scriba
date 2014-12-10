'use strict';

angular.module('scriba.account')
  .controller('LoginCtrl', function (Auth, $location) {
    var data = this;
    data.user = {};
    data.errors = {};

    this.login = function (form) {
      data.submitted = true;

      if (form.$valid) {
        Auth.login({
          email: data.user.email,
          password: data.user.password
        }).then(function () {
          $location.path('/bookcase');
        }).catch(function (err) {
          data.errors.other = err.message;
        });
      }
    };
  });
