'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SYSTEM = undefined;

var _user = require('../models/user.roles');

var SYSTEM = exports.SYSTEM = {
    AUTH: {
        ADMIN: {
            DEFAULT: {
                NAME: 'Default administrator',
                ID: 'admin',
                PASSWORD: 'admin',
                EMAIL: 'admin@admin.com',
                ROLE: _user.UserRole.DEFAULT_ADMINISTRATOR
            }
        }
    }
};