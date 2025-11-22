"use strict";
"use client";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFormField = exports.FormMessage = exports.FormLabel = exports.FormItem = exports.FormDescription = exports.FormControl = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactSlot = require("@radix-ui/react-slot");
var _utils = require("../../lib/utils");
var _label = require("./label");
var _excluded = ["className", "error"],
  _excluded2 = ["className"],
  _excluded3 = ["className"],
  _excluded4 = ["className", "children"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var useFormField = () => {
  var itemContext = React.useContext(FormItemContext);
  var {
    id,
    error
  } = itemContext;
  return {
    id,
    formItemId: "".concat(id, "-form-item"),
    formDescriptionId: "".concat(id, "-form-item-description"),
    formMessageId: "".concat(id, "-form-item-message"),
    error
  };
};
exports.useFormField = useFormField;
var FormItemContext = /*#__PURE__*/React.createContext({});
var FormItem = exports.FormItem = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  var {
      className,
      error
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  var id = React.useId();
  return /*#__PURE__*/React.createElement(FormItemContext.Provider, {
    value: {
      id,
      error
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    className: (0, _utils.cn)("space-y-2", className)
  }, props)));
});
FormItem.displayName = "FormItem";
var FormLabel = exports.FormLabel = /*#__PURE__*/React.forwardRef((_ref2, ref) => {
  var {
      className
    } = _ref2,
    props = _objectWithoutProperties(_ref2, _excluded2);
  var {
    error,
    formItemId
  } = useFormField();
  return /*#__PURE__*/React.createElement(_label.Label, _extends({
    ref: ref,
    className: (0, _utils.cn)(error && "text-destructive", className),
    htmlFor: formItemId
  }, props));
});
FormLabel.displayName = "FormLabel";
var FormControl = exports.FormControl = /*#__PURE__*/React.forwardRef((_ref3, ref) => {
  var props = _extends({}, (_objectDestructuringEmpty(_ref3), _ref3));
  var {
    error,
    formItemId,
    formDescriptionId,
    formMessageId
  } = useFormField();
  return /*#__PURE__*/React.createElement(_reactSlot.Slot, _extends({
    ref: ref,
    id: formItemId,
    "aria-describedby": !error ? "".concat(formDescriptionId) : "".concat(formDescriptionId, " ").concat(formMessageId),
    "aria-invalid": !!error
  }, props));
});
FormControl.displayName = "FormControl";
var FormDescription = exports.FormDescription = /*#__PURE__*/React.forwardRef((_ref4, ref) => {
  var {
      className
    } = _ref4,
    props = _objectWithoutProperties(_ref4, _excluded3);
  var {
    formDescriptionId
  } = useFormField();
  return /*#__PURE__*/React.createElement("p", _extends({
    ref: ref,
    id: formDescriptionId,
    className: (0, _utils.cn)("text-[0.8rem] text-muted-foreground", className)
  }, props));
});
FormDescription.displayName = "FormDescription";
var FormMessage = exports.FormMessage = /*#__PURE__*/React.forwardRef((_ref5, ref) => {
  var {
      className,
      children
    } = _ref5,
    props = _objectWithoutProperties(_ref5, _excluded4);
  var {
    error,
    formMessageId
  } = useFormField();
  var body = error ? String(error) : children;
  if (!body) {
    return null;
  }
  return /*#__PURE__*/React.createElement("p", _extends({
    ref: ref,
    id: formMessageId,
    className: (0, _utils.cn)("text-[0.8rem] font-medium text-destructive", className)
  }, props), body);
});
FormMessage.displayName = "FormMessage";