'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.supervisorFilter = supervisorFilter;

var _util = require('../../util');

var _user = require('../../models/user.roles');

var _exceptions = require('../../constants/exceptions');

function supervisorFilter(req, res, next) {
    try {
        var role = req.token.role;
        if (role === _user.UserRole.DEFAULT_ADMINISTRATOR || role === _user.UserRole.ADMINISTRATOR || role === _user.UserRole.SUPERVISOR) next();else next(new SystemError(_exceptions.EXCEPTION.UNAUTHORIZED));
    } catch (e) {
        next(new _util.ExceptionFactory(_exceptions.EXCEPTION.UNAUTHORIZED));
    }
}