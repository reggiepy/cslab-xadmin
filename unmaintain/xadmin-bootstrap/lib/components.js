"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactBootstrap = require("react-bootstrap");
var _excluded = ["eventKey", "onItemClick", "children", "icon", "title"],
  _excluded2 = ["onSelect", "children", "icon", "title"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var MenuItem = _ref => {
  var {
      eventKey,
      onItemClick,
      children,
      icon,
      title
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav.Item, props, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav.Link, {
    eventKey: eventKey,
    onClick: onItemClick
  }, icon, " ", title || children));
};
var Menu = _ref2 => {
  var {
      onSelect,
      children,
      icon,
      title
    } = _ref2,
    props = _objectWithoutProperties(_ref2, _excluded2);
  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav, props, children);
};
var _default = exports.default = {
  Menu,
  'Menu.Item': MenuItem
};