"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _toggleGroup = require("../../components/ui/toggle-group");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var _default = _ref => {
  var {
    input,
    field
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_toggleGroup.ToggleGroup, _extends({}, input, {
    value: input.value,
    onValueChange: input.onChange(value)
  }), field.titleMap.map(option => /*#__PURE__*/_react.default.createElement(_toggleGroup.ToggleGroupItem, {
    value: option.value
  }, option.name)));
};
exports.default = _default;