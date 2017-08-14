'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.errorLogger = exports.errorHandler = undefined;

var _exceptions = require('../constants/exceptions');

function errorLogger(err, req, res, next) {
    console.error('Error name:', err.name);
    console.error('Error code:', err.code);
    console.error('Error stacktrace:', err);
    next(err);
}

function errorHandler(err, req, res, next) {
    var error = null;
    switch (err.name) {
        case 'ValidationError':
            error = _exceptions.EXCEPTION.VALIDATION;
            break;
        case 'MongoError':
            switch (err.code) {
                case 2:
                    error = _exceptions.EXCEPTION.VALIDATION;
                    break;
                case 11000:
                    error = _exceptions.EXCEPTION.ALREADY_EXISTS;
                    break;
                default:
                    error = _exceptions.EXCEPTION.UNDEFINED;
                    break;
            }
        case 'Error':
            if (err.code) {
                switch (err.code) {
                    case 'EAI_AGAIN':
                        error = _exceptions.EXCEPTION.CONNECTION_FAILED;
                        break;
                    default:
                        error = _exceptions.EXCEPTION.UNDEFINED;
                        break;
                }
            } else {
                error = err.type;
            }
            break;
        default:
            error = _exceptions.EXCEPTION.UNDEFINED;
            break;
    }
    res.status(error.httpCode).json(error);
}

exports.errorHandler = errorHandler;
exports.errorLogger = errorLogger;