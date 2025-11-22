"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _xadmin = _interopRequireDefault(require("xadmin"));
var _lodash = _interopRequireDefault(require("lodash"));
var _reactBootstrap = require("react-bootstrap");
var _reactFontawesome = _interopRequireDefault(require("react-fontawesome"));
var _excluded = ["name", "value", "onBlur", "onChange"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class TextFilter extends _react.default.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "onBlur", e => {
      var {
        value,
        onBlur
      } = this.props.input;
      if (e.target.value && value.like) {
        onBlur({
          like: e.target.value
        });
      } else {
        onBlur(e.target.value);
      }
    });
    _defineProperty(this, "onChange", e => {
      var {
        value,
        onChange
      } = this.props.input;
      if (e.target.value && value.like) {
        onChange({
          like: e.target.value
        });
      } else {
        onChange(e.target.value);
      }
    });
    _defineProperty(this, "onLikeChange", like => {
      var {
        value,
        onChange
      } = this.props.input;
      if (!value) {
        return;
      }
      if (value.like && !like) {
        onChange(value.like);
      } else if (_lodash.default.isString(value) && like) {
        onChange({
          like: value
        });
      }
    });
    _defineProperty(this, "clear", () => {
      var {
        onChange
      } = this.props.input;
      onChange(null);
    });
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
    var text = value;
    var like = false;
    if (value.like) {
      text = value.like;
      like = true;
    }
    var {
      _t
    } = _xadmin.default.context;
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.InputGroup, field.attrs, /*#__PURE__*/_react.default.createElement(_reactBootstrap.InputGroup.Prepend, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.OverlayTrigger, {
      placement: "top",
      overlay: /*#__PURE__*/_react.default.createElement(_reactBootstrap.Tooltip, null, like ? _t('Fuzzy query') : _t('Exact query'))
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      variant: "outline-secondary",
      disabled: !text,
      onClick: () => this.onLikeChange(!like)
    }, like ? /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
      name: "magic"
    }) : /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
      name: "search"
    })))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control, _extends({
      type: "text"
    }, inputProps, field.attrs, {
      value: text,
      onBlur: this.onBlur,
      onChange: this.onChange
    })), /*#__PURE__*/_react.default.createElement(_reactBootstrap.InputGroup.Append, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      variant: "outline-secondary",
      onClick: this.clear,
      style: {
        borderLeft: 'none'
      }
    }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
      name: "close"
    }))));
  }
}
exports.default = TextFilter;