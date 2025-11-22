"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactBootstrap = require("react-bootstrap");
var _Items = require("./Items");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var FieldGroup = _ref => {
  var {
    label,
    error,
    input,
    field,
    children
  } = _ref;
  var groupProps = {};
  var attrs = field.attrs || {};
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
  if (error) {
    groupProps['validationState'] = 'error';
  }
  if (attrs.bsSize) {
    groupProps['bsSize'] = attrs.bsSize;
  }
  if (attrs.bsStyle) {
    groupProps['bsStyle'] = attrs.bsStyle;
  }
  var controlComponent = children ? children : /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormControl, _extends({}, input, attrs));
  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormGroup, _extends({
    controlId: input.name
  }, groupProps), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, _extends({
    key: 0,
    componentClass: _reactBootstrap.ControlLabel
  }, size.label), label), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, _extends({
    key: 1
  }, size.control), controlComponent, /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormControl.Feedback, null), help && /*#__PURE__*/_react.default.createElement(_reactBootstrap.HelpBlock, null, help), error && /*#__PURE__*/_react.default.createElement(_reactBootstrap.HelpBlock, null, error)));
};
var _default = exports.default = FieldGroup;