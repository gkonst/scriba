'use strict';

angular.module('scriba.bookcase')
  .controller('BookcaseListCtrl', function ($modal, $log, BookcaseService) {
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
    this.bookcase = {};

    this.save = function (bookcaseForm) {
      if (bookcaseForm.$valid) {
        BookcaseService.save(this.bookcase, function () {
          $modalInstance.close();
        });
      }
    };

    this.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
