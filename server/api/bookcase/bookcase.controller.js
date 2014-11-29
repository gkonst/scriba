'use strict';

var Bookcase = require('./bookcase.model');
var common = require('../common');

exports.index = common.find(Bookcase);
exports.show = common.findById(Bookcase);
exports.create = common.create(Bookcase);
exports.update = common.update(Bookcase);
exports.destroy = common.destroy(Bookcase);
