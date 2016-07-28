/**
 * Created by wangqi on 16/6/3.
 */
function ServiceValidationError(code, message, field) {
    Error.captureStackTrace(this, this.constructor);

    this.type = 'UserLevelServiceRequestError';
    this.name = 'ServiceValidationError';
    this.message = message || 'Unauthenticated Access Token';

    this.code = code || 409;
    this.field = field || 'unknown_field';
    this.status = 409;
}

ServiceValidationError.prototype = Object.create(Error.prototype);
ServiceValidationError.prototype.constructor = ServiceValidationError;

module.exports = ServiceValidationError;
