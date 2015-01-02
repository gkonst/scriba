'use strict';

var mongoose = require('mongoose');
var users = require('./users').User;
var bookcases = require('./bookcases').Bookcase;

exports.Book = {
  book1: {
    _id: mongoose.Types.ObjectId('217b043ad0386eab3d164673'),
    name: 'Book #1',
    author: 'Author #1',
    user: users.test._id,
    bookcase: bookcases.bookcase1,
    shelf: 1,
    line: 2
  },
  book2: {
    _id: mongoose.Types.ObjectId('227b043ad0386eab3d164673'),
    name: 'Book #2',
    author: 'Author #2',
    user: users.test._id,
    bookcase: bookcases.bookcase1,
    shelf: 1,
    line: 1
  },
  book3: {
    _id: mongoose.Types.ObjectId('237b043ad0386eab3d164673'),
    name: 'Book #3',
    author: 'Author #3',
    user: users.test1._id,
    bookcase: bookcases.bookcase4,
    shelf: 1,
    line: 2
  }
};
