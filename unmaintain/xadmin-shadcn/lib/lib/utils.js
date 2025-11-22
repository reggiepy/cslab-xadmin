"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "_t", {
  enumerable: true,
  get: function get() {
    return _xadminI18n._t;
  }
});
exports.cn = cn;
var _clsx = require("clsx");
var _tailwindMerge = require("tailwind-merge");
var _xadminI18n = require("xadmin-i18n");
function cn() {
  for (var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++) {
    inputs[_key] = arguments[_key];
  }
  return (0, _tailwindMerge.twMerge)((0, _clsx.clsx)(inputs));
}