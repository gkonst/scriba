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

  it('should return error if status is 500', function (done) {
    // given
    var error = {stack: 'test stack', message: 'test message', code: 'test code'};
    app.get('/', function (req, res, next) {
      next(error);
    });
    errorHandler(app);

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
        done();
      });
  });
});

