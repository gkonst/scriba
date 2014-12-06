'use strict';

function ForbiddenError() {
  Error.call(this, 'Request is forbidden');
  Error.captureStackTrace(this, this.constructor);
  this.name = 'ForbiddenError';
  this.message = 'Request is forbidden';
  this.code = 'forbidden';
  this.status = 403;
}

ForbiddenError.prototype = Object.create(Error.prototype);
ForbiddenError.prototype.constructor = ForbiddenError;

module.exports = ForbiddenError;
