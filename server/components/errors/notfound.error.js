'use strict';

function NotFoundError() {
  Error.call(this, 'Requested path not found');
  Error.captureStackTrace(this, this.constructor);
  this.name = 'NotFoundError';
  this.message = 'Requested path not found';
  this.code = 'path_not_found';
  this.status = 404;
}

NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;

module.exports = NotFoundError;
