'use strict';

describe('Controller: BookcaseCtrl', function () {

  // load the controller's module
  beforeEach(module('scriba.bookcase'));

  var BookcaseCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BookcaseCtrl = $controller('BookcaseCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
