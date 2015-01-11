'use strict';

var Bookcase = require('./bookcase.model');
var Book = require('../book/book.model');
var common = require('../common');

exports.index = common.find(Bookcase);
exports.show = common.findById(Bookcase);
exports.create = common.create(Bookcase);
exports.update = common.update(Bookcase);
exports.destroy = common.destroy(Bookcase);

exports.showBooks = function (req, res, next) {
  Bookcase.findById(req.params.id)
    .exec(common.nextIfErr(req, res, next,
      common.notFoundIfEmpty(
        common.forbiddenIfRestricted(
          function (bookcase) {
            Book.find({bookcase: bookcase.id},
              common.nextIfErr(req, res, next,
                function (books) {
                  bookcase = bookcase.toObject();
                  bookcase.books = books;
                  res.status(200).json(bookcase);
                }));
          }))));
};
