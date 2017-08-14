'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _constants = require('../constants');

var _util = require('../util');

var _user = require('../models/user');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthController = function () {
    function AuthController() {
        _classCallCheck(this, AuthController);
    }

    _createClass(AuthController, null, [{
        key: 'auth',
        value: function auth(req, res, next) {
            var verifiedUser = void 0;
            var username = req.body.username;
            var password = req.body.password;

            try {
                _user.User.findOne({ username: username, actived: true }).exec().then(function (user) {
                    return user.validateCredentials(username, password);
                }).then(function (isValid) {
                    if (isValid) {
                        var jwtToken = (0, _jsonwebtoken.sign)(isValid._doc, process.env.JWT_SECRET);
                        var response = { user: isValid, token: jwtToken };
                        if (isValid.resetPassword) {
                            response.resetPassword = true;
                        }
                        res.json(response);
                    } else {
                        throw new _util.ExceptionFactory(_constants.EXCEPTION.INVALID_CREDENTIALS);
                    }
                }).catch(next);
            } catch (e) {
                next(e);
            }
        }
    }]);

    return AuthController;
}();

exports.default = AuthController;