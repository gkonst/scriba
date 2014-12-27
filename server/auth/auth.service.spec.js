'use strict';

require('chai').should();
var request = require('supertest');
var proxyquire = require('proxyquire');
var express = require('express');
var UserStub = {};
var auth = proxyquire('./auth.service', {'../api/user/user.model': UserStub});

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
