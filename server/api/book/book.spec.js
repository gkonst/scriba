'use strict';

require('chai').should();
var app = require('../../app');
var request = require('supertest');

var token = 'Bearer ' + require('../../auth/auth.service').signToken('017b043ad0386eab3d164673');

describe('GET /api/book', function () {

  require('../../config/fixtures_loader')();

  it('should respond with JSON array', function (done) {
    request(app)
      .get('/api/book')
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        res.body.should.be.instanceof(Array);
        res.body.should.have.length(2);
        done();
      });
  });
});
