"use strict";
/**
 * Shadcn Datetime Picker with support for timezone, date and time selection, minimum and maximum date limits, and 12-hour format...
 * Check out the live demo at https://shadcn-datetime-picker-pro.vercel.app/
 * Find the latest source code at https://github.com/huybuidac/shadcn-datetime-picker
 */
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTimePicker = DateTimePicker;
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _lucideReact = require("lucide-react");
var _dateFns = require("date-fns");
var _reactDayPicker = require("react-day-picker");
var _utils = require("../../lib/utils");
var _button = require("./button");
var _popover = require("./popover");
var _scrollArea = require("./scroll-area");
var _excluded = ["value", "onChange", "renderTrigger", "min", "max", "timezone", "hideTime", "use12HourFormat", "disabled", "clearable", "classNames", "timePicker", "modal"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var AM_VALUE = 0;
var PM_VALUE = 1;
function DateTimePicker(_ref) {
  var {
      value,
      onChange,
      renderTrigger,
      min,
      max,
      timezone,
      hideTime,
      use12HourFormat,
      disabled,
      clearable,
      classNames,
      timePicker,
      modal = false
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  var [open, setOpen] = (0, _react.useState)(false);
  var [monthYearPicker, setMonthYearPicker] = (0, _react.useState)(false);
  var initDate = (0, _react.useMemo)(() => new _reactDayPicker.TZDate(value || new Date(), timezone), [value, timezone]);
  var [month, setMonth] = (0, _react.useState)(initDate);
  var [date, setDate] = (0, _react.useState)(initDate);
  var endMonth = (0, _react.useMemo)(() => {
    return (0, _dateFns.setYear)(month, (0, _dateFns.getYear)(month) + 1);
  }, [month]);
  var minDate = (0, _react.useMemo)(() => min ? new _reactDayPicker.TZDate(min, timezone) : undefined, [min, timezone]);
  var maxDate = (0, _react.useMemo)(() => max ? new _reactDayPicker.TZDate(max, timezone) : undefined, [max, timezone]);
  var onDayChanged = (0, _react.useCallback)(d => {
    d.setHours(date.getHours(), date.getMinutes(), date.getSeconds());
    if (min && d < min) {
      d.setHours(min.getHours(), min.getMinutes(), min.getSeconds());
    }
    if (max && d > max) {
      d.setHours(max.getHours(), max.getMinutes(), max.getSeconds());
    }
    setDate(d);
  }, [setDate, setMonth]);
  var onSubmit = (0, _react.useCallback)(() => {
    onChange(new Date(date));
    setOpen(false);
  }, [date, onChange]);
  var onMonthYearChanged = (0, _react.useCallback)((d, mode) => {
    setMonth(d);
    if (mode === 'year') {
      setMonthYearPicker('month');
    } else {
      setMonthYearPicker(false);
    }
  }, [setMonth, setMonthYearPicker]);
  var onNextMonth = (0, _react.useCallback)(() => {
    setMonth((0, _dateFns.addMonths)(month, 1));
  }, [month]);
  var onPrevMonth = (0, _react.useCallback)(() => {
    setMonth((0, _dateFns.subMonths)(month, 1));
  }, [month]);
  (0, _react.useEffect)(() => {
    if (open) {
      setDate(initDate);
      setMonth(initDate);
      setMonthYearPicker(false);
    }
  }, [open, initDate]);
  var displayValue = (0, _react.useMemo)(() => {
    if (!open && !value) return value;
    return open ? date : initDate;
  }, [date, value, open]);
  var dislayFormat = (0, _react.useMemo)(() => {
    if (!displayValue) return 'Pick a date';
    return (0, _dateFns.format)(displayValue, "".concat(!hideTime ? 'MMM' : 'MMMM', " d, yyyy").concat(!hideTime ? use12HourFormat ? ' hh:mm:ss a' : ' HH:mm:ss' : ''));
  }, [displayValue, hideTime, use12HourFormat]);
  return /*#__PURE__*/React.createElement(_popover.Popover, {
    open: open,
    onOpenChange: setOpen,
    modal: modal
  }, /*#__PURE__*/React.createElement(_popover.PopoverTrigger, {
    asChild: true
  }, renderTrigger ? renderTrigger({
    value: displayValue,
    open,
    timezone,
    disabled,
    use12HourFormat,
    setOpen
  }) : /*#__PURE__*/React.createElement("div", {
    className: (0, _utils.cn)('flex w-full cursor-pointer items-center h-9 ps-3 pe-1 font-normal border border-input rounded-md text-sm shadow-sm', !displayValue && 'text-muted-foreground', (!clearable || !value) && 'pe-3', disabled && 'opacity-50 cursor-not-allowed', classNames === null || classNames === void 0 ? void 0 : classNames.trigger),
    tabIndex: 0
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-grow flex items-center"
  }, /*#__PURE__*/React.createElement(_lucideReact.CalendarIcon, {
    className: "mr-2 size-4"
  }), dislayFormat), clearable && value && /*#__PURE__*/React.createElement(_button.Button, {
    disabled: disabled,
    variant: "ghost",
    size: "sm",
    role: "button",
    "aria-label": "Clear date",
    className: "size-6 p-1 ms-1",
    onClick: e => {
      e.stopPropagation();
      e.preventDefault();
      onChange(undefined);
      setOpen(false);
    }
  }, /*#__PURE__*/React.createElement(_lucideReact.XCircle, {
    className: "size-4"
  })))), /*#__PURE__*/React.createElement(_popover.PopoverContent, {
    className: "w-auto p-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-md font-bold ms-2 flex items-center cursor-pointer"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    onClick: () => setMonthYearPicker(monthYearPicker === 'month' ? false : 'month')
  }, (0, _dateFns.format)(month, 'MMMM')), /*#__PURE__*/React.createElement("span", {
    className: "ms-1",
    onClick: () => setMonthYearPicker(monthYearPicker === 'year' ? false : 'year')
  }, (0, _dateFns.format)(month, 'yyyy'))), /*#__PURE__*/React.createElement(_button.Button, {
    variant: "ghost",
    size: "icon",
    onClick: () => setMonthYearPicker(monthYearPicker ? false : 'year')
  }, monthYearPicker ? /*#__PURE__*/React.createElement(_lucideReact.ChevronUpIcon, null) : /*#__PURE__*/React.createElement(_lucideReact.ChevronDownIcon, null))), /*#__PURE__*/React.createElement("div", {
    className: (0, _utils.cn)('flex space-x-2', monthYearPicker ? 'hidden' : '')
  }, /*#__PURE__*/React.createElement(_button.Button, {
    variant: "ghost",
    size: "icon",
    onClick: onPrevMonth
  }, /*#__PURE__*/React.createElement(_lucideReact.ChevronLeftIcon, null)), /*#__PURE__*/React.createElement(_button.Button, {
    variant: "ghost",
    size: "icon",
    onClick: onNextMonth
  }, /*#__PURE__*/React.createElement(_lucideReact.ChevronRightIcon, null)))), /*#__PURE__*/React.createElement("div", {
    className: "relative overflow-hidden"
  }, /*#__PURE__*/React.createElement(_reactDayPicker.DayPicker, _extends({
    timeZone: timezone,
    mode: "single",
    selected: date,
    onSelect: d => d && onDayChanged(d),
    month: month,
    endMonth: endMonth,
    disabled: [max ? {
      after: max
    } : null, min ? {
      before: min
    } : null].filter(Boolean),
    onMonthChange: setMonth,
    classNames: {
      dropdowns: 'flex w-full gap-2',
      months: 'flex w-full h-fit',
      month: 'flex flex-col w-full',
      month_caption: 'hidden',
      button_previous: 'hidden',
      button_next: 'hidden',
      month_grid: 'w-full border-collapse',
      weekdays: 'flex justify-between mt-2',
      weekday: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
      week: 'flex w-full justify-between mt-2',
      day: 'h-9 w-9 text-center text-sm p-0 relative flex items-center justify-center [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 rounded-1',
      day_button: (0, _utils.cn)((0, _button.buttonVariants)({
        variant: 'ghost'
      }), 'size-9 rounded-md p-0 font-normal aria-selected:opacity-100'),
      range_end: 'day-range-end',
      selected: 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-l-md rounded-r-md',
      today: 'bg-accent text-accent-foreground',
      outside: 'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
      disabled: 'text-muted-foreground opacity-50',
      range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
      hidden: 'invisible'
    },
    showOutsideDays: true
  }, props)), /*#__PURE__*/React.createElement("div", {
    className: (0, _utils.cn)('absolute top-0 left-0 bottom-0 right-0', monthYearPicker ? 'bg-popover' : 'hidden')
  }), /*#__PURE__*/React.createElement(MonthYearPicker, {
    value: month,
    mode: monthYearPicker,
    onChange: onMonthYearChanged,
    minDate: minDate,
    maxDate: maxDate,
    className: (0, _utils.cn)('absolute top-0 left-0 bottom-0 right-0', monthYearPicker ? '' : 'hidden')
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2"
  }, !hideTime && /*#__PURE__*/React.createElement(TimePicker, {
    timePicker: timePicker,
    value: date,
    onChange: setDate,
    use12HourFormat: use12HourFormat,
    min: minDate,
    max: maxDate
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row-reverse items-center justify-between"
  }, /*#__PURE__*/React.createElement(_button.Button, {
    className: "ms-2 h-7 px-2",
    onClick: onSubmit
  }, "Done"), timezone && /*#__PURE__*/React.createElement("div", {
    className: "text-sm"
  }, /*#__PURE__*/React.createElement("span", null, "Timezone:"), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold ms-1"
  }, timezone))))));
}
function MonthYearPicker(_ref2) {
  var {
    value,
    minDate,
    maxDate,
    mode = 'month',
    onChange,
    className
  } = _ref2;
  var yearRef = (0, _react.useRef)(null);
  var years = (0, _react.useMemo)(() => {
    var years = [];
    for (var i = 1912; i < 2100; i++) {
      var disabled = false;
      var startY = (0, _dateFns.startOfYear)((0, _dateFns.setYear)(value, i));
      var endY = (0, _dateFns.endOfYear)((0, _dateFns.setYear)(value, i));
      if (minDate && endY < minDate) disabled = true;
      if (maxDate && startY > maxDate) disabled = true;
      years.push({
        value: i,
        label: i.toString(),
        disabled
      });
    }
    return years;
  }, [value]);
  var months = (0, _react.useMemo)(() => {
    var months = [];
    for (var i = 0; i < 12; i++) {
      var disabled = false;
      var startM = (0, _dateFns.startOfMonth)((0, _dateFns.setMonth)(value, i));
      var endM = (0, _dateFns.endOfMonth)((0, _dateFns.setMonth)(value, i));
      if (minDate && endM < minDate) disabled = true;
      if (maxDate && startM > maxDate) disabled = true;
      months.push({
        value: i,
        label: (0, _dateFns.format)(new Date(0, i), 'MMM'),
        disabled
      });
    }
    return months;
  }, [value]);
  var onYearChange = (0, _react.useCallback)(v => {
    var newDate = (0, _dateFns.setYear)(value, v.value);
    if (minDate && newDate < minDate) {
      newDate = (0, _dateFns.setMonth)(newDate, (0, _dateFns.getMonth)(minDate));
    }
    if (maxDate && newDate > maxDate) {
      newDate = (0, _dateFns.setMonth)(newDate, (0, _dateFns.getMonth)(maxDate));
    }
    onChange(newDate, 'year');
  }, [onChange, value, minDate, maxDate]);
  (0, _react.useEffect)(() => {
    if (mode === 'year') {
      var _yearRef$current;
      (_yearRef$current = yearRef.current) === null || _yearRef$current === void 0 || _yearRef$current.scrollIntoView({
        behavior: 'auto',
        block: 'center'
      });
    }
  }, [mode, value]);
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _utils.cn)(className)
  }, /*#__PURE__*/React.createElement(_scrollArea.ScrollArea, {
    className: "h-full"
  }, mode === 'year' && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-4"
  }, years.map(year => /*#__PURE__*/React.createElement("div", {
    key: year.value,
    ref: year.value === (0, _dateFns.getYear)(value) ? yearRef : undefined
  }, /*#__PURE__*/React.createElement(_button.Button, {
    disabled: year.disabled,
    variant: (0, _dateFns.getYear)(value) === year.value ? 'default' : 'ghost',
    className: "rounded-full",
    onClick: () => onYearChange(year)
  }, year.label)))), mode === 'month' && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-4"
  }, months.map(month => /*#__PURE__*/React.createElement(_button.Button, {
    key: month.value,
    size: "lg",
    disabled: month.disabled,
    variant: (0, _dateFns.getMonth)(value) === month.value ? 'default' : 'ghost',
    className: "rounded-full",
    onClick: () => onChange((0, _dateFns.setMonth)(value, month.value), 'month')
  }, month.label)))));
}
function TimePicker(_ref3) {
  var {
    value,
    onChange,
    use12HourFormat,
    min,
    max,
    timePicker
  } = _ref3;
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
    // if (use12HourFormat) {
    //   return (hour % 12) + ampm * 12;
    // }
    return use12HourFormat ? hour % 12 + ampm * 12 : hour;
  }, [value, use12HourFormat, ampm]);
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
    var arr = [];
    for (var element of ['hour', 'minute', 'second']) {
      if (!timePicker || timePicker[element]) {
        if (element === 'hour') {
          arr.push(use12HourFormat ? 'hh' : 'HH');
        } else {
          arr.push(element === 'minute' ? 'mm' : 'ss');
        }
      }
    }
    return (0, _dateFns.format)(value, arr.join(':') + (use12HourFormat ? ' a' : ''));
  }, [value, use12HourFormat, timePicker]);
  return /*#__PURE__*/React.createElement(_popover.Popover, {
    open: open,
    onOpenChange: setOpen
  }, /*#__PURE__*/React.createElement(_popover.PopoverTrigger, {
    asChild: true
  }, /*#__PURE__*/React.createElement(_button.Button, {
    variant: "outline",
    role: "combobox",
    "aria-expanded": open,
    className: "justify-between"
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
  }, (!timePicker || timePicker.hour) && /*#__PURE__*/React.createElement(_scrollArea.ScrollArea, {
    className: "h-full flex-grow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex grow flex-col items-stretch overflow-y-auto pe-2 pb-48"
  }, hours.map(v => /*#__PURE__*/React.createElement("div", {
    key: v.value,
    ref: v.value === hour ? hourRef : undefined
  }, /*#__PURE__*/React.createElement(TimeItem, {
    option: v,
    selected: v.value === hour,
    onSelect: onHourChange,
    className: "h-8",
    disabled: v.disabled
  }))))), (!timePicker || timePicker.minute) && /*#__PURE__*/React.createElement(_scrollArea.ScrollArea, {
    className: "h-full flex-grow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex grow flex-col items-stretch overflow-y-auto pe-2 pb-48"
  }, minutes.map(v => /*#__PURE__*/React.createElement("div", {
    key: v.value,
    ref: v.value === minute ? minuteRef : undefined
  }, /*#__PURE__*/React.createElement(TimeItem, {
    option: v,
    selected: v.value === minute,
    onSelect: onMinuteChange,
    className: "h-8",
    disabled: v.disabled
  }))))), (!timePicker || timePicker.second) && /*#__PURE__*/React.createElement(_scrollArea.ScrollArea, {
    className: "h-full flex-grow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex grow flex-col items-stretch overflow-y-auto pe-2 pb-48"
  }, seconds.map(v => /*#__PURE__*/React.createElement("div", {
    key: v.value,
    ref: v.value === second ? secondRef : undefined
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
var TimeItem = _ref4 => {
  var {
    option,
    selected,
    onSelect,
    className,
    disabled
  } = _ref4;
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
    date = (0, _dateFns.setHours)((0, _dateFns.setMinutes)((0, _dateFns.setSeconds)(value, second), minute), hour);
  }
  return date;
}