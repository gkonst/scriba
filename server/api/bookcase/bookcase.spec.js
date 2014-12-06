'use strict';

require('chai').should();
var app = require('../../app');
var request = require('supertest');

var token = 'Bearer ' + require('../../auth/auth.service').signToken('017b043ad0386eab3d164673');

describe('GET /api/bookcases', function () {

  it('should respond with JSON array', function (done) {
    request(app)
      .get('/api/bookcases')
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

describe('GET /api/bookcases/{id}/books', function () {

  it('should respond with JSON array if bookcase exist and has books', function (done) {
    request(app)
      .get('/api/bookcases/117b043ad0386eab3d164673/books/')
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

  it('should respond with empty JSON array if bookcase exist and has no books', function (done) {
    request(app)
      .get('/api/bookcases/127b043ad0386eab3d164673/books/')
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        res.body.should.be.instanceof(Array);
        res.body.should.have.length(0);
        done();
      });
  });

  it('should respond with 404 if bookcase not exist', function () {
    request(app)
      .get('/api/bookcases/017b043ad0386eab3d164673/books/')
      .set('Authorization', token)
      .expect(404);
  });
});

describe('POST /api/bookcases', function () {
  it('should save bookcase and set current user in it', function (done) {
    var bookcase = {name: 'test'};
    request(app)
      .post('/api/bookcases')
      .set('Authorization', token)
      .send(bookcase)
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        res.body.name.should.be.equal('test');
        res.body.user.should.be.equal('017b043ad0386eab3d164673');
        done();
      });
  })
});
