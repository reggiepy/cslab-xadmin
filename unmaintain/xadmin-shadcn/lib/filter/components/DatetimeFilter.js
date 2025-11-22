"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _moment = _interopRequireDefault(require("moment"));
var _antd = require("antd");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class DateRange extends _react.default.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      endOpen: false
    });
    _defineProperty(this, "disabledStartDate", startValue => {
      var {
        field
      } = this.props;
      var endValue = this.state.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      if (field.attrs && field.attrs.maxDate && field.attrs.maxDate < startValue) {
        return true;
      }
      return startValue.valueOf() > endValue.valueOf();
    });
    _defineProperty(this, "disabledEndDate", endValue => {
      var {
        field
      } = this.props;
      var startValue = this.state.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      if (field.attrs && field.attrs.maxDate && field.attrs.maxDate < endValue) {
        return true;
      }
      return endValue.valueOf() <= startValue.valueOf();
    });
    _defineProperty(this, "onChange", (fieldKey, newValue) => {
      var {
        onChange,
        value
      } = this.props.input;
      var format = this.props.field.datetimeFormat || 'YYYY-MM-DD HH:mm:ss';
      onChange(_objectSpread(_objectSpread({}, value), {}, {
        [fieldKey]: newValue.format(format),
        rule: 'range'
      }));
    });
    _defineProperty(this, "onStartChange", value => {
      this.onChange('gte', value);
    });
    _defineProperty(this, "onEndChange", value => {
      this.onChange('lte', value);
    });
    _defineProperty(this, "handleStartOpenChange", open => {
      if (!open) {
        this.setState({
          endOpen: true
        });
      }
    });
    _defineProperty(this, "handleEndOpenChange", open => {
      this.setState({
        endOpen: open
      });
    });
  }
  render() {
    var {
      input,
      field
    } = this.props;
    var format = field.datetimeFormat || 'YYYY-MM-DD HH:mm:ss';
    var inputValue = input.value;
    var {
      endOpen
    } = this.state;
    var startValue = inputValue && inputValue.gte && (0, _moment.default)(inputValue.gte);
    var endValue = inputValue && inputValue.lte && (0, _moment.default)(inputValue.lte);
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.DatePicker, {
      disabledDate: this.disabledStartDate,
      showTime: true,
      format: format,
      value: startValue,
      placeholder: "\u8D77\u59CB",
      onChange: this.onStartChange,
      onOpenChange: this.handleStartOpenChange
    }), " \u5230", ' ', /*#__PURE__*/_react.default.createElement(_antd.DatePicker, {
      disabledDate: this.disabledEndDate,
      showTime: true,
      format: format,
      value: endValue,
      placeholder: "\u7ED3\u675F",
      onChange: this.onEndChange,
      open: endOpen,
      onOpenChange: this.handleEndOpenChange
    }));
  }
}
var _default = exports.default = DateRange;