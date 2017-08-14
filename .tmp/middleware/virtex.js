'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.virtexFilter = virtexFilter;

var _util = require('../util');

var _exceptions = require('../constants/exceptions');

function virtexFilter(req, res, next) {
    try {
        var virtexToken = req.token;
        if (!virtexToken.user || !virtexToken.pass || !virtexToken.code || !virtexToken.id || !virtexToken.location) {
            throw new _util.ExceptionFactory(_exceptions.EXCEPTION.UNAUTHENTICATED);
        }
        next();
    } catch (e) {
        next(e);
    }
}