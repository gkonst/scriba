'use strict';

var fixtures = require('pow-mongoose-fixtures');
var mongoose = require('mongoose');
var _ = require('lodash');

function loadAll(callback) {
  fixtures.load(__dirname + '/fixtures/', mongoose.connection, callback);
}

function clearCollections(done) {
  mongoose.connection.db.collections(function (err, collections) {
    if (err) {
      return done(err);
    }

    var todo = collections.length;
    if (!todo) {
      return done();
    }

    collections.forEach(function (collection) {
      if (collection.collectionName.match(/^system\./)) {
        return --todo;
      }

      collection.remove({}, {safe: true}, function () {
        if (--todo === 0) {
          done();
        }
      });
    });
  });
}
/* globals before, after */
function init() {
  if (_.isFunction(before) && before.length > 0) {
    // we're in a test suite that hopefully supports async operations
    before(function (done) {
      loadAll(done);
    });
    after(function (done) {
      clearCollections(done);
    })
  }
}

module.exports = init;
