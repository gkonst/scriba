'use strict';

angular.module('scriba.bookcase')
  .controller('BookcaseListCtrl', function ($modal, $log, Bookcase) {
    var data = this;

    function refresh() {
      data.bookcases = Bookcase.query();
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
  .controller('BookcaseDetailCtrl', function ($modalInstance, Bookcase) {
    this.bookcase = {};

    this.save = function (bookcaseForm) {
      if (bookcaseForm.$valid) {
        Bookcase.save(this.bookcase, function () {
          $modalInstance.close();
        });
      }
    };

    this.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
