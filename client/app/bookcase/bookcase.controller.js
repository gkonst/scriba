'use strict';

angular.module('scriba.bookcase')
  .controller('BookcaseCtrl', function ($modal, $log, BookcaseService) {
    var data = this;

    function refresh() {
      data.bookcases = BookcaseService.query();
    }

    this.add = function () {
      var modalInstance = $modal.open({
        templateUrl: 'app/bookcase/bookcase.detail.html',
        controller: 'BookcaseDetailCtrl',
        controllerAs: 'bookcaseDetailCtrl'
      });

      modalInstance.result.then(function () {
        refresh();
      });
    };

    refresh();
  })
  .controller('BookcaseDetailCtrl', function ($modalInstance, BookcaseService) {
    this.ok = function () {
      $modalInstance.close();
    };

    this.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
