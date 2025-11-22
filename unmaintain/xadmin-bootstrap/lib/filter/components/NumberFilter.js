"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _xadmin = _interopRequireDefault(require("xadmin"));
var _reactBootstrap = require("react-bootstrap");
var _excluded = ["eq"],
  _excluded2 = ["name", "value", "onBlur", "onChange"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class NumberFilter extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "onBlur", (e, key) => {
      var {
        onBlur
      } = this.props.input;
      this.setState({
        [key]: e.target.value
      }, () => {
        onBlur(this.getValue());
      });
    });
    _defineProperty(this, "onChange", (e, key) => {
      var {
        onChange
      } = this.props.input;
      this.setState({
        [key]: e.target.value
      }, () => {
        onChange(this.getValue());
      });
    });
    _defineProperty(this, "clear", () => {
      var {
        onChange
      } = this.props.input;
      this.setState({}, () => {
        onChange(this.getValue());
      });
    });
    var value = props.input.value;
    if (typeof value == 'string') {
      this.state = {
        eq: value
      };
    } else {
      this.state = _objectSpread({}, value);
    }
  }
  getValue() {
    var _this$state = this.state,
      {
        eq
      } = _this$state,
      ops = _objectWithoutProperties(_this$state, _excluded);
    if (eq) {
      return eq;
    } else {
      var ret = _lodash.default.pickBy(ops, v => {
        return !_lodash.default.isNil(v) && v != '';
      });
      return Object.keys(ret).length > 0 ? ret : null;
    }
  }
  shouldComponentUpdate(nextProps) {
    return this.props != nextProps;
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
      inputProps = _objectWithoutProperties(_this$props.input, _excluded2);
    var {
      gte,
      lte
    } = this.state;
    var {
      _t
    } = _xadmin.default.context;
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.InputGroup, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormControl, _extends({
      type: "number"
    }, inputProps, field.attrs, {
      value: gte || '',
      placeholder: field.minimum ? "Minimum(".concat(field.minimum, ")") : _t('No limit'),
      style: {
        flexGrow: 3
      },
      onBlur: e => this.onBlur(e, 'gte'),
      onChange: e => this.onChange(e, 'gte')
    })), /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormControl, _extends({
      value: "~",
      style: {
        textAlign: 'center'
      }
    }, field.attrs, {
      readOnly: true
    })), /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormControl, _extends({
      type: "number"
    }, inputProps, field.attrs, {
      value: lte || '',
      placeholder: field.maximum ? "Maximum(".concat(field.maximum, ")") : _t('No limit'),
      style: {
        flexGrow: 3
      },
      onBlur: e => this.onBlur(e, 'lte'),
      onChange: e => this.onChange(e, 'lte')
    })));
  }
}
exports.default = NumberFilter;