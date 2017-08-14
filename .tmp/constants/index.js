'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _exceptions = require('./exceptions');

Object.keys(_exceptions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _exceptions[key];
    }
  });
});

var _systemProperties = require('./system-properties');

Object.keys(_systemProperties).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _systemProperties[key];
    }
  });
});