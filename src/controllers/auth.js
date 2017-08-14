import { sign } from 'jsonwebtoken';

import { EXCEPTION } from '../constants';
import { ExceptionFactory } from '../util';

import { User, UserRole } from '../models/user';

export default class AuthController {

    static auth(req, res, next) {
        let verifiedUser;
        let username = req.body.username;
        let password = req.body.password;

        try {
            User.findOne({ username, actived: true }).exec()
                .then(user => user.validateCredentials(username, password))
                .then(isValid => {
                    if(isValid) {
                        let jwtToken = sign(isValid._doc, process.env.JWT_SECRET);
                        let response = { user: isValid, token: jwtToken };
                        if(isValid.resetPassword) {
                            response.resetPassword = true;
                        }
                        res.json(response);
                    } else {
                        throw new ExceptionFactory(EXCEPTION.INVALID_CREDENTIALS);
                    }
                })
                .catch(next);
        } catch(e) {
            next(e);
        }
    }
}