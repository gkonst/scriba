'use strict';

var mongoose = require('mongoose');

exports.User = {
  test: {
    _id: mongoose.Types.ObjectId('017b043ad0386eab3d164673'),
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  },
  test1: {
    _id: mongoose.Types.ObjectId('027b043ad0386eab3d164673'),
    provider: 'local',
    name: 'Test User #2',
    email: 'test1@test.com',
    password: 'test1'
  }
};
