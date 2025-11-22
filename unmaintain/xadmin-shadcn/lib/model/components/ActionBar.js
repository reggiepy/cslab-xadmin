"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _icons = require("@ant-design/icons");
var _antd = require("antd");
var _xadmin = require("xadmin");
var _xadminI18n = require("xadmin-i18n");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = props => {
  var {
    model
  } = (0, _xadmin.use)('model');
  var {
    count
  } = (0, _xadmin.use)('model.select');
  var {
    renderActions
  } = (0, _xadmin.use)('model.batchActions');
  var actions = renderActions(_objectSpread(_objectSpread({}, props), {}, {
    model
  }));
  return actions && actions.length > 0 ? /*#__PURE__*/_react.default.createElement(_antd.Dropdown, {
    id: "model-list-actions",
    overlay: /*#__PURE__*/_react.default.createElement(_antd.Menu, null, _react.default.Children.toArray(actions))
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, null, count > 0 ? (0, _xadminI18n._t)('{{count}} record selected', {
    count
  }) : (0, _xadminI18n._t)('No data selected'), " ", /*#__PURE__*/_react.default.createElement(_icons.DownOutlined, null))) : /*#__PURE__*/_react.default.createElement("div", null);
};
exports.default = _default;