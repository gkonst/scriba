'use strict';

angular.module('scriba.book')
  .controller('BookListCtrl', function ($log, $modal, $routeParams, BookcaseService) {
    var data = this;

    data.bookcaseId = $routeParams.bookcaseId;

    function refresh() {
      data.books = BookcaseService.queryBooks({bookcaseId: data.bookcaseId});
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
  .controller('BookDetailCtrl', function ($modalInstance, BookService, bookcaseId) {
    this.book = {bookcase: bookcaseId};

    this.save = function (bookForm) {
      if (bookForm.$valid) {
        BookService.save(this.book, function () {
          $modalInstance.close();
        });
      }
    };

    this.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
