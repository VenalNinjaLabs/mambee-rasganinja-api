import { verify } from 'jsonwebtoken';
import { ExceptionFactory, isPublic } from '../util';
import { EXCEPTION } from '../constants/exceptions';

export function tokenFilter(req, res, next) {
    if(isPublic(req)) {
        next();
        return;
    }
    let jwtToken = req.headers['x-auth-token'];
    if(!jwtToken) {
        next(new ExceptionFactory(EXCEPTION.UNAUTHENTICATED));
    }
    verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            next(new ExceptionFactory(EXCEPTION.UNAUTHENTICATED));
        }
        if(typeof decoded === 'object') req.token = decoded;
        next();
    })
}