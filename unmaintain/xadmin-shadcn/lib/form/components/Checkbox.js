"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _checkbox = require("../../components/ui/checkbox");
var _label = require("../../components/ui/label");
var _formui = require("../../components/ui/formui");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var CheckboxComponent = _ref => {
  var {
    input,
    label,
    field,
    meta,
    group: FieldGroup
  } = _ref;
  var {
    formItemId
  } = (0, _formui.useFormField)();
  return /*#__PURE__*/_react.default.createElement(FieldGroup, {
    meta: meta,
    input: input,
    field: field,
    tailLayout: true
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/_react.default.createElement(_checkbox.Checkbox, {
    id: formItemId,
    checked: input.value,
    onCheckedChange: input.onChange
  }), /*#__PURE__*/_react.default.createElement(_label.Label, {
    htmlFor: formItemId
  }, label)));
};
CheckboxComponent.useGroup = false;
var _default = exports.default = CheckboxComponent;