'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setup = require('./setup');

Object.keys(_setup).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _setup[key];
    }
  });
});

var _moment = require('./moment');

Object.keys(_moment).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _moment[key];
    }
  });
});