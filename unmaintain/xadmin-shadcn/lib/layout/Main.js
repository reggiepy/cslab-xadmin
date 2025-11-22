"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _xadmin = require("xadmin");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Main extends _react.default.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_xadmin.Block, {
      name: "body"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "xadmin-main"
    }, this.props.children));
  }
}
exports.default = Main;