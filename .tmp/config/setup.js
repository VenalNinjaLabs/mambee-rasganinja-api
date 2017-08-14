'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setupDefaultAdminUser = setupDefaultAdminUser;

var _user2 = require('../models/user');

var _user3 = require('../models/user.roles');

var _constants = require('../constants');

function setupDefaultAdminUser() {
    _user2.User.findOne({ role: _user3.UserRole.DEFAULT_ADMINISTRATOR }).exec().then(function (user) {
        if (!user) {
            var _user = new _user2.User({
                name: _constants.SYSTEM.AUTH.ADMIN.DEFAULT.NAME,
                email: _constants.SYSTEM.AUTH.ADMIN.DEFAULT.EMAIL,
                username: _constants.SYSTEM.AUTH.ADMIN.DEFAULT.ID,
                password: _constants.SYSTEM.AUTH.ADMIN.DEFAULT.PASSWORD,
                role: _constants.SYSTEM.AUTH.ADMIN.DEFAULT.ROLE
            });
            _user.save().catch(function (err) {
                return setTimeout(setupDefaultAdminUser(), 5000);
            });
        }
    }).catch(function (err) {
        return setTimeout(setupDefaultAdminUser(), 5000);
    });
}