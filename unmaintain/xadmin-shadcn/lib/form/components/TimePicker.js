"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _timePicker = require("../../components/ui/time-picker");
var _moment = _interopRequireDefault(require("moment"));
var _excluded = ["onChange", "value"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var _default = _ref => {
  var {
      input: {
        onChange,
        value
      },
      field
    } = _ref,
    inputProp = _objectWithoutProperties(_ref.input, _excluded);
  var format = field.timeFormat || 'HH:mm:ss';
  var onTimeChange = value => {
    onChange(value && (0, _moment.default)(value).format(format));
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "w-40"
  }, /*#__PURE__*/_react.default.createElement(_timePicker.TimePicker, _extends({
    onChange: onTimeChange,
    value: value ? (0, _moment.default)(value, format).toDate() : new Date()
  }, inputProp)));
};
exports.default = _default;