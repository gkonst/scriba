'use strict';

var _ = require('lodash');
var NotFoundError = require('../components/errors/notfound.error');
var ForbiddenError = require('../components/errors/forbidden.error');

function jsonOrErr(res, next, status) {
  return function (err, result) {
    if (err) {
      next(err);
    } else {
      res.json(status || 200, result);
    }
  }
}

function hasUser(model) {
  return !_.isUndefined(model.schema.path('user'));
}

function owns(result, req, next) {
  if (result.user && result.user == req.user.id) {
    return true;
  } else {
    next(new ForbiddenError());
  }
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
        next(err);
      } else if (result) {
        if (owns(result, req, next)) {
          res.json(200, result);
        }
      } else {
        next(new NotFoundError());
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
        next(err);
      } else if (result) {
        var updated = _.merge(result, req.body);
        updated.save(jsonOrErr(res, next));
      } else {
        next(new NotFoundError());
      }
    });
  };
};

exports.destroy = function (model) {
  return function (req, res, next) {
    model.findById(req.params.id, function (err, result) {
      if (err) {
        next(err);
      } else if (result) {
        result.remove(jsonOrErr(res, next, 204));
      } else {
        next(new NotFoundError());
      }
    });
  };
};
