'use strict';

describe('Factory: Auth', function () {
  beforeEach(module('scriba.account'));

  var sut, locationMock, localStorageMock, $httpBackend, $rootScope;

  var authData = {username: 'foo', password: 'bar'};
  var user = {username: 'foo', _id: '123'};
  var token = 'some token';

  beforeEach(module(function ($provide) {
    locationMock = {path: sinon.stub()};
    localStorageMock = {};
    $provide.value('$location', locationMock);
    $provide.value('$localStorage', localStorageMock);
  }));

  beforeEach(inject(function (Auth, _$httpBackend_, _$rootScope_) {
    sut = Auth;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should login user', function () {
    // given
    $httpBackend.expectPOST('/auth/local', authData)
      .respond({token: token});
    $httpBackend.expectGET('/api/user/me')
      .respond(user);

    // when
    var result = sut.login(authData);
    $httpBackend.flush();

    // then
    result.$$state.value.$resolved.should.be.true;
    localStorageMock.token.should.equal(token);
    sut.getCurrentUser().should.exist;
    sut.getCurrentUser()._id.should.equal(user._id);
  });

  function login() {
    $httpBackend.expectPOST('/auth/local', authData)
      .respond({token: token});
    $httpBackend.expectGET('/api/user/me')
      .respond(user);
    sut.login(authData);
    $httpBackend.flush();
  }

  it('should logout user', function () {
    // given
    login();

    // when
    sut.logout();

    // then
    should.not.exist(localStorageMock.token);
    sut.getCurrentUser().should.not.haveOwnProperty('_id');
  });

  it('should create user', function () {
    // given
    var newUser = {username: 'foo', password: 'bar'};
    var user = {username: 'foo', _id: '123'};
    $httpBackend.expectPOST('/api/user', newUser)
      .respond(201, {token: token});
    $httpBackend.expectGET('/api/user/me')
      .respond(user);

    // when
    var result = sut.createUser(newUser);
    $httpBackend.flush();

    // then
    result.$$state.value.$resolved.should.be.true;
    localStorageMock.token.should.equal(token);
    sut.getCurrentUser().should.exist;
    sut.getCurrentUser()._id.should.equal(user._id);
  });

  it('should change user password', function () {
    // given
    var passwords = {
      oldPassword: 'old password',
      newPassword: 'new password'
    };
    $httpBackend.expectPUT('/api/user/me/password', passwords)
      .respond(204);

    // when
    var result = sut.changePassword(passwords.oldPassword, passwords.newPassword);
    $httpBackend.flush();

    // then
    result.$$state.value.$resolved.should.be.true;
  });

  it('should determine is user logged in if user is not logged in', function () {
    // when
    var result = sut.isLoggedIn();

    // then
    result.should.be.false;
  });

  it('should determine is user logged in if user is logged in', function () {
    // given
    login();

    // when
    var result = sut.isLoggedIn();

    // then
    result.should.be.true;
  });

  it('should determine is user logged in if user is not logged in asynchronously', function () {
    // given
    var cb = sinon.stub();

    // when
    sut.isLoggedInAsync(cb);

    // then
    cb.should.be.calledWith(false);
  });

  it('should determine is user logged in if user is logged in asynchronously', function () {
    // given
    var cb = sinon.stub();
    login();

    // when
    sut.isLoggedInAsync(cb);
    $rootScope.$apply();

    // then
    cb.should.be.calledWith(true);
  });
});
