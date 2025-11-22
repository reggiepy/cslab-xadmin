"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _moment = _interopRequireDefault(require("moment"));
var _datetimePicker = require("../../components/ui/datetime-picker");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = _ref => {
  var {
    input,
    field
  } = _ref;
  var format = field.datetimeFormat || 'YYYY-MM-DD HH:mm:ss';
  var getValue = value => {
    return (0, _moment.default)(value).toDate();
  };
  var formatValue = value => {
    return (0, _moment.default)(value).format(format);
  };
  var onChange = value => {
    input.onChange(formatValue(value));
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "w-80"
  }, /*#__PURE__*/_react.default.createElement(_datetimePicker.DateTimePicker, {
    clearable: true,
    value: input.value ? getValue(input.value) : new Date(),
    onChange: onChange,
    onBlur: input.onBlur
  }));
};
exports.default = _default;