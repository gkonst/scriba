'use strict';

angular.module('scriba.bookcase')
  .controller('BookcaseListCtrl', function ($modal, $log, Modal, Bookcase) {
    var vm = this;

    function refresh() {
      vm.bookcases = Bookcase.query();
    }

    vm.add = function () {
      var modalInstance = $modal.open({
        templateUrl: 'app/bookcase/bookcase.detail.html',
        controller: 'BookcaseDetailCtrl',
        controllerAs: 'bookcaseDetailCtrl'
      });

      modalInstance.result.then(function () {
        refresh();
      });
    };

    vm.remove = Modal.confirm.delete(function (id) {
      Bookcase.remove({id: id}, function () {
        refresh();
      });
    });

    refresh();
  })
  .controller('BookcaseDetailCtrl', function ($modalInstance, Bookcase) {
    var vm = this;
    vm.bookcase = {};

    vm.save = function (bookcaseForm) {
      if (bookcaseForm.$valid) {
        Bookcase.save(vm.bookcase, function () {
          $modalInstance.close();
        });
      }
    };

    vm.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
