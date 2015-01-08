'use strict';

angular.module('scriba.bookcase')
  .controller('BookcaseListCtrl', function ($log, $modal, Modal, Bookcase) {
    var vm = this;

    function refresh() {
      vm.bookcases = Bookcase.query();
    }

    function detail(id) {
      $modal.open({
        templateUrl: 'app/bookcase/bookcase.detail.html',
        controller: 'ModalDetailCtrl',
        controllerAs: 'bookcaseDetailCtrl',
        resolve: {
          id: function () {
            return id;
          },
          ModelFactory: function () {
            return Bookcase;
          },
          initial: function () {
            return {};
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
  });
