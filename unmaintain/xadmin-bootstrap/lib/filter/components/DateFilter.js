"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _moment = _interopRequireDefault(require("moment"));
var _reactBootstrap = require("react-bootstrap");
var _reactDateRange = require("react-date-range");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var defaultRanges = {
  today: {
    title: 'Today',
    value: format => ({
      gte: (0, _moment.default)().startOf('day').format(format),
      lte: (0, _moment.default)().endOf('day').format(format)
    })
  },
  yestday: {
    title: 'Yestday',
    value: format => ({
      gte: (0, _moment.default)().subtract(1, 'days').startOf('day').format(format),
      lte: (0, _moment.default)().subtract(1, 'days').endOf('day').format(format)
    })
  },
  this_month: {
    title: 'This Month',
    value: format => ({
      gte: (0, _moment.default)().startOf('month').format(format),
      lte: (0, _moment.default)().endOf('month').format(format)
    })
  }
};
class DateFilter extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "clear", (rule, range) => {
      var {
        onChange
      } = this.props.input;
      var {
        value
      } = this.state;
      this.setState({
        value: {}
      }, () => {
        onChange(this.getValue());
      });
    });
    _defineProperty(this, "onSelectRange", (rule, range) => {
      var {
        onChange
      } = this.props.input;
      var format = this.props.field.datetimeFormat || 'YYYY-MM-DD HH:mm:ss';
      var {
        value
      } = this.state;
      this.setState({
        value: _objectSpread({
          rule
        }, range.value(format))
      }, () => {
        onChange(this.getValue());
      });
    });
    _defineProperty(this, "handleSelectRange", dates => {
      var {
        onChange
      } = this.props.input;
      var format = this.props.field.datetimeFormat || 'YYYY-MM-DD HH:mm:ss';
      var {
        value
      } = this.state;
      this.setState({
        value: {
          rule: 'range',
          gte: (0, _moment.default)(dates['startDate']).startOf('day').format(format).toString(),
          lte: (0, _moment.default)(dates['endDate']).endOf('day').format(format).toString()
        }
      }, () => {
        onChange(this.getValue());
      });
    });
    var value = props.input.value;
    var mode = props.field.mode || 'base';
    this.state = {
      mode,
      value
    };
  }
  getValue() {
    var {
      value
    } = this.state;
    return value.rule ? value : null;
  }
  shouldComponentUpdate(nextProps) {
    return this.props != nextProps;
  }
  renderMini() {
    var {
      field
    } = this.props;
    var ranges = field.dateRanges || defaultRanges;
    var {
      value
    } = this.state;
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.ButtonGroup, {
      bsSize: "xs"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, _extends({}, field.attrs, {
      bsStyle: !value.rule ? 'primary' : 'default',
      onClick: () => this.clear()
    }), "All"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.OverlayTrigger, {
      trigger: "click",
      rootClose: true,
      placement: "bottom",
      overlay: /*#__PURE__*/_react.default.createElement(_reactBootstrap.Popover, {
        style: {
          maxWidth: 600
        }
      }, this.renderCalender())
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, _extends({}, field.attrs, {
      bsStyle: value.rule == 'range' ? 'primary' : 'default'
    }), value.rule == 'range' && value.gte && value.lte ? "".concat(value.gte, " ~ ").concat(value.lte) : 'Select Range')), Object.keys(ranges).map(r => /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, _extends({}, field.attrs, {
      bsStyle: value.rule == r ? 'primary' : 'default',
      onClick: () => this.onSelectRange(r, ranges[r])
    }), ranges[r].title)));
  }
  renderBase() {
    var {
      field
    } = this.props;
    var ranges = field.dateRanges || defaultRanges;
    var {
      value
    } = this.state;
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.ButtonGroup, {
      bsSize: "small"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, _extends({}, field.attrs, {
      bsStyle: !value.rule ? 'primary' : 'default',
      onClick: () => this.clear()
    }), "All"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.OverlayTrigger, {
      trigger: "click",
      rootClose: true,
      placement: "bottom",
      overlay: /*#__PURE__*/_react.default.createElement(_reactBootstrap.Popover, {
        style: {
          maxWidth: 600
        }
      }, this.renderCalender())
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, _extends({}, field.attrs, {
      bsStyle: value.rule == 'range' ? 'primary' : 'default'
    }), value.rule == 'range' && value.gte && value.lt ? "".concat(value.gte, " ~ ").concat(value.lt) : 'Select Range')), Object.keys(ranges).map(r => /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, _extends({}, field.attrs, {
      bsStyle: value.rule == r ? 'primary' : 'default',
      onClick: () => this.onSelectRange(r, ranges[r])
    }), ranges[r].title)));
  }
  renderCalender() {
    return /*#__PURE__*/_react.default.createElement(_reactDateRange.DateRange, {
      onChange: this.handleSelectRange,
      theme: {
        Calendar: {
          width: 200
        },
        PredefinedRanges: {
          marginLeft: 10,
          marginTop: 10
        }
      }
    });
  }
  render() {
    var {
      input,
      label,
      field
    } = this.props;
    var {
      newValue
    } = this.state;
    return field.mode == 'mini' ? this.renderMini() : this.renderBase();
  }
}
exports.default = DateFilter;