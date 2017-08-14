'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MongoFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MongoFactory = exports.MongoFactory = function () {
    function MongoFactory() {
        _classCallCheck(this, MongoFactory);

        this.instance = null;
        this.connect();
    }

    _createClass(MongoFactory, null, [{
        key: 'getInstance',
        value: function getInstance() {
            if (!this.instance) {
                this.connect();
            }
            return this.instance;
        }
    }, {
        key: 'connect',
        value: function connect() {
            _mongoose2.default.Promise = global.Promise;
            _mongoose2.default.connect('mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME);
            this.instance = _mongoose2.default.connection;
        }
    }]);

    return MongoFactory;
}();