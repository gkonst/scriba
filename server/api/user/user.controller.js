'use strict';

var User = require('./user.model');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var ForbiddenError = require('../../components/errors/forbidden.error');
var UnauthorizedError = require('../../components/errors/unauthorized.error');
var common = require('../common');

exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(common.nextIfErr(next, function (user) {
    var token = jwt.sign({_id: user._id}, config.secrets.session, {expiresInMinutes: config.tokenDuration.session});
    res.status(201).json({token: token});
  }));
};

exports.changePassword = function (req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, common.nextIfErr(next, function (user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(common.nextIfErr(next, function () {
        res.status(204).json();
      }));
    } else {
      next(new ForbiddenError());
    }
  }));
};

exports.me = function (req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', common.nextIfErr(next, function (user) {
    if (user) {
      res.json(user);
    } else {
      next(new UnauthorizedError());
    }
  }));
};
