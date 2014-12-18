'use strict';

module.exports = function (app) {
  //jshint unused: false
  //noinspection JSUnusedLocalSymbols
  app.use(function (err, req, res, next) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err);
    } else {
      var status = err.status || 500;
      if (status === 500) {
        console.error(err.stack);
      }
      res.status(status).send({
        status: status,
        message: err.message,
        code: err.code
      });
    }
  });
};

