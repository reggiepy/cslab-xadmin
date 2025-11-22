"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _textarea = require("../../components/ui/textarea");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var _default = _ref => {
  var {
    input,
    field
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_textarea.Textarea, _extends({
    rows: 4
  }, input, field.attrs));
};
exports.default = _default;