'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.tokenFilter = tokenFilter;

var _jsonwebtoken = require('jsonwebtoken');

var _util = require('../util');

var _exceptions = require('../constants/exceptions');

function tokenFilter(req, res, next) {
    if ((0, _util.isPublic)(req)) {
        next();
        return;
    }
    var jwtToken = req.headers['x-auth-token'];
    if (!jwtToken) {
        next(new _util.ExceptionFactory(_exceptions.EXCEPTION.UNAUTHENTICATED));
    }
    (0, _jsonwebtoken.verify)(jwtToken, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            next(new _util.ExceptionFactory(_exceptions.EXCEPTION.UNAUTHENTICATED));
        }
        if ((typeof decoded === 'undefined' ? 'undefined' : _typeof(decoded)) === 'object') req.token = decoded;
        next();
    });
}