"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeProvider = ThemeProvider;
exports.useTheme = void 0;
var _react = _interopRequireWildcard(require("react"));
var _excluded = ["children", "defaultTheme", "storageKey"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var initialState = {
  theme: 'system',
  setTheme: () => null
};
var ThemeProviderContext = /*#__PURE__*/(0, _react.createContext)(initialState);
function ThemeProvider(_ref) {
  var {
      children,
      defaultTheme = 'system',
      storageKey = 'xadmin-ui-theme'
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  var [theme, _setTheme] = (0, _react.useState)(() => localStorage.getItem(storageKey) || defaultTheme);
  (0, _react.useEffect)(() => {
    var root = window.document.documentElement;
    var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    var applyTheme = theme => {
      root.classList.remove('light', 'dark'); // Remove existing theme classes
      var systemTheme = mediaQuery.matches ? 'dark' : 'light';
      var effectiveTheme = theme === 'system' ? systemTheme : theme;
      root.classList.add(effectiveTheme); // Add the new theme class
    };
    var handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    applyTheme(theme);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);
  var setTheme = theme => {
    localStorage.setItem(storageKey, theme);
    _setTheme(theme);
  };
  var value = {
    theme,
    setTheme
  };
  return /*#__PURE__*/_react.default.createElement(ThemeProviderContext.Provider, _extends({}, props, {
    value: value
  }), children);
}

// eslint-disable-next-line react-refresh/only-export-components
var useTheme = () => {
  var context = (0, _react.useContext)(ThemeProviderContext);
  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
exports.useTheme = useTheme;