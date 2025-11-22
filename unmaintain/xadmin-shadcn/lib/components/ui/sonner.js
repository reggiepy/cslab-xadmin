"use strict";
"use client";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toaster = void 0;
var _nextThemes = require("next-themes");
var _sonner = require("sonner");
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var Toaster = _ref => {
  var props = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var {
    theme = "system"
  } = (0, _nextThemes.useTheme)();
  return /*#__PURE__*/React.createElement(_sonner.Toaster, _extends({
    theme: theme,
    className: "toaster group",
    toastOptions: {
      classNames: {
        toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
        description: "group-[.toast]:text-muted-foreground",
        actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
        cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
      }
    }
  }, props));
};
exports.Toaster = Toaster;