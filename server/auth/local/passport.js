'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function (User) {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function (email, password, done) {
      User.findOne({
        email: email.toLowerCase()
      }, function (err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, {field: 'email', message: 'not_registered'});
        }
        if (!user.authenticate(password)) {
          return done(null, false, {field: 'password', message: 'wrong'});
        }
        return done(null, user);
      });
    }
  ));
};
