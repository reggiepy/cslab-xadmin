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
    error,
    children,
    invalid,
    handleSubmit,
    submitting
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Container, null, /*#__PURE__*/_react.default.createElement("form", {
    className: "form-horizontal",
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Card, {
    style: {
      maxWidth: 550,
      margin: '5rem auto'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Card.Body, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Card.Title, {
    className: "mb-4"
  }, /*#__PURE__*/_react.default.createElement("h4", null, (0, _xadminI18n._t)('Reset Password'))), children, error && /*#__PURE__*/_react.default.createElement("strong", null, error), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
    type: "submit",
    disabled: invalid || submitting,
    onClick: handleSubmit,
    block: true
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
    name: submitting ? 'spinner fa-spin' : 'sign-in'
  }), " ", (0, _xadminI18n._t)('Send Email to Reset Password'))))));
};
exports.default = _default;