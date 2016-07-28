/**
 * Created by wangqi on 16/6/3.
 */
function ServiceBusinessError(code, message, field) {
    Error.captureStackTrace(this, this.constructor);

    this.type = 'UserLevelServiceRequestError';
    this.name = 'ServiceBusinessError';
    this.message = message || 'Unauthenticated Access Token';

    this.code = code || 415;
    this.field = field || 'unknown_field';
    this.status = 415;
}

ServiceBusinessError.prototype = Object.create(Error.prototype);
ServiceBusinessError.prototype.constructor = ServiceBusinessError;

module.exports = ServiceBusinessError;