'use strict';

describe('Controller: LoginCtrl', function () {
  beforeEach(module('scriba.account'));

  var sut, authMock, locationMock, scopeMock, loginPromise;

  beforeEach(inject(function ($controller, $q, $rootScope) {
    locationMock = {path: sinon.stub()};
    loginPromise = promise($q, $rootScope);
    authMock = {login: sinon.stub().returns(loginPromise)};
    scopeMock = {$broadcast: sinon.stub()};
    sut = $controller('LoginCtrl', {
      Auth: authMock,
      $location: locationMock,
      $scope: scopeMock
    });
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

  it('should do nothing if form is invalid', function () {
    // when
    sut.login({$valid: false});

    // then
    locationMock.path.should.not.be.called;
    authMock.login.should.not.be.called;
  });

  it('should change location to / if form valid and login success', function () {
    // when
    sut.login({$valid: true});
    loginPromise.resolve();

    // then
    locationMock.path.should.be.calledWith('/');
  });

  it('should change location to / if form valid and login success', function () {
    // given
    var err = {data: {field: 'someField', message: 'someMessage'}};
    var form = {$valid: true, someField: {$setValidity: sinon.stub()}};

    // when
    sut.login(form);
    loginPromise.reject(err);

    // then
    locationMock.path.should.not.be.called;
    form.someField.$setValidity.should.be.called;
  });
});

