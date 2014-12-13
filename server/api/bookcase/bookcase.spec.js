'use strict';

var should = require('chai').should();
var app = require('../../app');
var request = require('supertest');
var Bookcase = require('./bookcase.model');

var token = 'Bearer ' + require('../../auth/auth.service').signToken('017b043ad0386eab3d164673');

describe('GET /api/bookcase', function () {

  it('should respond with JSON array', function (done) {
    request(app)
      .get('/api/bookcase')
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        res.body.should.be.instanceof(Array);
        res.body.should.have.length(3);
        done();
      });
  });
});

describe('GET /api/bookcase/{id}', function () {

  it('should respond with JSON object if found', function (done) {
    request(app)
      .get('/api/bookcase/117b043ad0386eab3d164673')
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        res.body._id.should.be.equal('117b043ad0386eab3d164673');
        res.body.name.should.be.equal('Bookcase #1');
        res.body.user.should.be.equal('017b043ad0386eab3d164673');
        done();
      });
  });

  it('should respond with 404 if not found', function (done) {
    request(app)
      .get('/api/bookcase/997b043ad0386eab3d164673')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  it('should respond with 403 if not own bookcase', function (done) {
    request(app)
      .get('/api/bookcase/147b043ad0386eab3d164673')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(403, done);
  });
});

describe('GET /api/bookcase/{id}/books', function () {

  it('should respond with JSON array if bookcase exist and has books', function (done) {
    request(app)
      .get('/api/bookcase/117b043ad0386eab3d164673/books/')
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
      .get('/api/bookcase/127b043ad0386eab3d164673/books/')
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

  it('should respond with 404 if bookcase not exist', function (done) {
    request(app)
      .get('/api/bookcase/997b043ad0386eab3d164673/books/')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  it('should respond with 403 if not own bookcase', function (done) {
    request(app)
      .get('/api/bookcase/147b043ad0386eab3d164673/books/')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(403, done);
  });
});

describe('POST /api/bookcase', function () {
  it('should save bookcase and set current user in it', function (done) {
    var bookcase = {name: 'test'};
    request(app)
      .post('/api/bookcase')
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

describe('PUT /api/bookcase/{id}', function () {
  it('should update bookcase', function (done) {
    var bookcase = {name: 'test'};
    request(app)
      .put('/api/bookcase/137b043ad0386eab3d164673')
      .set('Authorization', token)
      .send(bookcase)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        res.body._id.should.be.equal('137b043ad0386eab3d164673');
        res.body.name.should.be.equal('test');
        res.body.user.should.be.equal('017b043ad0386eab3d164673');
        done();
      });
  });

  it('should respond with 404 if bookcase not exist', function (done) {
    request(app)
      .put('/api/bookcase/997b043ad0386eab3d164673')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  it('should respond with 403 if not own bookcase', function (done) {
    request(app)
      .put('/api/bookcase/147b043ad0386eab3d164673')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(403, done);
  });
});

describe('DELETE /api/bookcase/{id}', function () {
  it('should delete bookcase', function (done) {
    request(app)
      .delete('/api/bookcase/137b043ad0386eab3d164673')
      .set('Authorization', token)
      .expect(204)
      .end(function (err) {
        if (err) {
          return done(err);
        }
        Bookcase.findById('137b043ad0386eab3d164673', function (err, result) {
          if (err) {
            return done(err);
          }
          should.equal(result, null);
        });
        done();
      });
  });

  it('should respond with 404 if bookcase not exist', function (done) {
    request(app)
      .delete('/api/bookcase/997b043ad0386eab3d164673')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  it('should respond with 403 if not own bookcase', function (done) {
    request(app)
      .delete('/api/bookcase/147b043ad0386eab3d164673')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(403, done);
  });

});
