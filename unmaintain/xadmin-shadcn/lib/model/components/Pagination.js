"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _xadmin = _interopRequireWildcard(require("xadmin"));
var _xadminI18n = require("xadmin-i18n");
var _excluded = ["emptyComponent", "maxButtons"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var _default = props => {
  var {
      emptyComponent,
      maxButtons = 6
    } = props,
    pagerProps = _objectWithoutProperties(props, _excluded);
  var {
    items,
    activePage,
    changePage
  } = (0, _xadmin.use)('model.pagination');
  if (items > 1 || emptyComponent == undefined) {
    return /*#__PURE__*/_react.default.createElement(_antd.Pagination, _extends({
      showQuickJumper: items > 10,
      showSizeChanger: false,
      current: activePage,
      size: props.size == 'sm' ? 'small' : '',
      className: props.className,
      pageSize: 1,
      total: items,
      onChange: changePage
    }, pagerProps));
  } else {
    return emptyComponent !== undefined ? emptyComponent : /*#__PURE__*/_react.default.createElement(_antd.Button, null, (0, _xadminI18n._t)('No paging'));
  }
};
exports.default = _default;