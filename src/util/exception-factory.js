export class ExceptionFactory extends Error {
    constructor(type) {
        super(type.message);
        this.type = type;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}