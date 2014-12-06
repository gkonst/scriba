'use strict';

var _ = require('lodash');
var NotFoundError = require('../components/errors/notfound.error');

function jsonOrErr(res, next, status) {
  return function (err, result) {
    if (err) {
      return next(err);
    } else {
      res.json(status || 200, result);
    }
  }
}

function hasUser(model) {
  return !_.isUndefined(model.schema.path('user'));
}

exports.find = function (model) {
  return function (req, res, next) {
    var filter = hasUser(model) ? {user: req.user.id} : {};
    model.find(filter, jsonOrErr(res, next));
  }
};

exports.findById = function (model) {
  return function (req, res, next) {
    model.findById(req.params.id, function (err, result) {
      if (err) {
        return next(err);
      } else if (result) {
        return res.json(200, result);
      } else {
        throw new NotFoundError();
      }
    });
  }
};

exports.create = function (model) {
  return function (req, res, next) {
    if (hasUser(model)) {
      req.body.user = req.user.id;
    }
    model.create(req.body, jsonOrErr(res, next, 201));
  };
};

exports.update = function (model) {
  return function (req, res, next) {
    if (req.body._id) {
      delete req.body._id;
    }
    model.findById(req.params.id, function (err, result) {
      if (err) {
        return next(err);
      } else if (!result) {
        throw new NotFoundError();
      }
      var updated = _.merge(result, req.body);
      updated.save(jsonOrErr(res, next));
    });
  };
};

exports.destroy = function (model) {
  return function (req, res, next) {
    model.findById(req.params.id, function (err, result) {
      if (err) {
        return next(err);
      }
      if (!result) {
        throw new NotFoundError();
      }
      result.remove(jsonOrErr(res, next, 204));
    });
  };
};
