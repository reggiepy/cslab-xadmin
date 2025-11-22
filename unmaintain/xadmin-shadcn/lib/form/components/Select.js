"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _select = require("../../components/ui/select");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = _ref => {
  var {
    input,
    label,
    field
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_select.Select, {
    onValueChange: input.onChange,
    defaultValue: input.value
  }, /*#__PURE__*/_react.default.createElement(_select.SelectTrigger, {
    className: "min-w-60 max-w-md w-auto"
  }, /*#__PURE__*/_react.default.createElement(_select.SelectValue, {
    placeholder: field.placeholder
  })), /*#__PURE__*/_react.default.createElement(_select.SelectContent, null, [...field.titleMap].map(option => {
    return /*#__PURE__*/_react.default.createElement(_select.SelectItem, {
      value: option.value
    }, option.name);
  })));
};
exports.default = _default;