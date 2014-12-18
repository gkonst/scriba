'use strict';

var _ = require('lodash');
var NotFoundError = require('../components/errors/notfound.error');
var ForbiddenError = require('../components/errors/forbidden.error');

var nextIfErr = exports.nextIfErr = function (req, res, next, successCallback) {
  return function (err, result) {
    if (err) {
      next(err);
    } else if (_.isFunction(successCallback)) {
      successCallback(req, res, next, result);
    }
  }
};

var notFoundIfEmpty = exports.notFoundIfEmpty = function (foundCallback) {
  return function (req, res, next, result) {
    if (result && _.isFunction(foundCallback)) {
      foundCallback(req, res, next, result);
    } else {
      next(new NotFoundError());
    }
  }
};

var forbiddenIfRestricted = exports.forbiddenIfRestricted = function (permittedCallback) {
  return function (req, res, next, result) {
    if (result.user && String(result.user) === req.user.id) {
      permittedCallback(req, res, next, result);
    } else {
      next(new ForbiddenError());
    }
  }
};

var resultAsJson = exports.resultAsJson = function (status) {
  return function (req, res, next, result) {
    res.status(status || 200).json(result);
  }
};

function hasUser(model) {
  return !_.isUndefined(model.schema.path('user'));
}

exports.find = function (model) {
  return function (req, res, next) {
    var filter = hasUser(model) ? {user: req.user.id} : {};
    model.find(filter,
      nextIfErr(req, res, next,
        resultAsJson()));
  }
};

exports.findById = function (model) {
  return function (req, res, next) {
    model.findById(req.params.id,
      nextIfErr(req, res, next,
        notFoundIfEmpty(
          forbiddenIfRestricted(
            resultAsJson()))));
  }
};

exports.create = function (model) {
  return function (req, res, next) {
    if (hasUser(model)) {
      req.body.user = req.user.id;
    }
    model.create(req.body,
      nextIfErr(req, res, next,
        resultAsJson(201)));
  };
};

exports.update = function (model) {
  return function (req, res, next) {
    if (req.body._id) {
      delete req.body._id;
    }
    model.findById(req.params.id,
      nextIfErr(req, res, next,
        notFoundIfEmpty(
          forbiddenIfRestricted(function (req, res, next, result) {
            var updated = _.merge(result, req.body);
            updated.save(
              nextIfErr(req, res, next,
                resultAsJson()
              ));
          }))));
  };
};

exports.destroy = function (model) {
  return function (req, res, next) {
    model.findById(req.params.id,
      nextIfErr(req, res, next,
        notFoundIfEmpty(
          forbiddenIfRestricted(function (req, res, next, result) {
            result.remove(
              nextIfErr(req, res, next,
                resultAsJson(204)));
          }))));
  };
};
