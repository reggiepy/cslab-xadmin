"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _radioGroup = require("../../components/ui/radio-group");
var _formui = require("../../components/ui/formui");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var _default = _ref => {
  var {
    input,
    field
  } = _ref;
  var {
    formItemId
  } = (0, _formui.useFormField)();
  return /*#__PURE__*/_react.default.createElement(_radioGroup.RadioGroup, _extends({}, input, {
    value: input.value,
    onValueChange: input.onChange(value)
  }), field.titleMap.map((option, index) => /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/_react.default.createElement(_radioGroup.RadioGroupItem, {
    value: option.value,
    id: "".concat(formItemId, "-").concat(index)
  }), /*#__PURE__*/_react.default.createElement(Label, {
    htmlFor: "".concat(formItemId, "-").concat(index)
  }, option.name))));
};
exports.default = _default;