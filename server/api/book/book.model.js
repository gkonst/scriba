'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BookSchema = new Schema({
  name: String,
  info: String,
  author: String,
  bookcase: {type: Schema.Types.ObjectId, ref: 'Bookcase'},
  shelf: Number,
  line: Number,
  active: Boolean
});

module.exports = mongoose.model('Book', BookSchema);
