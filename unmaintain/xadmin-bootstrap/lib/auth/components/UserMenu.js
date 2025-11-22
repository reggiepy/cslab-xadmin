"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactBootstrap = require("react-bootstrap");
var _reactFontawesome = _interopRequireDefault(require("react-fontawesome"));
var _xadmin = require("xadmin");
var _xadminI18n = require("xadmin-i18n");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var UserMenu = (0, _xadmin.StoreWrap)('auth.user')(_ref => {
  var {
    user,
    onLogout,
    onChangePassword
  } = _ref;
  return user && /*#__PURE__*/_react.default.createElement(_reactBootstrap.NavDropdown, {
    key: "user-dorpdown",
    alignRight: true,
    title: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
      name: "user"
    }), " ", user.username),
    id: "basic-nav-dropdown"
  }, /*#__PURE__*/_react.default.createElement(_xadmin.Block, {
    name: "top.user.menu",
    el: void 0
  }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.NavDropdown.Item, {
    key: 1,
    eventKey: 1,
    onSelect: onChangePassword
  }, (0, _xadminI18n._t)('Change password')), /*#__PURE__*/_react.default.createElement(_reactBootstrap.NavDropdown.Item, {
    key: 2,
    eventKey: 2,
    onSelect: onLogout
  }, (0, _xadminI18n._t)('Logout')));
});
var _default = exports.default = UserMenu;