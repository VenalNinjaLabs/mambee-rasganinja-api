import { ExceptionFactory } from '../../util';
import { UserRole } from '../../models/user.roles';
import { EXCEPTION } from '../../constants/exceptions';

export function adminFilter(req, res, next) {
    try {
        let role = req.token.role;
        if(role === UserRole.DEFAULT_ADMINISTRATOR || role === UserRole.ADMINISTRATOR) next();
        else next(new ExceptionFactory(EXCEPTION.UNAUTHORIZED))
    } catch(e) {
        next(new ExceptionFactory(EXCEPTION.UNAUTHORIZED));
    }
}