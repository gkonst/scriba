/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Bookcase = require('../api/bookcase/bookcase.model');
var Book = require('../api/book/book.model');
var mongoose = require('mongoose');

Thing.find({}).remove(function () {
  Thing.create({
    name: 'Development Tools',
    info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name: 'Server and Client integration',
    info: 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name: 'Smart Build System',
    info: 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  }, {
    name: 'Modular Structure',
    info: 'Best practice client and server structures allow for more code reusability and maximum scalability'
  }, {
    name: 'Optimized Build',
    info: 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  }, {
    name: 'Deployment Ready',
    info: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

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
