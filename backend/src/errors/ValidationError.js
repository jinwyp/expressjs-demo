

function ValidationError(code, message, field) {
    Error.captureStackTrace(this, this.constructor);

    this.type = 'UserLevelOperationalError';
    this.name = 'ValidationError';
    this.message = message || 'Field Validation Error';

    this.code = code || 409;
    this.field = field || 'unknown_field';
    this.status = 409;
}

ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;



module.exports = ValidationError;
