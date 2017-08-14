import { ExceptionFactory, isPublic } from '../util';
import { EXCEPTION } from '../constants/exceptions';

import { User } from '../models/user';

export function authFilter(req, res, next) {
    if(isPublic(req)) {
        next();
        return;
    }
    try {
        let id = req.token.id || req.token._id;
         User.findOne({ _id: id, actived: true })
            .exec()
            .then(user => {
                if(!user) throw new ExceptionFactory(EXCEPTION.UNAUTHENTICATED);
                next();
            })
            .catch(next);
    } catch(e) {
        next(new ExceptionFactory(EXCEPTION.UNAUTHENTICATED));
    }
}