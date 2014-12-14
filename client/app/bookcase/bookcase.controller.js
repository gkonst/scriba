'use strict';

angular.module('scriba.bookcase')
  .controller('BookcaseListCtrl', function ($modal, $log, Modal, Bookcase) {
    var vm = this;

    function refresh() {
      vm.bookcases = Bookcase.query();
    }

    function detail(id) {
      $modal.open({
        templateUrl: 'app/bookcase/bookcase.detail.html',
        controller: 'BookcaseDetailCtrl',
        controllerAs: 'bookcaseDetailCtrl',
        resolve: {
          id: function () {
            return id;
          }
        }
      }).result.then(function () {
          refresh();
        });
    }

    vm.add = vm.edit = detail;

    vm.remove = Modal.confirm.delete(function (id) {
      Bookcase.remove({id: id}, function () {
        refresh();
      });
    });

    refresh();
  })
  .controller('BookcaseDetailCtrl', function ($log, $modalInstance, Bookcase, id) {
    var vm = this;

    if (angular.isDefined(id)) {
      $log.debug('Editing bookcase with id:', id);
      vm.bookcase = Bookcase.get({id: id});
    } else {
      $log.debug('Creating new bookcase');
      vm.bookcase = {};
    }

    vm.save = function (bookcaseForm) {
      if (bookcaseForm.$valid) {
        if (angular.isDefined(vm.bookcase._id)) {
          Bookcase.update({id: vm.bookcase._id}, vm.bookcase, $modalInstance.close);
        } else {
          Bookcase.save(vm.bookcase, $modalInstance.close);
        }
      }
    };

    vm.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
);
