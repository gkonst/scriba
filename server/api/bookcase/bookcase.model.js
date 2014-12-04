'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BookcaseSchema = new Schema({
  name: {type: String, required: true},
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Bookcase', BookcaseSchema);
