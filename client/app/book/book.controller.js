'use strict';

angular.module('scriba.book')
  .controller('BookListCtrl', function ($log, $modal, $routeParams, Bookcase) {
    var data = this;

    data.bookcaseId = $routeParams.bookcaseId;

    function refresh() {
      data.books = Bookcase.queryBooks({id: data.bookcaseId});
    }

    this.add = function () {
      var modalInstance = $modal.open({
        templateUrl: 'app/book/book.detail.html',
        controller: 'BookDetailCtrl',
        controllerAs: 'bookDetailCtrl',
        resolve: {
          bookcaseId: function () {
            return data.bookcaseId;
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
    this.book = {
      bookcase: bookcaseId,
      shelf: 1,
      line: 1
    };

    this.save = function (bookForm) {
      if (bookForm.$valid) {
        Book.save(this.book, function () {
          $modalInstance.close();
        });
      }
    };

    this.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
