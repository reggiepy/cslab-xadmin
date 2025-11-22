"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleGroup = exports.InlineGroup = exports.FieldGroup = exports.ColGroup = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _input = require("../../components/ui/input");
var _formui = require("../../components/ui/formui");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var FieldGroup = _ref => {
  var {
    label,
    meta,
    input,
    field,
    tailLayout,
    children
  } = _ref;
  var attrs = field.attrs || {};
  var error = meta.touched && (meta.error || meta.submitError);
  var extra = field.description || field.help;
  var controlComponent = children ? children : /*#__PURE__*/_react.default.createElement(_input.Input, _extends({}, input, attrs));
  return /*#__PURE__*/_react.default.createElement(_formui.FormItem, {
    error: error,
    className: "flex space-x-4 space-y-0"
  }, /*#__PURE__*/_react.default.createElement(_formui.FormLabel, {
    className: "w-1/6 h-9 flex items-center justify-end"
  }, label), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex-2"
  }, /*#__PURE__*/_react.default.createElement(_formui.FormControl, null, controlComponent), extra && /*#__PURE__*/_react.default.createElement(_formui.FormDescription, null, extra), /*#__PURE__*/_react.default.createElement(_formui.FormMessage, null, field.formText)));
};
exports.FieldGroup = FieldGroup;
var InlineGroup = _ref2 => {
  var {
    label,
    meta,
    input,
    field,
    children
  } = _ref2;
  var attrs = field.attrs || {};
  var error = meta.touched && (meta.error || meta.submitError);
  var extra = field.description || field.help;
  var controlComponent = children ? children : /*#__PURE__*/_react.default.createElement(_input.Input, _extends({}, input, attrs, {
    placeholder: label
  }));
  return /*#__PURE__*/_react.default.createElement(_formui.FormItem, {
    error: error,
    className: "flex flex-col space-y-2"
  }, /*#__PURE__*/_react.default.createElement(_formui.FormControl, null, controlComponent), extra && /*#__PURE__*/_react.default.createElement(_formui.FormDescription, null, extra), /*#__PURE__*/_react.default.createElement(_formui.FormMessage, null, field.formText));
};
exports.InlineGroup = InlineGroup;
var SimpleGroup = _ref3 => {
  var {
    label,
    meta,
    input,
    field,
    children
  } = _ref3;
  var attrs = field.attrs || {};
  var error = meta.touched && (meta.error || meta.submitError);
  var extra = field.description || field.help;
  var controlComponent = children ? children : /*#__PURE__*/_react.default.createElement(_input.Input, _extends({}, input, attrs));
  return /*#__PURE__*/_react.default.createElement(_formui.FormItem, {
    error: error
  }, /*#__PURE__*/_react.default.createElement(_formui.FormLabel, null, label), /*#__PURE__*/_react.default.createElement(_formui.FormControl, null, controlComponent), extra && /*#__PURE__*/_react.default.createElement(_formui.FormDescription, null, extra), /*#__PURE__*/_react.default.createElement(_formui.FormMessage, null, field.formText));
};
exports.SimpleGroup = SimpleGroup;
var ColGroup = _ref4 => {
  var {
    label,
    meta,
    input,
    field,
    children
  } = _ref4;
  var attrs = field.attrs || {};
  var error = meta.touched && (meta.error || meta.submitError);
  var extra = field.description || field.help;
  var controlComponent = children ? children : /*#__PURE__*/_react.default.createElement(_input.Input, _extends({}, input, attrs));
  return /*#__PURE__*/_react.default.createElement(_formui.FormItem, {
    error: error
  }, /*#__PURE__*/_react.default.createElement(_formui.FormLabel, null, label), /*#__PURE__*/_react.default.createElement(_formui.FormControl, null, controlComponent), extra && /*#__PURE__*/_react.default.createElement(_formui.FormDescription, null, extra), /*#__PURE__*/_react.default.createElement(_formui.FormMessage, null, field.formText));
};
exports.ColGroup = ColGroup;