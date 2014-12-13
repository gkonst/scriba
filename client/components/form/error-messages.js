'use strict';

angular.module('scribaApp')
  .directive('errorMessages', function () {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        field: '='
      },
      templateUrl: 'components/form/error-messages.html'
    };
  })
  .directive('validOnChange', function ($interpolate) {
    return {
      restrict: 'A',
      require: '^form',
      scope: {errorType: '@ngMessage'},
      link: function (scope, element, attrs, form) {
        var inputEl = element.closest('.form-group').find('.form-control');
        var inputNgEl = angular.element(inputEl);
        var inputName = $interpolate(inputNgEl.attr('name'))(scope);
        inputEl.on('change', function () {
          scope.$apply(function () {
            form[inputName].$setValidity(scope.errorType, true);
            delete form[inputName].$error[scope.errorType];
          });
        });

      }
    };
  });
