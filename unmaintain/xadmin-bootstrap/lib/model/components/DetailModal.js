"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _reactBootstrap = require("react-bootstrap");
var _xadmin = _interopRequireDefault(require("xadmin"));
var _xadminUi = require("xadmin-ui");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class DetailModal extends _react.default.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      show: false
    });
  }
  showModal() {
    this.setState({
      show: true
    });
  }
  hideModal() {
    this.setState({
      show: false
    });
  }
  render() {
    var {
      id,
      children
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("a", {
      style: {
        cursor: 'pointer'
      },
      onClick: this.showModal
    }, children), this.state.show && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal, {
      show: this.state.show,
      onHide: this.hideModal
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Header, {
      closeButton: true
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Title, null, children)), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Body, null, /*#__PURE__*/_react.default.createElement(_xadminUi.C, {
      is: "Model.DataDetail",
      id: id
    }))));
  }
}
var _default = exports.default = DetailModal;