'use strict';

require('chai').should();
var errorHandler = require('./errorhandler');
var request = require('supertest');
var express = require('express');

describe('ErrorHandler', function () {

  var app;

  beforeEach(function () {
    app = express();
  });

  function controllerWithError(error) {
    app.get('/', function (req, res, next) {
      next(error);
    });
    errorHandler(app);
  }

  it('should return error with fixed structure', function (done) {
    // given
    var error = {
      name: 'SomeError',
      status: 500,
      stack: 'test stack',
      message: 'test message',
      code: 'test code',
      foo: 'bar'
    };
    controllerWithError(error);

    // when & then
    request(app)
      .get('/')
      .expect(500)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        res.body.message.should.equal(error.message);
        res.body.code.should.equal(error.code);
        res.body.should.not.eql(error);
        done();
      });
  });

  it('should return error with fixed structure and status 500 if status is missed in error', function (done) {
    // given
    var error = {
      name: 'SomeError',
      stack: 'test stack',
      message: 'test message',
      code: 'test code',
      foo: 'bar'
    };
    controllerWithError(error);

    // when & then
    request(app)
      .get('/')
      .expect(500)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        res.body.message.should.equal(error.message);
        res.body.code.should.equal(error.code);
        res.body.should.not.eql(error);
        done();
      });
  });

  it('should return error as is and status 400 for validation errors', function (done) {
    // given
    var error = {
      name: 'ValidationError',
      stack: 'test stack',
      message: 'test message',
      code: 'test code',
      foo: 'bar'
    };
    controllerWithError(error);

    // when & then
    request(app)
      .get('/')
      .expect(400)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        res.body.should.eql(error);
        done();
      });
  });
});
