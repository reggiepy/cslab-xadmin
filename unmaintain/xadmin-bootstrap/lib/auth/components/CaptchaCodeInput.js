"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactBootstrap = require("react-bootstrap");
var _xadmin = require("xadmin");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class CaptchaCodeInput extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      url: this.getCodeUrl()
    };
  }
  getCodeUrl() {
    var {
      field
    } = this.props;
    return (0, _xadmin.api)({}).host + (field.captcha_url || '/get_captcha_code') + '?random=' + Math.random().toString();
  }
  render() {
    var {
      input,
      label,
      meta,
      field
    } = this.props;
    var {
      _t
    } = _xadmin.app.context;
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Row, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
      xs: 7
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormControl, _extends({}, input, field.attrs))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
      xs: 5
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.OverlayTrigger, {
      placement: "top",
      overlay: /*#__PURE__*/_react.default.createElement(_reactBootstrap.Tooltip, {
        id: "tooltip"
      }, _t('Click to refresh captcha code'))
    }, /*#__PURE__*/_react.default.createElement("img", {
      style: {
        cursor: 'pointer'
      },
      onClick: () => this.setState({
        url: this.getCodeUrl()
      }),
      src: this.state.url
    }))));
  }
}
exports.default = CaptchaCodeInput;