'use strict';

angular.module('scribaApp')
  .directive('formInput', function ($compile) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        ngModel: '='
      },
      templateUrl: 'components/form/input.html',
      link: function (scope, element, attrs) {
        scope.opts = attrs;
        scope.opts.inputName = scope.opts.id;
        $compile(element.contents())(scope);
      }
    };
  });
