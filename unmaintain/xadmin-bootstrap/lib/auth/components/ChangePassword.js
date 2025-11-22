"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactBootstrap = require("react-bootstrap");
var _reactFontawesome = _interopRequireDefault(require("react-fontawesome"));
var _xadminI18n = require("xadmin-i18n");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = _ref => {
  var {
    children,
    invalid,
    handleSubmit,
    submitting
  } = _ref;
  var icon = submitting ? 'spinner fa-spin' : 'floppy-o';
  return /*#__PURE__*/_react.default.createElement("form", {
    className: "form-horizontal",
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Card, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Card.Body, null, children, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
    type: "submit",
    disabled: invalid || submitting,
    onClick: handleSubmit
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
    name: icon
  }), " ", (0, _xadminI18n._t)('Change Password')))));
};
exports.default = _default;