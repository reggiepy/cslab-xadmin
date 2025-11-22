"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _xadmin = _interopRequireDefault(require("xadmin"));
var _xadminI18n = require("xadmin-i18n");
var _antd = require("antd");
var _excluded = ["name", "value", "onChange"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var _default = props => {
  var {
      input: {
        name,
        value,
        onChange
      },
      field
    } = props,
    inputProps = _objectWithoutProperties(props.input, _excluded);
  var disabled = value === null || value === undefined || value === '';
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: (0, _xadminI18n._t)('Use this filter')
  }, disabled ? /*#__PURE__*/_react.default.createElement(_antd.Checkbox, {
    checked: false,
    onClick: () => onChange(true)
  }) : /*#__PURE__*/_react.default.createElement(_antd.Checkbox, {
    checked: true,
    onClick: () => onChange(null)
  })), ' ', /*#__PURE__*/_react.default.createElement(_antd.Switch, {
    checked: value,
    disabled: disabled,
    onChange: onChange,
    checkedChildren: field.boolLabel ? field.boolLabel[0] : (0, _xadminI18n._t)('True'),
    unCheckedChildren: field.boolLabel ? field.boolLabel[1] : (0, _xadminI18n._t)('False')
  }));
};
exports.default = _default;