'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _user = require('../models/user');

var _constants = require('../constants');

var _util = require('../util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserController = function () {
    function UserController() {
        _classCallCheck(this, UserController);
    }

    _createClass(UserController, null, [{
        key: 'list',
        value: function list(req, res, next) {
            try {
                var page = req.query.p || 1;
                var filter = _user.User.asSearch(req.query.q, ['role', 'name', 'email', 'username']);
                _user.User.paginate(filter, { page: page, limit: _user.PAGINATION_LIMIT, sort: 'name' }).then(function (users) {
                    var nextPage = users.docs.length < users.limit ? users.page : ++users.page;
                    res.json({ users: users.docs, nextPage: nextPage, total: users.total });
                }).catch(next);
            } catch (e) {
                next(e);
            }
        }
    }, {
        key: 'get',
        value: function get(req, res, next) {
            try {
                _user.User.findById(req.params.id).exec().then(function (user) {
                    return res.json(user);
                }).catch(next);
            } catch (e) {
                next(e);
            }
        }
    }, {
        key: 'post',
        value: function post(req, res, next) {
            try {
                var user = new _user.User(req.body);
                user.save().then(function (user) {
                    return res.json(user);
                }).catch(next);
            } catch (e) {
                next(e);
            }
        }
    }, {
        key: 'put',
        value: function put(req, res, next) {
            try {
                var id = req.params.id;
                var updatedUser = req.body;
                _user.User.findById(id).exec().then(function (user) {
                    var restriction = user.hasSystemRestriction(updatedUser.role);
                    if (restriction) throw restriction;
                    return _user.User.update({ _id: id }, updatedUser, { new: true });
                }).then(function (user) {
                    return res.json(user);
                }).catch(next);
            } catch (e) {
                next(e);
            }
        }
    }, {
        key: 'delete',
        value: function _delete(req, res, next) {
            try {
                var id = req.params.id;
                _user.User.findById(id).exec().then(function (user) {
                    if (user.isDefaultAdmin()) throw new _util.ExceptionFactory(_constants.EXCEPTION.CANNOT_DEACTIVE_DEFAULT_ADMIN);
                    return _user.User.update({ _id: id }, { actived: false }, { new: true });
                }).then(function () {
                    return res.sendStatus(200);
                }).catch(next);
            } catch (e) {
                next(e);
            }
        }
    }]);

    return UserController;
}();

exports.default = UserController;