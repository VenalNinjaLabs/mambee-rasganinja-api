'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _dotenv = require('dotenv');

var _config = require('./config');

var _middleware = require('./middleware');

var middleware = _interopRequireWildcard(_middleware);

var _database = require('./database');

var _auth = require('./routes/auth');

var _auth2 = _interopRequireDefault(_auth);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();

var app = (0, _express2.default)();

app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());

// Auth middleware
app.use(middleware.tokenFilter);
app.use(middleware.authFilter);

// API routes
app.use('/api/auth', _auth2.default);
app.use('/api/users', _user2.default);

// Error handling
app.use(middleware.errorLogger);
app.use(middleware.errorHandler);

_database.MongoFactory.getInstance().on('error', console.error).on('disconnect', _database.MongoFactory.connect);

(0, _config.setupMoment)();
(0, _config.setupDefaultAdminUser)();

app.listen(process.env.SV_PORT, function () {
    return console.log('Your project is running on port', process.env.SV_PORT);
});