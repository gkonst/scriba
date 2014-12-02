'use strict';

angular.module('scriba.book')
  .controller('BookListCtrl', function ($log, $modal, $routeParams, BookcaseService) {
    var data = this;

    function refresh() {
      data.books = BookcaseService.queryBooks({bookcaseId: $routeParams.bookcaseId});
    }

    this.add = function () {
      var modalInstance = $modal.open({
        templateUrl: 'app/book/book.detail.html',
        controller: 'BookDetailCtrl',
        controllerAs: 'bookDetailCtrl'
      });

      modalInstance.result.then(function () {
        refresh();
      });
    };

    refresh();
  })
  .controller('BookDetailCtrl', function ($modalInstance, BookService) {
    this.book = {};

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
