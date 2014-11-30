'use strict';

var _ = require('lodash');

exports.handleError = function (res, err) {
  return res.send(500, err);
};

exports.find = function (model) {
  return function (req, res) {
    model.find(function (err, result) {
      if (err) {
        return exports.handleError(res, err);
      }
      return res.json(200, result);
    });
  }
};

exports.findById = function (model) {
  return function (req, res) {
    model.findById(req.params.id, function (err, result) {
      if (err) {
        return exports.handleError(res, err);
      }
      if (!result) {
        return res.send(404);
      }
      return res.json(result);
    });
  }
};

exports.create = function (model) {
  return function (req, res) {
    model.create(req.body, function (err, result) {
      if (err) {
        return exports.handleError(res, err);
      }
      return res.json(201, result);
    });
  };
};

exports.update = function (model) {
  return function (req, res) {
    if (req.body._id) {
      delete req.body._id;
    }
    model.findById(req.params.id, function (err, result) {
      if (err) {
        return exports.handleError(res, err);
      }
      if (!result) {
        return res.send(404);
      }
      var updated = _.merge(result, req.body);
      updated.save(function (err) {
        if (err) {
          return exports.handleError(res, err);
        }
        return res.json(200, result);
      });
    });
  };
};

exports.destroy = function (model) {
  return function (req, res) {
    model.findById(req.params.id, function (err, result) {
      if (err) {
        return exports.handleError(res, err);
      }
      if (!result) {
        return res.send(404);
      }
      result.remove(function (err) {
        if (err) {
          return exports.handleError(res, err);
        }
        return res.send(204);
      });
    });
  };
};
