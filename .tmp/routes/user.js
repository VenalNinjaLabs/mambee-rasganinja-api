'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _user = require('../controllers/user');

var _user2 = _interopRequireDefault(_user);

var _security = require('../middleware/security');

var filter = _interopRequireWildcard(_security);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserRouter = (0, _express.Router)();

UserRouter.get('/', filter.adminFilter, _user2.default.list);
UserRouter.get('/:id', filter.adminFilter, _user2.default.get);
UserRouter.post('/', filter.adminFilter, _user2.default.post);
UserRouter.put('/:id', filter.adminFilter, _user2.default.put);
UserRouter.delete('/:id', filter.adminFilter, _user2.default.delete);

exports.default = UserRouter;