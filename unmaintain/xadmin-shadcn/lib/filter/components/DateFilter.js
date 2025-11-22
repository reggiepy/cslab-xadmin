"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _moment = _interopRequireDefault(require("moment"));
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var {
  MonthPicker,
  RangePicker,
  WeekPicker
} = _antd.DatePicker;
class DatePickerFilter extends _react.default.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "onRangeChange", value => {
      var {
        input
      } = this.props;
      input.onChange(this.getValue(value));
    });
  }
  getValue(value) {
    var {
      field
    } = this.props;
    var format = field.datetimeFormat || 'YYYY-MM-DD';
    return {
      rule: 'range',
      gte: value[0].format(format),
      lte: value[1].format(format)
    };
  }
  render() {
    var {
      input,
      field
    } = this.props;
    var value = input.value;
    if (_lodash.default.isPlainObject(value) && value.gte && value.lte) {
      var format = field.datetimeFormat || 'YYYY-MM-DD';
      value = [(0, _moment.default)(value.gte, format), (0, _moment.default)(value.lte, format)];
    }
    return /*#__PURE__*/_react.default.createElement(RangePicker, {
      onChange: this.onRangeChange,
      value: value
    });
  }
}
exports.default = DatePickerFilter;