'use strict';

var mongoose = require('mongoose');
var users = require('./users').User;

exports.Bookcase = {
  bookcase1: {
    _id: mongoose.Types.ObjectId('117b043ad0386eab3d164673'),
    name: 'Bookcase #1',
    user: users.test
  },
  bookcase2: {
    _id: mongoose.Types.ObjectId('127b043ad0386eab3d164673'),
    name: 'Bookcase #2',
    user: users.test
  },
  bookcase3: {
    _id: mongoose.Types.ObjectId('137b043ad0386eab3d164673'),
    name: 'Bookcase #3',
    user: users.test
  },
  bookcase4: {
    _id: mongoose.Types.ObjectId('147b043ad0386eab3d164673'),
    name: 'Bookcase #4',
    user: users.test1
  }
};

