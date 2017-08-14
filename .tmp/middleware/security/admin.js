'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.adminFilter = adminFilter;

var _util = require('../../util');

var _user = require('../../models/user.roles');

var _exceptions = require('../../constants/exceptions');

function adminFilter(req, res, next) {
    try {
        var role = req.token.role;
        if (role === _user.UserRole.DEFAULT_ADMINISTRATOR || role === _user.UserRole.ADMINISTRATOR) next();else next(new _util.ExceptionFactory(_exceptions.EXCEPTION.UNAUTHORIZED));
    } catch (e) {
        next(new _util.ExceptionFactory(_exceptions.EXCEPTION.UNAUTHORIZED));
    }
}