"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeSwitch = ThemeSwitch;
var _react = _interopRequireWildcard(require("react"));
var _lucideReact = require("lucide-react");
var _utils = require("../lib/utils");
var _themeContext = require("../context/theme-context");
var _button = require("./ui/button");
var _dropdownMenu = require("./ui/dropdown-menu");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ThemeSwitch() {
  var {
    theme,
    setTheme
  } = (0, _themeContext.useTheme)();

  /* Update theme-color meta tag
   * when theme is updated */
  (0, _react.useEffect)(() => {
    var themeColor = theme === 'dark' ? '#020817' : '#fff';
    var metaThemeColor = document.querySelector("meta[name='theme-color']");
    if (metaThemeColor) metaThemeColor.setAttribute('content', themeColor);
  }, [theme]);
  return /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenu, {
    modal: false
  }, /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenuTrigger, {
    asChild: true
  }, /*#__PURE__*/_react.default.createElement(_button.Button, {
    variant: "ghost",
    size: "icon",
    className: "scale-95 rounded-full"
  }, /*#__PURE__*/_react.default.createElement(_lucideReact.SunIcon, {
    className: "size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
  }), /*#__PURE__*/_react.default.createElement(_lucideReact.MoonIcon, {
    className: "absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "sr-only"
  }, "Toggle theme"))), /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenuContent, {
    align: "end"
  }, /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenuItem, {
    onClick: () => setTheme('light')
  }, "Light", ' ', /*#__PURE__*/_react.default.createElement(_lucideReact.Check, {
    size: 14,
    className: (0, _utils.cn)('ml-auto', theme !== 'light' && 'hidden')
  })), /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenuItem, {
    onClick: () => setTheme('dark')
  }, "Dark", /*#__PURE__*/_react.default.createElement(_lucideReact.Check, {
    size: 14,
    className: (0, _utils.cn)('ml-auto', theme !== 'dark' && 'hidden')
  })), /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenuItem, {
    onClick: () => setTheme('system')
  }, "System", /*#__PURE__*/_react.default.createElement(_lucideReact.Check, {
    size: 14,
    className: (0, _utils.cn)('ml-auto', theme !== 'system' && 'hidden')
  }))));
}