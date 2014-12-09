/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Bookcase = require('../api/bookcase/bookcase.model');
var Book = require('../api/book/book.model');
var mongoose = require('mongoose');

User.find({}).remove(function () {
  User.create({
      _id: mongoose.Types.ObjectId('017b043ad0386eab3d164673'),
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }, {
      _id: mongoose.Types.ObjectId('027b043ad0386eab3d164673'),
      provider: 'local',
      name: 'Test User #2',
      email: 'test1@test.com',
      password: 'test1'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    }, function () {
      console.log('finished populating users');
    }
  );
});

Bookcase.find({}).remove(function () {
  Bookcase.create({
      _id: mongoose.Types.ObjectId('117b043ad0386eab3d164673'),
      name: 'Bookcase #1',
      user: mongoose.Types.ObjectId('017b043ad0386eab3d164673')
    },
    {
      _id: mongoose.Types.ObjectId('127b043ad0386eab3d164673'),
      name: 'Bookcase #2',
      user: mongoose.Types.ObjectId('017b043ad0386eab3d164673')
    },
    {
      _id: mongoose.Types.ObjectId('137b043ad0386eab3d164673'),
      name: 'Bookcase #3',
      user: mongoose.Types.ObjectId('017b043ad0386eab3d164673')
    },
    {
      _id: mongoose.Types.ObjectId('147b043ad0386eab3d164673'),
      name: 'Bookcase #4',
      user: mongoose.Types.ObjectId('027b043ad0386eab3d164673')
    }, function () {
      console.log('finished populating bookcases');
    }
  );
});

Book.find().remove(function () {
  Book.create({
    _id: mongoose.Types.ObjectId('217b043ad0386eab3d164673'),
    name: 'Book #1',
    author: 'Author #1',
    bookcase: mongoose.Types.ObjectId('117b043ad0386eab3d164673'),
    shelf: 1,
    line: 2
  }, {
    _id: mongoose.Types.ObjectId('227b043ad0386eab3d164673'),
    name: 'Book #2',
    author: 'Author #2',
    bookcase: mongoose.Types.ObjectId('117b043ad0386eab3d164673'),
    shelf: 1,
    line: 1
  }, function () {
    console.log('finished populating books');
  });
});
