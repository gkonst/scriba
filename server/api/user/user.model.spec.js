'use strict';

require('chai').should();
var User = require('./user.model');

var user = new User({
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
});

describe('User Model', function() {

  it('should fail when saving a duplicate user', function(done) {
    user.save(function() {
      var userDup = new User(user);
      userDup.save(function(err) {
        err.should.exist();
        done();
      });
    });
  });

  it('should fail when saving without an email', function(done) {
    user.email = '';
    user.save(function(err) {
      err.should.exist();
      done();
    });
  });

  it('should authenticate user if password is valid', function() {
    return user.authenticate('password').should.be.true;
  });

  it('should not authenticate user if password is invalid', function() {
    return user.authenticate('blah').should.not.be.true;
  });
});
