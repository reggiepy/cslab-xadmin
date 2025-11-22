"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleGroup = exports.InlineGroup = exports.FieldGroup = exports.ColGroup = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactBootstrap = require("react-bootstrap");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var FieldGroup = _ref => {
  var {
    label,
    meta,
    input,
    field,
    children
  } = _ref;
  var groupProps = {};
  var attrs = field.attrs || {};
  var error = meta.touched && meta.error;
  var help = field.description || field.help;
  var size = field.option && field.option.groupSize || attrs.groupSize || {
    label: {
      sm: 4,
      md: 3,
      lg: 2
    },
    control: {
      sm: 8,
      md: 9,
      lg: 10
    }
  };
  if (attrs.size) {
    groupProps['size'] = attrs.size;
  }
  if (attrs.variant) {
    groupProps['variant'] = attrs.variant;
  }
  var controlComponent = children ? children : /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control, _extends({}, input, attrs));
  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Group, _extends({
    as: _reactBootstrap.Row,
    controlId: input.name
  }, groupProps), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Label, _extends({
    column: true
  }, size.label), label, field && field.required ? /*#__PURE__*/_react.default.createElement("span", {
    className: "text-danger"
  }, "*") : ''), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, size.control, controlComponent, error && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control.Feedback, {
    type: "invalid"
  }, error), help && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Text, {
    className: "text-muted"
  }, help)));
};
exports.FieldGroup = FieldGroup;
var GroupRow = _ref2 => {
  var {
    children
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
    sm: 6,
    md: 4,
    lg: 3
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Row, {
    className: "mb-2"
  }, children));
};
var ColGroup = _ref3 => {
  var {
    label,
    meta,
    input,
    field,
    children
  } = _ref3;
  var groupProps = {};
  var attrs = field.attrs || {};
  var error = meta.touched && meta.error;
  var help = field.description || field.help;
  if (attrs.size) {
    groupProps['size'] = attrs.size;
  }
  if (attrs.variant) {
    groupProps['variant'] = attrs.variant;
  }
  var controlComponent = children ? children : /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control, _extends({}, input, attrs, {
    placeholder: label
  }));
  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Group, _extends({
    as: GroupRow,
    controlId: input.name
  }, groupProps), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
    sm: 3
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Label, null, label, field && field.required ? /*#__PURE__*/_react.default.createElement("span", {
    className: "text-danger"
  }, "*") : '')), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
    sm: 9
  }, controlComponent, error && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control.Feedback, {
    type: "invalid"
  }, error), help && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Text, {
    className: "text-muted"
  }, help)));
};
exports.ColGroup = ColGroup;
var InlineGroup = _ref4 => {
  var {
    label,
    meta,
    input,
    field,
    children
  } = _ref4;
  var groupProps = {};
  var attrs = field.attrs || {};
  var error = meta.touched && meta.error;
  var help = field.description || field.help;
  if (attrs.size) {
    groupProps['size'] = attrs.size;
  }
  if (attrs.variant) {
    groupProps['variant'] = attrs.variant;
  }
  var controlComponent = children ? children : /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control, _extends({}, input, attrs, {
    placeholder: label
  }));
  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Group, _extends({
    controlId: input.name
  }, groupProps), controlComponent, error && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control.Feedback, {
    type: "invalid"
  }, error), help && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Text, {
    className: "text-muted"
  }, help));
};
exports.InlineGroup = InlineGroup;
var SimpleGroup = _ref5 => {
  var {
    label,
    meta,
    input,
    field,
    children
  } = _ref5;
  var groupProps = {};
  var attrs = field.attrs || {};
  var error = meta.touched && meta.error;
  var help = field.description || field.help;
  if (attrs.size) {
    groupProps['size'] = attrs.size;
  }
  if (attrs.variant) {
    groupProps['variant'] = attrs.variant;
  }
  var controlComponent = children ? children : /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control, _extends({}, input, attrs, {
    placeholder: label
  }));
  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Group, _extends({
    controlId: input.name
  }, groupProps), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Label, null, label, field && field.required ? /*#__PURE__*/_react.default.createElement("span", {
    className: "text-danger"
  }, "*") : ''), controlComponent, error && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control.Feedback, {
    type: "invalid"
  }, error), help && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Text, {
    className: "text-muted"
  }, help));
};
exports.SimpleGroup = SimpleGroup;