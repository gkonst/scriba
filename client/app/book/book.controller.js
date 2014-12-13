'use strict';

angular.module('scriba.book')
  .controller('BookListCtrl', function ($log, $modal, $routeParams, Bookcase) {
    var vm = this;

    vm.bookcaseId = $routeParams.bookcaseId;

    function refresh() {
      vm.books = Bookcase.queryBooks({id: vm.bookcaseId});
    }

    vm.add = function () {
      var modalInstance = $modal.open({
        templateUrl: 'app/book/book.detail.html',
        controller: 'BookDetailCtrl',
        controllerAs: 'bookDetailCtrl',
        resolve: {
          bookcaseId: function () {
            return vm.bookcaseId;
          }
        }
      });

      modalInstance.result.then(function () {
        refresh();
      });
    };

    refresh();
  })
  .controller('BookDetailCtrl', function ($modalInstance, Book, bookcaseId) {
    var vm = this;

    vm.book = {
      bookcase: bookcaseId,
      shelf: 1,
      line: 1
    };

    vm.save = function (bookForm) {
      if (bookForm.$valid) {
        Book.save(vm.book, function () {
          $modalInstance.close();
        });
      }
    };

    vm.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
