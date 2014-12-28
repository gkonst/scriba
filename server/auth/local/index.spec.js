'use strict';

require('chai').should();
var app = require('../../app');
var request = require('supertest');

describe('POST /auth/local', function () {
  it('should authenticate and return token if user found and password correct', function (done) {
    var authData = {email: 'test@test.com', password: 'test'};
    request(app)
      .post('/auth/local')
      .send(authData)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        res.body.token.should.exist();
        done();
      });
  });

  it('should return 401 status if user not found', function (done) {
    var authData = {email: 'test333@test.com', password: 'test'};
    request(app)
      .post('/auth/local')
      .send(authData)
      .expect(401)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        res.body.field.should.equal('email');
        res.body.message.should.equal('not_registered');
        done();
      });
  });

  it('should return 401 status if user found, but wrong password', function (done) {
    var authData = {email: 'test@test.com', password: 'test1111'};
    request(app)
      .post('/auth/local')
      .send(authData)
      .expect(401)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        res.body.field.should.equal('password');
        res.body.message.should.equal('wrong');
        done();
      });
  });
});
