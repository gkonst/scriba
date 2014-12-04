'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BookSchema = new Schema({
  name: {type: String, required: true},
  info: String,
  author: {type: String, required: true},
  bookcase: {type: Schema.Types.ObjectId, ref: 'Bookcase', required: true},
  shelf: {type: Number, required: true},
  line: {type: Number, required: true},
  active: Boolean
});

module.exports = mongoose.model('Book', BookSchema);
