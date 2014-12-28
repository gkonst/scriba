'use strict';

require('chai').should();
var request = require('supertest');
var proxyquire = require('proxyquire');
var express = require('express');
var UserStub = {};
var auth = proxyquire('./auth.service', {'../api/user/user.model': UserStub});
var config = require('../config/environment');

describe('Auth.isAuthenticated', function () {
  var app;
  var user = {name: 'testUser'};

  beforeEach(function () {
    app = express();
    app.get('/', auth.isAuthenticated(), function (req, res) {
      res.status(200).json(req.user);
    });
  });

  it('should return 401 status if token is missed in request', function (done) {
    request(app)
      .get('/')
      .expect(401, done);
  });

  it('should return 200 status if token exists in request header and user found', function (done) {
    UserStub.findById = function (id, clbk) {
      clbk(undefined, user);
    };

    request(app)
      .get('/')
      .set('Authorization', 'Bearer ' + auth.signToken('017b043ad0386eab3d164673'))
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        res.body.name.should.equal(user.name);
        done();
      });
  });

  it('should return 200 status if token exists in request param and user found', function (done) {
    UserStub.findById = function (id, clbk) {
      clbk(undefined, user);
    };

    request(app)
      .get('/?access_token=' + auth.signToken('017b043ad0386eab3d164673'))
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        res.body.name.should.equal(user.name);
        done();
      });
  });

  it('should return 401 status if token exists in request param and user not found', function (done) {
    UserStub.findById = function (id, clbk) {
      clbk(undefined, undefined);
    };

    request(app)
      .get('/')
      .set('Authorization', 'Bearer ' + auth.signToken('017b043ad0386eab3d164673'))
      .expect(401)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        res.error.text.should.have.string('User not found');
        done();
      });
  });
});

describe('Auth.setToken', function () {
  var app;
  var user = {_id: '017b043ad0386eab3d164673', name: 'testUser'};

  beforeEach(function () {
    app = express();
  });

  it('should redirect to /login/{token} if user is in req', function (done) {
    // given
    UserStub.findById = function (id, clbk) {
      clbk(undefined, user);
    };
    app.get('/', auth.isAuthenticated(), auth.setToken);
    var token = auth.signToken(user._id, user.role, config.tokenDuration.session);
    // when & then
    request(app)
      .get('/')
      .set('Authorization', 'Bearer ' + token)
      .expect(302)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        res.headers.location.should.equal('/login/' + token);
        done();
      });
  });

  it('should return 404 if user is NOT in req', function (done) {
    // given
    app.get('/', auth.setToken);
    // when & then
    request(app)
      .get('/')
      .expect(404, done);
  });
});
