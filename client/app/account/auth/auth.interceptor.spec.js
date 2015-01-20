'use strict';

describe('Factory: AuthInterceptor', function () {
  beforeEach(module('scriba.account'));

  var sut, locationMock, localStorageMock;

  beforeEach(module(function ($provide) {
    locationMock = {path: sinon.stub()};
    localStorageMock = {};
    $provide.value('$location', locationMock);
    $provide.value('$localStorage', localStorageMock);
  }));

  beforeEach(inject(function (AuthInterceptor) {
    sut = AuthInterceptor;
  }));

  it('should not add token to request if session storage is empty', function () {
    // given
    var request = {
      url: 'api/user/',
      headers: {}
    };

    // when
    var result = sut.request(request);

    // then
    should.not.exist(result.headers.Authorization);
  });

  it('should add token to request if session storage is NOT empty', function () {
    // given
    var request = {
      url: 'api/user/',
      headers: {}
    };
    var token = 'some token';
    localStorageMock.token = token;

    // when
    var result = sut.request(request);

    // then
    result.headers.Authorization.should.contain(token);
  });

  it('should redirect to / in case of 401 response', function () {
    // given
    var request = {
      status: 401
    };

    // when
    sut.responseError(request);

    // then
    locationMock.path.should.be.calledWith('/login');
  });

  it('should not redirect to / in case of non-401 response', function () {
    // given
    var request = {
      status: 200
    };

    // when
    sut.responseError(request);

    // then
    locationMock.path.should.not.be.called;
  });

});
