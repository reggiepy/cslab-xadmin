"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimePicker = TimePicker;
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _popover = require("./popover");
var _utils = require("../../lib/utils");
var _lucideReact = require("lucide-react");
var _button = require("./button");
var _scrollArea = require("./scroll-area");
var _dateFns = require("date-fns");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Simple Time Picker
 * Check out the live demo at https://shadcn-datetime-picker-pro.vercel.app/
 * Find the latest source code at https://github.com/huybuidac/shadcn-datetime-picker
 */
var AM_VALUE = 0;
var PM_VALUE = 1;
function TimePicker(_ref) {
  var {
    value,
    onChange,
    use12HourFormat,
    min,
    max,
    disabled,
    modal
  } = _ref;
  // hours24h = HH
  // hours12h = hh
  var formatStr = (0, _react.useMemo)(() => use12HourFormat ? 'yyyy-MM-dd hh:mm:ss.SSS a xxxx' : 'yyyy-MM-dd HH:mm:ss.SSS xxxx', [use12HourFormat]);
  var [ampm, setAmpm] = (0, _react.useState)((0, _dateFns.format)(value, 'a') === 'AM' ? AM_VALUE : PM_VALUE);
  var [hour, setHour] = (0, _react.useState)(use12HourFormat ? +(0, _dateFns.format)(value, 'hh') : value.getHours());
  var [minute, setMinute] = (0, _react.useState)(value.getMinutes());
  var [second, setSecond] = (0, _react.useState)(value.getSeconds());
  (0, _react.useEffect)(() => {
    onChange(buildTime({
      use12HourFormat,
      value,
      formatStr,
      hour,
      minute,
      second,
      ampm
    }));
  }, [hour, minute, second, ampm, formatStr, use12HourFormat]);
  var _hourIn24h = (0, _react.useMemo)(() => {
    return use12HourFormat ? hour % 12 + ampm * 12 : hour;
  }, [hour, use12HourFormat, ampm]);
  var hours = (0, _react.useMemo)(() => Array.from({
    length: use12HourFormat ? 12 : 24
  }, (_, i) => {
    var disabled = false;
    var hourValue = use12HourFormat ? i === 0 ? 12 : i : i;
    var hDate = (0, _dateFns.setHours)(value, use12HourFormat ? i + ampm * 12 : i);
    var hStart = (0, _dateFns.startOfHour)(hDate);
    var hEnd = (0, _dateFns.endOfHour)(hDate);
    if (min && hEnd < min) disabled = true;
    if (max && hStart > max) disabled = true;
    return {
      value: hourValue,
      label: hourValue.toString().padStart(2, '0'),
      disabled
    };
  }), [value, min, max, use12HourFormat, ampm]);
  var minutes = (0, _react.useMemo)(() => {
    var anchorDate = (0, _dateFns.setHours)(value, _hourIn24h);
    return Array.from({
      length: 60
    }, (_, i) => {
      var disabled = false;
      var mDate = (0, _dateFns.setMinutes)(anchorDate, i);
      var mStart = (0, _dateFns.startOfMinute)(mDate);
      var mEnd = (0, _dateFns.endOfMinute)(mDate);
      if (min && mEnd < min) disabled = true;
      if (max && mStart > max) disabled = true;
      return {
        value: i,
        label: i.toString().padStart(2, '0'),
        disabled
      };
    });
  }, [value, min, max, _hourIn24h]);
  var seconds = (0, _react.useMemo)(() => {
    var anchorDate = (0, _dateFns.setMilliseconds)((0, _dateFns.setMinutes)((0, _dateFns.setHours)(value, _hourIn24h), minute), 0);
    var _min = min ? (0, _dateFns.setMilliseconds)(min, 0) : undefined;
    var _max = max ? (0, _dateFns.setMilliseconds)(max, 0) : undefined;
    return Array.from({
      length: 60
    }, (_, i) => {
      var disabled = false;
      var sDate = (0, _dateFns.setSeconds)(anchorDate, i);
      if (_min && sDate < _min) disabled = true;
      if (_max && sDate > _max) disabled = true;
      return {
        value: i,
        label: i.toString().padStart(2, '0'),
        disabled
      };
    });
  }, [value, minute, min, max, _hourIn24h]);
  var ampmOptions = (0, _react.useMemo)(() => {
    var startD = (0, _dateFns.startOfDay)(value);
    var endD = (0, _dateFns.endOfDay)(value);
    return [{
      value: AM_VALUE,
      label: 'AM'
    }, {
      value: PM_VALUE,
      label: 'PM'
    }].map(v => {
      var disabled = false;
      var start = (0, _dateFns.addHours)(startD, v.value * 12);
      var end = (0, _dateFns.subHours)(endD, (1 - v.value) * 12);
      if (min && end < min) disabled = true;
      if (max && start > max) disabled = true;
      return _objectSpread(_objectSpread({}, v), {}, {
        disabled
      });
    });
  }, [value, min, max]);
  var [open, setOpen] = (0, _react.useState)(false);
  var hourRef = (0, _react.useRef)(null);
  var minuteRef = (0, _react.useRef)(null);
  var secondRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    var timeoutId = setTimeout(() => {
      if (open) {
        var _hourRef$current, _minuteRef$current, _secondRef$current;
        (_hourRef$current = hourRef.current) === null || _hourRef$current === void 0 || _hourRef$current.scrollIntoView({
          behavior: 'auto'
        });
        (_minuteRef$current = minuteRef.current) === null || _minuteRef$current === void 0 || _minuteRef$current.scrollIntoView({
          behavior: 'auto'
        });
        (_secondRef$current = secondRef.current) === null || _secondRef$current === void 0 || _secondRef$current.scrollIntoView({
          behavior: 'auto'
        });
      }
    }, 1);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  var onHourChange = (0, _react.useCallback)(v => {
    if (min) {
      var newTime = buildTime({
        use12HourFormat,
        value,
        formatStr,
        hour: v.value,
        minute,
        second,
        ampm
      });
      if (newTime < min) {
        setMinute(min.getMinutes());
        setSecond(min.getSeconds());
      }
    }
    if (max) {
      var _newTime = buildTime({
        use12HourFormat,
        value,
        formatStr,
        hour: v.value,
        minute,
        second,
        ampm
      });
      if (_newTime > max) {
        setMinute(max.getMinutes());
        setSecond(max.getSeconds());
      }
    }
    setHour(v.value);
  }, [setHour, use12HourFormat, value, formatStr, minute, second, ampm]);
  var onMinuteChange = (0, _react.useCallback)(v => {
    if (min) {
      var newTime = buildTime({
        use12HourFormat,
        value,
        formatStr,
        hour: v.value,
        minute,
        second,
        ampm
      });
      if (newTime < min) {
        setSecond(min.getSeconds());
      }
    }
    if (max) {
      var _newTime2 = buildTime({
        use12HourFormat,
        value,
        formatStr,
        hour: v.value,
        minute,
        second,
        ampm
      });
      if (_newTime2 > max) {
        setSecond(_newTime2.getSeconds());
      }
    }
    setMinute(v.value);
  }, [setMinute, use12HourFormat, value, formatStr, hour, second, ampm]);
  var onAmpmChange = (0, _react.useCallback)(v => {
    if (min) {
      var newTime = buildTime({
        use12HourFormat,
        value,
        formatStr,
        hour,
        minute,
        second,
        ampm: v.value
      });
      if (newTime < min) {
        var minH = min.getHours() % 12;
        setHour(minH === 0 ? 12 : minH);
        setMinute(min.getMinutes());
        setSecond(min.getSeconds());
      }
    }
    if (max) {
      var _newTime3 = buildTime({
        use12HourFormat,
        value,
        formatStr,
        hour,
        minute,
        second,
        ampm: v.value
      });
      if (_newTime3 > max) {
        var maxH = max.getHours() % 12;
        setHour(maxH === 0 ? 12 : maxH);
        setMinute(max.getMinutes());
        setSecond(max.getSeconds());
      }
    }
    setAmpm(v.value);
  }, [setAmpm, use12HourFormat, value, formatStr, hour, minute, second, min, max]);
  var display = (0, _react.useMemo)(() => {
    return (0, _dateFns.format)(value, use12HourFormat ? 'hh:mm:ss a' : 'HH:mm:ss');
  }, [value, use12HourFormat]);
  return /*#__PURE__*/React.createElement(_popover.Popover, {
    open: open,
    onOpenChange: setOpen,
    modal: modal
  }, /*#__PURE__*/React.createElement(_popover.PopoverTrigger, {
    asChild: true
  }, /*#__PURE__*/React.createElement("div", {
    role: "combobox",
    "aria-expanded": open,
    className: (0, _utils.cn)('flex h-9 px-3 items-center justify-between cursor-pointer font-normal border border-input rounded-md text-sm shadow-sm', disabled && 'opacity-50 cursor-not-allowed'),
    tabIndex: 0
  }, /*#__PURE__*/React.createElement(_lucideReact.Clock, {
    className: "mr-2 size-4"
  }), display, /*#__PURE__*/React.createElement(_lucideReact.ChevronDownIcon, {
    className: "ml-2 size-4 shrink-0 opacity-50"
  }))), /*#__PURE__*/React.createElement(_popover.PopoverContent, {
    className: "p-0",
    side: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-col gap-2 p-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex h-56 grow"
  }, /*#__PURE__*/React.createElement(_scrollArea.ScrollArea, {
    className: "h-full flex-grow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex grow flex-col items-stretch overflow-y-auto pe-2 pb-48"
  }, hours.map(v => /*#__PURE__*/React.createElement("div", {
    ref: v.value === hour ? hourRef : undefined,
    key: v.value
  }, /*#__PURE__*/React.createElement(TimeItem, {
    option: v,
    selected: v.value === hour,
    onSelect: onHourChange,
    disabled: v.disabled,
    className: "h-8"
  }))))), /*#__PURE__*/React.createElement(_scrollArea.ScrollArea, {
    className: "h-full flex-grow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex grow flex-col items-stretch overflow-y-auto pe-2 pb-48"
  }, minutes.map(v => /*#__PURE__*/React.createElement("div", {
    ref: v.value === minute ? minuteRef : undefined,
    key: v.value
  }, /*#__PURE__*/React.createElement(TimeItem, {
    option: v,
    selected: v.value === minute,
    onSelect: onMinuteChange,
    disabled: v.disabled,
    className: "h-8"
  }))))), /*#__PURE__*/React.createElement(_scrollArea.ScrollArea, {
    className: "h-full flex-grow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex grow flex-col items-stretch overflow-y-auto pe-2 pb-48"
  }, seconds.map(v => /*#__PURE__*/React.createElement("div", {
    ref: v.value === second ? secondRef : undefined,
    key: v.value
  }, /*#__PURE__*/React.createElement(TimeItem, {
    option: v,
    selected: v.value === second,
    onSelect: v => setSecond(v.value),
    className: "h-8",
    disabled: v.disabled
  }))))), use12HourFormat && /*#__PURE__*/React.createElement(_scrollArea.ScrollArea, {
    className: "h-full flex-grow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex grow flex-col items-stretch overflow-y-auto pe-2"
  }, ampmOptions.map(v => /*#__PURE__*/React.createElement(TimeItem, {
    key: v.value,
    option: v,
    selected: v.value === ampm,
    onSelect: onAmpmChange,
    className: "h-8",
    disabled: v.disabled
  }))))))));
}
var TimeItem = _ref2 => {
  var {
    option,
    selected,
    onSelect,
    className,
    disabled
  } = _ref2;
  return /*#__PURE__*/React.createElement(_button.Button, {
    variant: "ghost",
    className: (0, _utils.cn)('flex justify-center px-1 pe-2 ps-1', className),
    onClick: () => onSelect(option),
    disabled: disabled
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-4"
  }, selected && /*#__PURE__*/React.createElement(_lucideReact.CheckIcon, {
    className: "my-auto size-4"
  })), /*#__PURE__*/React.createElement("span", {
    className: "ms-2"
  }, option.label));
};
function buildTime(options) {
  var {
    use12HourFormat,
    value,
    formatStr,
    hour,
    minute,
    second,
    ampm
  } = options;
  var date;
  if (use12HourFormat) {
    var dateStrRaw = (0, _dateFns.format)(value, formatStr);
    // yyyy-MM-dd hh:mm:ss.SSS a zzzz
    // 2024-10-14 01:20:07.524 AM GMT+00:00
    var dateStr = dateStrRaw.slice(0, 11) + hour.toString().padStart(2, '0') + dateStrRaw.slice(13);
    dateStr = dateStr.slice(0, 14) + minute.toString().padStart(2, '0') + dateStr.slice(16);
    dateStr = dateStr.slice(0, 17) + second.toString().padStart(2, '0') + dateStr.slice(19);
    dateStr = dateStr.slice(0, 24) + (ampm == AM_VALUE ? 'AM' : 'PM') + dateStr.slice(26);
    date = (0, _dateFns.parse)(dateStr, formatStr, value);
  } else {
    date = (0, _dateFns.setHours)((0, _dateFns.setMinutes)((0, _dateFns.setSeconds)((0, _dateFns.setMilliseconds)(value, 0), second), minute), hour);
  }
  return date;
}