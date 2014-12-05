'use strict';

module.exports = function (app) {
  //jshint unused: false
  //noinspection JSUnusedLocalSymbols
  app.use(function (err, req, res, next) {
    var status = err.status || 500;
    if (status === 500) {
      console.error(err.stack);
    }
    res.status(status);
    res.send({
      status: status,
      error: err.message
    });
  });
};

