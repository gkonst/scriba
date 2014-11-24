'use strict';

var _ = require('lodash');
var Bookcase = require('./bookcase.model');

// Get list of bookcases
exports.index = function (req, res) {
  Bookcase.find(function (err, bookcases) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, bookcases);
  });
};

// Get a single bookcase
exports.show = function (req, res) {
  Bookcase.findById(req.params.id, function (err, bookcase) {
    if (err) {
      return handleError(res, err);
    }
    if (!bookcase) {
      return res.send(404);
    }
    return res.json(bookcase);
  });
};

// Creates a new bookcase in the DB.
exports.create = function (req, res) {
  Bookcase.create(req.body, function (err, bookcase) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, bookcase);
  });
};

// Updates an existing bookcase in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Bookcase.findById(req.params.id, function (err, bookcase) {
    if (err) {
      return handleError(res, err);
    }
    if (!bookcase) {
      return res.send(404);
    }
    var updated = _.merge(bookcase, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, bookcase);
    });
  });
};

// Deletes a bookcase from the DB.
exports.destroy = function (req, res) {
  Bookcase.findById(req.params.id, function (err, bookcase) {
    if (err) {
      return handleError(res, err);
    }
    if (!bookcase) {
      return res.send(404);
    }
    bookcase.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
