'use strict';

var Book = require('./book.model');
var common = require('../common');

exports.index = common.find(Book);
exports.show = common.findById(Book);
exports.create = common.create(Book);
exports.update = common.update(Book);
exports.destroy = common.destroy(Book);
