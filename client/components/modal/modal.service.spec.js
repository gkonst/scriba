'use strict';

describe('Service: Modal.confirm.delete', function () {
  beforeEach(module('scribaApp'));

  var sut, modalServiceMock, modalMock;


  beforeEach(module(function ($provide) {
    modalMock = {};
    modalServiceMock = {
      open: sinon.stub().returns(modalMock)
    };
    $provide.value('$modal', modalServiceMock);
  }));

  beforeEach(inject(function (Modal, $q, $rootScope) {
    sut = Modal;
    modalMock.result = promise($q, $rootScope);
  }));

  function promise($q, $rootScope) {
    var deferred = $q.defer();
    var result = deferred.promise;
    result.resolve = function () {
      deferred.resolve();
      $rootScope.$apply();
    };
    result.reject = function (val) {
      deferred.reject(val);
      $rootScope.$apply();
    };
    return result;
  }

  it('should open modal with name in html', function () {
    // given
    var confirm = sut.confirm.delete(angular.noop);
    var name = 'some name';

    // when
    confirm(name);

    // then
    modalServiceMock.open.should.be.calledWith(sinon.match.has('scope', sinon.match.has('modal', sinon.match.has('html', sinon.match(name)))));
  });

  it('should call given function with arguments if confirmed', function () {
    // given
    var deletion = sinon.spy();
    var confirm = sut.confirm.delete(deletion);

    // when
    confirm('some name', 'id');
    modalMock.result.resolve();

    // then
    deletion.should.be.calledWith('id');
  });

  it('should not call given function if not confirmed', function () {
    // given
    var deletion = sinon.spy();
    var confirm = sut.confirm.delete(deletion);

    // when
    confirm('some name', 'id');
    modalMock.result.reject();

    // then
    deletion.should.not.be.called;
  });
});
