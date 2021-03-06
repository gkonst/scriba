'use strict';

var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../api/user/user.model');
var validateJwt = expressJwt({secret: config.secrets.session});
var UnauthorizedError = require('../components/errors/unauthorized.error');
var common = require('../api/common');

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
exports.isAuthenticated = function () {
  return compose()
    // Validate jwt
    .use(function (req, res, next) {
      // allow access_token to be passed through query parameter as well
      /* jshint camelcase:false */
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function (req, res, next) {
      User.findById(req.user._id, common.nextIfErr(next, function (user) {
        if (user) {
          req.user = user;
          next();
        } else {
          next(new UnauthorizedError('user_not_found', 'User not found'));
        }
      }));
    });
};

/**
 * Returns a jwt token signed by the app secret
 */
var signToken = exports.signToken = function (id, role, expiresInMinutes) {
  return jwt.sign({_id: id, role: role}, config.secrets.session, {expiresInMinutes: expiresInMinutes});
};

/**
 * Set token cookie directly for oAuth strategies
 */
exports.setToken = function (req, res) {
  if (req.user) {
    var token = signToken(req.user._id, req.user.role, config.tokenDuration.session);
    res.redirect('/login/' + token);
  } else {
    res.status(404).json({message: 'Something went wrong, please try again.'});
  }
};
