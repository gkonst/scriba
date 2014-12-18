'use strict';

var User = require('./user.model');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var ForbiddenError = require('../../components/errors/forbidden.error');

var validationError = function (res, err) {
  return res.json(422, err);
};

exports.create = function (req, res) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function (err, user) {
    if (err) {
      return validationError(res, err);
    }
    var token = jwt.sign({_id: user._id}, config.secrets.session, {expiresInMinutes: config.tokenDuration.session});
    res.json({token: token});
  });
};

exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401);
    }
    res.json(user.profile);
  });
};

exports.changePassword = function (req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function (err) {
        if (err) {
          return validationError(res, err);
        }
        res.status(200);
      });
    } else {
      next(new ForbiddenError());
    }
  });
};

exports.me = function (req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function (err, user) { // don't ever give out the password or salt
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json(401);
    }
    res.json(user);
  });
};
