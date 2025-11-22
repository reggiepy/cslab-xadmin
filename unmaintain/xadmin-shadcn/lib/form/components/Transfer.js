"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _xadmin = _interopRequireWildcard(require("xadmin"));
var _xadminUi = require("xadmin-ui");
var _transferList = _interopRequireDefault(require("../../components/ui/transfer-list"));
var _lodash = _interopRequireDefault(require("lodash"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var RelateMultiTransfer = _ref => {
  var {
    input: {
      value,
      onChange
    },
    field
  } = _ref;
  var {
    loading,
    options
  } = (0, _xadmin.use)('model.relate.select', {
    field
  });
  var data = _react.default.useMemo(() => options.map(opt => ({
    key: opt.value,
    label: opt.label
  })), [options]);
  var onSelectChange = targetKeys => {
    onChange(options.filter(opt => targetKeys.indexOf(opt.value) >= 0).map(opt => opt.item));
  };
  return loading ? /*#__PURE__*/_react.default.createElement(_xadminUi.Loading, null) : /*#__PURE__*/_react.default.createElement(_transferList.default, _extends({
    items: data,
    value: value ? value.map(item => item.id) : [],
    onChange: onSelectChange
  }, field.attrs));
};
var _default = exports.default = RelateMultiTransfer;