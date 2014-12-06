'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BookcaseSchema = new Schema({
  name: {type: String, required: true},
  info: String,
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  active: Boolean
});

module.exports = mongoose.model('Bookcase', BookcaseSchema);
