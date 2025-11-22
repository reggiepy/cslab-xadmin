"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _xadmin = _interopRequireDefault(require("xadmin"));
var _layout = require("./layout");
var _form = _interopRequireDefault(require("./form"));
var _model = _interopRequireDefault(require("./model"));
var _relate = _interopRequireDefault(require("./model/relate"));
var _filter = _interopRequireDefault(require("./filter"));
var _locales = _interopRequireDefault(require("./locales"));
var _themeContext = require("./context/theme-context");
require("./index.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = exports.default = {
  name: 'xadmin.ui.shadcn',
  locales: _locales.default,
  components: _objectSpread(_objectSpread(_objectSpread(_objectSpread({
    Main: _layout.Main,
    App: _layout.App,
    BaseApp: _layout.App,
    Page: _layout.Page,
    Icon: _layout.Icon
  }, _form.default.components), _model.default.components), _relate.default.components), _filter.default.components),
  root_component: app => children => /*#__PURE__*/_react.default.createElement(_themeContext.ThemeProvider, null, children),
  form_fields: _objectSpread(_objectSpread(_objectSpread({}, _form.default.form_fields), _filter.default.form_fields), _relate.default.form_fields)
  // hooks: {
  //   'message': () => message
  // },
  // effects
};