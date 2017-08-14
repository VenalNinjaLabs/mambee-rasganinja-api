'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setupMoment = setupMoment;

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setupMoment() {
    _momentTimezone2.default.locale('pt-br');
    _momentTimezone2.default.tz('America/Recife');
}