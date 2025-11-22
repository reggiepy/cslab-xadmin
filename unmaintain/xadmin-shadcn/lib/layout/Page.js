"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _excluded = ["title", "subTitle", "content", "breadcrumb", "extra", "actions", "tabs", "footer", "className", "style", "children"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Page = props => {
  var {
      title,
      subTitle,
      content,
      breadcrumb,
      extra,
      actions,
      tabs,
      footer,
      className,
      style,
      children
    } = props,
    pageProps = _objectWithoutProperties(props, _excluded);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className,
    style: style
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "p-4"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h2", {
    className: "text-xl font-bold"
  }, title)), actions && /*#__PURE__*/_react.default.createElement("div", {
    className: "flex space-x-2"
  }, subTitle && /*#__PURE__*/_react.default.createElement("p", {
    className: "text-muted-foreground"
  }, subTitle), actions)), tabs && /*#__PURE__*/_react.default.createElement("div", {
    className: "mt-4"
  }, tabs), breadcrumb && /*#__PURE__*/_react.default.createElement("div", {
    className: "mt-4"
  }, breadcrumb), footer && /*#__PURE__*/_react.default.createElement("div", {
    className: "mt-4"
  }, footer)), content || extra ? /*#__PURE__*/_react.default.createElement("div", {
    className: "p-4"
  }, content && /*#__PURE__*/_react.default.createElement("div", {
    className: "mb-4"
  }, content), extra && /*#__PURE__*/_react.default.createElement("div", null, extra)) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "p-4"
  }, children));
};
var _default = exports.default = Page;