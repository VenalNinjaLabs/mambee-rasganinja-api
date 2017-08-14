'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authFilter = authFilter;

var _util = require('../util');

var _exceptions = require('../constants/exceptions');

var _user = require('../models/user');

function authFilter(req, res, next) {
    if ((0, _util.isPublic)(req)) {
        next();
        return;
    }
    try {
        var id = req.token.id || req.token._id;
        _user.User.findOne({ _id: id, actived: true }).exec().then(function (user) {
            if (!user) throw new _util.ExceptionFactory(_exceptions.EXCEPTION.UNAUTHENTICATED);
            next();
        }).catch(next);
    } catch (e) {
        next(new _util.ExceptionFactory(_exceptions.EXCEPTION.UNAUTHENTICATED));
    }
}