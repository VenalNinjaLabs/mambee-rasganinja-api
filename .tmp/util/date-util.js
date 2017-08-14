'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DateUtil = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateUtil = exports.DateUtil = function () {
    function DateUtil() {
        _classCallCheck(this, DateUtil);
    }

    _createClass(DateUtil, null, [{
        key: 'welcomeMessage',
        value: function welcomeMessage() {
            var nowHour = (0, _momentTimezone2.default)().hours();
            if (nowHour >= 0 && nowHour <= 4) {
                return 'Boa madrugada';
            } else if (nowHour > 4 && nowHour <= 12) {
                return 'Bom dia';
            } else if (nowHour > 12 && nowHour <= 18) {
                return 'Boa tarde';
            } else if (nowHour > 18) {
                return 'Boa noite';
            }
        }
    }, {
        key: 'withoutSignals',
        value: function withoutSignals() {
            var now = (0, _momentTimezone2.default)();
            return '' + now.year() + now.month() + now.date() + now.hours() + now.minutes() + now.seconds();
        }
    }, {
        key: 'nowIsBeforeHour',
        value: function nowIsBeforeHour(hour) {
            hour = (0, _momentTimezone2.default)(hour, 'HH:mm');
            var now = (0, _momentTimezone2.default)();
            return now.isBefore(hour);
        }
    }, {
        key: 'nowIsAfterHour',
        value: function nowIsAfterHour(hour) {
            var now = (0, _momentTimezone2.default)();
            return now.isAfter(hour);
        }
    }, {
        key: 'nowIsBetweenHour',
        value: function nowIsBetweenHour(first, last) {
            var now = (0, _momentTimezone2.default)();
            first = (0, _momentTimezone2.default)(first, 'HH:mm');
            last = (0, _momentTimezone2.default)(last, 'HH:mm');
            return now.isAfter(first) && now.isBefore(last);
        }
    }, {
        key: 'isAfterDate',
        value: function isAfterDate(day) {
            day = Number(day);
            var now = (0, _momentTimezone2.default)();
            var getDay = (0, _momentTimezone2.default)().date(day);
            return now.isAfter(getDay);
        }
    }, {
        key: 'isBeforeDate',
        value: function isBeforeDate(day) {
            day = Number(day);
            var now = (0, _momentTimezone2.default)();
            var getDay = (0, _momentTimezone2.default)().date(day);
            return now.isBefore(getDay);
        }
    }, {
        key: 'isAfterIntervalDate',
        value: function isAfterIntervalDate(date, interval) {
            var now = (0, _momentTimezone2.default)();
            var initialDate = (0, _momentTimezone2.default)(date);
            initialDate.add(interval, 'milliseconds');
            return initialDate.isAfter(now);
        }
    }, {
        key: 'getFormattedAfterDate',
        value: function getFormattedAfterDate(day) {
            day = Number(day);
            var afterDay = (0, _momentTimezone2.default)().date(day);
            var afterMonth = afterDay.month() + 1;
            afterDay.month(afterMonth);
            return afterDay.format('DD/MM/YYYY');
        }
    }, {
        key: 'getFormattedHour',
        value: function getFormattedHour(hour) {
            hour = (0, _momentTimezone2.default)(hour);
            return hour.format('HH:mm');
        }
    }, {
        key: 'getFormattedDate',
        value: function getFormattedDate(day) {
            var currentDay = (0, _momentTimezone2.default)().date(day);
            return currentDay.format('DD/MM/YYYY');
        }
    }, {
        key: 'getFormattedBoth',
        value: function getFormattedBoth(fullDate) {
            var both = (0, _momentTimezone2.default)(fullDate);
            return both.format('DD/MM/YYYY H:mm');
        }
    }, {
        key: 'nowIncrementMinute',
        value: function nowIncrementMinute(minutes) {
            var now = (0, _momentTimezone2.default)();
            now.minutes(now.minutes() + minutes);
            return now;
        }
    }]);

    return DateUtil;
}();