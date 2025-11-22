"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _xadminUi = require("xadmin-ui");
var _xadminI18n = require("xadmin-i18n");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = _ref => {
  var {
    value,
    schema
  } = _ref;
  return value ? /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement(_xadminUi.Icon, {
    name: "check-circle",
    style: {
      color: 'green'
    }
  }), /*#__PURE__*/_react.default.createElement("span", {
    style: {
      display: 'none'
    }
  }, schema.trueText || (0, _xadminI18n._t)('Yes'))) : /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement(_xadminUi.Icon, {
    name: "close-circle"
  }), /*#__PURE__*/_react.default.createElement("span", {
    style: {
      display: 'none'
    }
  }, schema.falseText || (0, _xadminI18n._t)('No')));
};
exports.default = _default;