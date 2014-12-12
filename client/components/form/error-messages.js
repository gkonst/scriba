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
  });