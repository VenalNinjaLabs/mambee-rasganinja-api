import { EXCEPTION } from '../constants/exceptions';

function errorLogger(err, req, res, next) {
    console.error('Error name:', err.name);
    console.error('Error code:', err.code);
    console.error('Error stacktrace:', err);
    next(err);
}

function errorHandler(err, req, res, next) {
    let error = null;
    switch(err.name) {
        case 'ValidationError':
            error = EXCEPTION.VALIDATION;
            break;
        case 'MongoError':
            switch(err.code) {
                case 2:
                    error = EXCEPTION.VALIDATION;
                    break;
                case 11000:
                    error = EXCEPTION.ALREADY_EXISTS;
                    break;
                default:
                    error = EXCEPTION.UNDEFINED;
                    break;
            }
        case 'Error':
            if(err.code) {
                switch(err.code) {
                    case 'EAI_AGAIN':
                        error = EXCEPTION.CONNECTION_FAILED;
                        break;
                    default:
                        error = EXCEPTION.UNDEFINED;
                        break;
                }
            } else {
                error = err.type;
            }
            break;
        default:
            error = EXCEPTION.UNDEFINED;
            break;
    }
    res.status(error.httpCode).json(error);
}

export { errorHandler, errorLogger };