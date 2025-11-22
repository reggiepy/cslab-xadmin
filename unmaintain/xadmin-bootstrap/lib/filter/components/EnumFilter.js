"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _reactBootstrap = require("react-bootstrap");
var _xadmin = _interopRequireDefault(require("xadmin"));
var _excluded = ["name", "value", "onBlur", "onChange"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class EnumFilter extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "onChange", (e, value) => {
      var {
        onChange
      } = this.props.input;
      var {
        checks
      } = this.state;
      var newChecks = checks;
      if (e.target.checked) {
        if (checks.indexOf(value) == -1) {
          newChecks = [...checks, value];
        }
      } else {
        if (checks.indexOf(value) >= 0) {
          newChecks = [..._lodash.default.pull(checks, value)];
        }
      }
      if (newChecks != checks) {
        this.setState({
          checks: newChecks
        }, () => {
          onChange(this.getValue());
        });
      }
    });
    _defineProperty(this, "clear", () => {
      var {
        onChange
      } = this.props.input;
      this.setState({
        checks: []
      }, () => {
        onChange(this.getValue());
      });
    });
    var _value = props.input.value;
    // like
    if (_value) {
      if (typeof _value != 'object') {
        this.state = {
          checks: [_value]
        };
      } else {
        this.state = {
          checks: [..._value['inq']]
        };
      }
    } else {
      this.state = {
        checks: []
      };
    }
  }
  getValue(e) {
    var {
      checks
    } = this.state;
    if (checks.length > 1) {
      return {
        inq: checks
      };
    } else if (checks.length > 0) {
      return checks[0];
    } else {
      return null;
    }
  }
  shouldComponentUpdate(nextProps) {
    return this.props != nextProps;
  }
  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      var value = nextProps.input.value;
      // like
      if (value) {
        if (typeof value != 'object') {
          this.setState({
            checks: [value]
          });
        } else {
          this.setState({
            checks: [...value['inq']]
          });
        }
      } else {
        this.setState({
          checks: []
        });
      }
    }
  }
  render() {
    var _this$props = this.props,
      {
        input: {
          name,
          value,
          onBlur,
          onChange
        },
        field
      } = _this$props,
      inputProps = _objectWithoutProperties(_this$props.input, _excluded);
    var {
      checks
    } = this.state;
    var {
      _t
    } = _xadmin.default.context;
    var inline = true;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Check, _extends({
      key: "check-clear",
      id: "check-clear",
      type: "checkbox",
      label: _t('All'),
      checked: checks.length == 0,
      onChange: e => {
        if (e.target.checked) {
          this.clear();
        }
      },
      inline: inline
    }, inputProps)), field.titleMap.map(option => {
      return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Check, _extends({
        key: option.name,
        id: option.name,
        type: "checkbox",
        label: option.name,
        checked: checks.indexOf(option.value) >= 0,
        onChange: e => this.onChange(e, option.value),
        inline: inline
      }, inputProps, {
        value: option.value
      }));
    }));
  }
}
exports.default = EnumFilter;