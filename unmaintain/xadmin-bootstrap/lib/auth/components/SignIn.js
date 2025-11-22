"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _xadmin = _interopRequireDefault(require("xadmin"));
var _xadminI18n = require("xadmin-i18n");
var _reactBootstrap = require("react-bootstrap");
var _reactFontawesome = _interopRequireDefault(require("react-fontawesome"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = _ref => {
  var {
    error,
    children,
    invalid,
    handleSubmit,
    submitting
  } = _ref;
  var {
    auth
  } = _xadmin.default.get('config');
  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Container, null, /*#__PURE__*/_react.default.createElement("form", {
    className: "form-horizontal",
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Card, {
    style: {
      maxWidth: 450,
      margin: '5rem auto'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Card.Body, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Card.Title, {
    className: "mb-4"
  }, /*#__PURE__*/_react.default.createElement("h4", null, (0, _xadminI18n._t)('Please Login'))), children, error && /*#__PURE__*/_react.default.createElement("strong", null, error), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
    type: "submit",
    disabled: invalid || submitting,
    onClick: handleSubmit,
    block: true
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
    name: submitting ? 'spinner fa-spin' : 'sign-in'
  }), " ", (0, _xadminI18n._t)('Login')), auth.can_signup && /*#__PURE__*/_react.default.createElement("div", {
    className: "mt-3"
  }, (0, _xadminI18n._t)('Not registed'), "? ", /*#__PURE__*/_react.default.createElement("a", {
    href: "#",
    onClick: () => _xadmin.default.go('/signup')
  }, (0, _xadminI18n._t)('please signup'))), auth.can_reset_password && /*#__PURE__*/_react.default.createElement("div", {
    className: "mt-3"
  }, (0, _xadminI18n._t)('Forgot password'), "? ", /*#__PURE__*/_react.default.createElement("a", {
    href: "#",
    onClick: () => _xadmin.default.go('/forget_password')
  }, (0, _xadminI18n._t)('reset password')))))));
};
exports.default = _default;