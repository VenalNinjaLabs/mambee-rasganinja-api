import { User, PAGINATION_LIMIT } from '../models/user';

import { EXCEPTION } from '../constants';
import { ExceptionFactory } from '../util';

export default class UserController {

    static list(req, res, next) {
        try {
            let page = req.query.p || 1;
            let filter = User.asSearch(req.query.q, ['role', 'name', 'email', 'username']);
            User
                .paginate(filter, { page, limit: PAGINATION_LIMIT, sort: 'name' })
                .then(users => {
                    let nextPage = users.docs.length < users.limit ? users.page : ++users.page;
                    res.json({ users: users.docs, nextPage, total: users.total });
                })
                .catch(next);
        } catch(e) { 
            next(e);
        }
    }

    static get(req, res, next) {
        try {
            User
                .findById(req.params.id)
                .exec()
                .then(user => res.json(user))
                .catch(next);
        } catch(e) {
            next(e);
        }
    }

    static post(req, res, next) {
        try {
            let user = new User(req.body);
            user.save()
                .then(user => res.json(user))
                .catch(next);
        } catch(e) {
            next(e);
        }
    }

    static put(req, res, next) {
        try {
            let id = req.params.id;
            let updatedUser = req.body;
            User
                .findById(id)
                .exec()
                .then(user => {
                    let restriction = user.hasSystemRestriction(updatedUser.role);
                    if(restriction) throw restriction;
                    return User.update({ _id: id }, updatedUser, { new: true });     
                })
                .then(user => res.json(user))
                .catch(next)
        } catch(e) {
            next(e);
        }
    }

    static delete(req, res, next) {
        try {
            let id = req.params.id;
            User
                .findById(id)
                .exec()
                .then(user => {
                    if(user.isDefaultAdmin()) throw new ExceptionFactory(EXCEPTION.CANNOT_DEACTIVE_DEFAULT_ADMIN);
                    return User.update({ _id: id }, { actived: false }, { new: true });  
                })
                .then(() => res.sendStatus(200))
                .catch(next)
        } catch(e) {
            next(e);
        }
    }
}

