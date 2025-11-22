"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactBootstrap = require("react-bootstrap");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var CheckboxComponent = _ref => {
  var {
    input,
    label,
    field,
    meta,
    group: FieldGroup
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(FieldGroup, {
    label: null,
    meta: meta,
    input: input,
    field: field
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Checkbox, _extends({
    checked: !!input.value
  }, input, field.attrs), label));
};
CheckboxComponent.withGroup = true;
var _default = exports.default = CheckboxComponent;