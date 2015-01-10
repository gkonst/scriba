'use strict';

angular.module('scriba.book')
  .controller('BookListCtrl', function ($log, $modal, $routeParams, Modal, Book, Bookcase) {
    var vm = this;

    vm.bookcaseId = $routeParams.bookcaseId;

    function refresh() {
      if (vm.bookcaseId) {
        vm.books = Bookcase.queryBooks({id: vm.bookcaseId});
      } else {
        vm.books = Book.query();
      }
    }

    function detail(id) {
      var modalInstance = $modal.open({
        templateUrl: 'app/book/book.detail.html',
        controller: 'ModalDetailCtrl',
        controllerAs: 'bookDetailCtrl',
        resolve: {
          id: function () {
            return id;
          },
          ModelFactory: function () {
            return Book;
          },
          initial: function () {
            return {
              bookcase: vm.bookcaseId,
              shelf: 1,
              line: 1
            };
          }
        }
      });

      modalInstance.result.then(function () {
        refresh();
      });
    }

    vm.add = vm.edit = detail;

    vm.remove = Modal.confirm.delete(function (id) {
      Book.remove({id: id}, function () {
        refresh();
      });
    });

    refresh();
  });
