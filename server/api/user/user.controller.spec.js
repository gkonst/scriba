'use strict';

var should = require('chai').should();
var app = require('../../app');
var request = require('supertest');
var User = require('./user.model');
var auth = require('../../auth/auth.service');
var token = 'Bearer ' + auth.signToken('017b043ad0386eab3d164673');

describe('GET /api/user/me', function () {

  require('../../config/fixtures_loader')();

  it('should respond with current profile', function (done) {
    request(app)
      .get('/api/user/me')
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        res.body.name.should.equal('Test User');
        res.body.email.should.equal('test@test.com');
        should.not.exist(res.body.salt);
        should.not.exist(res.body.hashedPassword);
        should.not.exist(res.body.password);
        done();
      });
  });
});


describe('POST /api/user', function () {
  it('should save new user and return token', function (done) {
    var user = {name: 'foo', email: 'foo@bar', password: 'bar'};
    request(app)
      .post('/api/user')
      .send(user)
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        res.body.token.should.exist();
        User.findOne({email: 'foo@bar'}, function (err, result) {
          if (err) {
            return done(err);
          }
          result.should.exist();
          result.name.should.equal(user.name);
          result.provider.should.equal('local');
          done();
        });
      });
  })
});

describe('PUT /api/user/me/password', function () {

  require('../../config/fixtures_loader')();

  it('should change user password if old password correct', function (done) {
    request(app)
      .put('/api/user/me/password')
      .set('Authorization', 'Bearer ' + auth.signToken('027b043ad0386eab3d164673'))
      .send({oldPassword: 'test1', newPassword: 'test11'})
      .expect(204, done);
  });

  it('should respond with 403 if old password is wrong', function (done) {
    request(app)
      .put('/api/user/me/password')
      .set('Authorization', token)
      .send({oldPassword: 'wrong password', newPassword: 'test1'})
      .expect(403, done);
  });
});
