'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PAGINATION_LIMIT = exports.UserRole = exports.User = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _isEmail = require('validator/lib/isEmail');

var _isEmail2 = _interopRequireDefault(_isEmail);

var _constants = require('../constants');

var _util = require('../util');

var _user = require('./user.roles');

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var saltRounds = 3;
var PAGINATION_LIMIT = 10;

var userSchema = new _mongoose2.default.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        require: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        validate: {
            validator: function validator(email) {
                return (0, _isEmail2.default)(email);
            },
            message: '{VALUE} is not valid email'
        }
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: _user.UserRoles,
        index: true,
        required: true
    },
    resetPassword: {
        type: Boolean,
        default: true,
        required: true
    },
    actived: {
        type: Boolean,
        default: true
    }
});

userSchema.plugin(_mongoosePaginate2.default);

userSchema.set('toJSON', {
    getters: true,
    virtuals: true,
    transform: function transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret.resetPassword;
    }
});
userSchema.set('toObject', {
    getters: true,
    virtuals: true,
    transform: function transform(doc, ret) {
        delete ret.resetPassword;
    }
});
userSchema.pre('save', function (next) {
    var _this = this;

    this.constructor.find({ role: _user.UserRole.DEFAULT_ADMINISTRATOR }).exec().then(function (users) {
        if (users.length && _this.role === _user.UserRole.DEFAULT_ADMINISTRATOR) {
            throw new _util.ExceptionFactory(_constants.EXCEPTION.ONLY_ONE_DEFAULT_ADMIN);
        }
        return;
    }).then(function (something) {
        return (0, _bcrypt.hash)(_this.password, saltRounds);
    }).then(function (hash) {
        _this.password = hash;
        next();
    }).catch(next);
});
userSchema.pre('update', function (next) {
    var _this2 = this;

    if (this._update.$set.resetPassword) {
        (0, _bcrypt.hash)(this._update.$set.password, saltRounds).then(function (hash) {
            _this2._update.$set.password = hash;
            _this2._update.$set.resetPassword = false;
            next();
        }).catch(next);
    }
    next();
});
userSchema.statics.asSearch = function (query, attrs, plus) {
    query = query ? query : '';
    var or = attrs.map(function (attr) {
        return _defineProperty({}, attr, new RegExp('.*' + query + '.*', 'i'));
    });
    return plus ? { $and: [{ $or: or }, plus] } : { $or: or };
};
userSchema.methods.hasSystemRestriction = function (newRole) {
    if (this.role !== _user.UserRole.DEFAULT_ADMINISTRATOR && newRole === _user.UserRole.DEFAULT_ADMINISTRATOR) {
        return new _util.ExceptionFactory(_constants.EXCEPTION.ONLY_ONE_DEFAULT_ADMIN);
    } else if (this.role === _user.UserRole.DEFAULT_ADMINISTRATOR && newRole !== _user.UserRole.DEFAULT_ADMINISTRATOR) {
        return new _util.ExceptionFactory(_constants.EXCEPTION.AT_LEAST_DEFAULT_ADMIN);
    }
    return false;
};
userSchema.methods.isDefaultAdmin = function () {
    return this.role === _user.UserRole.DEFAULT_ADMINISTRATOR;
};
userSchema.methods.validateCredentials = function (username, pass) {
    var _this3 = this;

    return (0, _bcrypt.compare)(pass, this.password).then(function (isCorrect) {
        if (_this3.username === username && isCorrect) return _this3;else return null;
    }).catch(function (err) {
        return false;
    });
};
userSchema.virtual('displayName').get(function () {
    var partialsName = this.name.split(' ');
    return partialsName.length > 1 ? partialsName[0] + ' ' + partialsName[partialsName.length - 1] : this.name;
});

var User = _mongoose2.default.model('User', userSchema);

exports.User = User;
exports.UserRole = _user.UserRole;
exports.PAGINATION_LIMIT = PAGINATION_LIMIT;