'use strict';

var Bookcase = require('./bookcase.model');
var Book = require('../book/book.model');
var common = require('../common');

exports.index = common.find(Bookcase);
exports.show = common.findById(Bookcase);
exports.create = common.create(Bookcase);
exports.update = common.update(Bookcase);
exports.destroy = common.destroy(Bookcase);

exports.showBooks = function (req, res) {
  Book.find({bookcase: req.params.id}, function (err, books) {
    if (err) {
      return exports.handleError(res, err);
    }
    return res.json(200, books);
  });
};
