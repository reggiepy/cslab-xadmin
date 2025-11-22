"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _xadmin = _interopRequireWildcard(require("xadmin"));
var _input = require("../../components/ui/input");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var SearchBar = () => {
  var {
    _t
  } = _xadmin.default.context;
  var {
    onSearch,
    searchTitles,
    searchValue
  } = (0, _xadmin.use)('model.searchbar');
  if (searchTitles && searchTitles.length > 0) {
    var placeholder = _t('Search') + ' ' + searchTitles.join(', ');
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "flex w-full max-w-sm items-center space-x-2"
    }, /*#__PURE__*/_react.default.createElement(_input.Input, {
      placeholder: placeholder,
      defaultValue: searchValue || undefined,
      onKeyUp: e => {
        if (e.key === 'Enter') {
          onSearch(e.target.value);
        }
      }
    }));
  }
  return null;
};
var _default = exports.default = SearchBar;