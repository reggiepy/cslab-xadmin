"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TransferList;
var _button = require("./button");
var _input = require("./input");
var _lucideReact = require("lucide-react");
var _react = _interopRequireDefault(require("react"));
var _utils = require("../../lib/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // 假设 _t 是一个国际化函数
function TransferList(_ref) {
  var {
    items,
    value,
    onChange
  } = _ref;
  var [leftList, setLeftList] = _react.default.useState(items);
  var [rightList, setRightList] = _react.default.useState(items.filter(item => value.includes(item.key)));
  var [leftSearch, setLeftSearch] = _react.default.useState('');
  var [rightSearch, setRightSearch] = _react.default.useState('');
  var moveToRight = () => {
    var selectedItems = leftList.filter(item => item.selected);
    setRightList([...rightList, ...selectedItems]);
    setLeftList(leftList.filter(item => !item.selected));
    onChange([...value, ...selectedItems.map(item => item.key)]);
  };
  var moveToLeft = () => {
    var selectedItems = rightList.filter(item => item.selected);
    setLeftList([...leftList, ...selectedItems]);
    setRightList(rightList.filter(item => !item.selected));
    onChange(value.filter(key => !selectedItems.some(item => item.key === key)));
  };
  var toggleSelection = (list, setList, key) => {
    var updatedList = list.map(item => {
      if (item.key === key) {
        return _objectSpread(_objectSpread({}, item), {}, {
          selected: !item.selected
        });
      }
      return item;
    });
    setList(updatedList);
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "flex space-x-4"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "w-1/2 shadow-sm bg-background rounded-sm"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react.default.createElement(_input.Input, {
    placeholder: (0, _utils._t)('Search'),
    className: "rounded-br-none rounded-bl-none rounded-tr-none focus-visible:ring-0 focus-visible:border-blue-500",
    value: leftSearch,
    onChange: e => setLeftSearch(e.target.value)
  }), /*#__PURE__*/_react.default.createElement(_button.Button, {
    className: "rounded-tl-none rounded-bl-none rounded-br-none border-l-0",
    onClick: moveToRight,
    size: "icon",
    variant: "outline"
  }, /*#__PURE__*/_react.default.createElement(_lucideReact.ChevronRightIcon, {
    className: "h-4 w-4"
  }))), /*#__PURE__*/_react.default.createElement("ul", {
    className: "h-[200px] border-l border-r border-b rounded-br-sm rounded-bl-sm p-1.5 overflow-y-scroll"
  }, leftList.filter(item => item.label.toLowerCase().includes(leftSearch.toLowerCase())).map(item => /*#__PURE__*/_react.default.createElement("li", {
    className: "flex items-center gap-1.5 text-sm hover:bg-muted rounded-sm",
    key: item.key
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "flex items-center gap-1.5 w-full p-1.5",
    onClick: () => toggleSelection(leftList, setLeftList, item.key)
  }, item.selected ? /*#__PURE__*/_react.default.createElement(_lucideReact.SquareCheckIcon, {
    className: "h-5 w-5 text-muted-foreground/50"
  }) : /*#__PURE__*/_react.default.createElement(_lucideReact.SquareIcon, {
    className: "h-5 w-5 text-muted-foreground/50"
  }), item.label))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "w-1/2 shadow-sm bg-background rounded-sm"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react.default.createElement(_button.Button, {
    className: "rounded-tr-none rounded-br-none rounded-bl-none border-r-0",
    onClick: moveToLeft,
    size: "icon",
    variant: "outline"
  }, /*#__PURE__*/_react.default.createElement(_lucideReact.ChevronLeftIcon, {
    className: "h-4 w-4"
  })), /*#__PURE__*/_react.default.createElement(_input.Input, {
    placeholder: (0, _utils._t)('Search'),
    className: "rounded-bl-none rounded-br-none rounded-tl-none focus-visible:ring-0 focus-visible:border-blue-500",
    value: rightSearch,
    onChange: e => setRightSearch(e.target.value)
  })), /*#__PURE__*/_react.default.createElement("ul", {
    className: "h-[200px] border-l border-r border-b rounded-br-sm rounded-bl-sm p-1.5 overflow-y-scroll"
  }, rightList.filter(item => item.label.toLowerCase().includes(rightSearch.toLowerCase())).map(item => /*#__PURE__*/_react.default.createElement("li", {
    className: "flex items-center gap-1.5 text-sm hover:bg-muted rounded-sm",
    key: item.key
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "flex items-center gap-1.5 w-full p-1.5",
    onClick: () => toggleSelection(rightList, setRightList, item.key)
  }, item.selected ? /*#__PURE__*/_react.default.createElement(_lucideReact.SquareCheckIcon, {
    className: "h-4 w-4 text-muted-foreground/50"
  }) : /*#__PURE__*/_react.default.createElement(_lucideReact.SquareIcon, {
    className: "h-4 w-4 text-muted-foreground/50"
  }), item.label))))));
}