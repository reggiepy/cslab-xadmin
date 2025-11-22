"use strict";
"use client";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavMain = NavMain;
var _react = _interopRequireDefault(require("react"));
var _lucideReact = require("lucide-react");
var _collapsible = require("./ui/collapsible");
var _sidebar = require("./ui/sidebar");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function NavMain(_ref) {
  var {
    items
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_sidebar.SidebarGroup, null, /*#__PURE__*/_react.default.createElement(_sidebar.SidebarGroupLabel, null, "Platform"), /*#__PURE__*/_react.default.createElement(_sidebar.SidebarMenu, null, items.map(item => {
    var _item$items;
    return /*#__PURE__*/_react.default.createElement(_collapsible.Collapsible, {
      key: item.title,
      asChild: true,
      defaultOpen: item.isActive,
      className: "group/collapsible"
    }, /*#__PURE__*/_react.default.createElement(_sidebar.SidebarMenuItem, null, /*#__PURE__*/_react.default.createElement(_collapsible.CollapsibleTrigger, {
      asChild: true
    }, /*#__PURE__*/_react.default.createElement(_sidebar.SidebarMenuButton, {
      tooltip: item.title
    }, item.icon && /*#__PURE__*/_react.default.createElement(item.icon, null), /*#__PURE__*/_react.default.createElement("span", null, item.title), /*#__PURE__*/_react.default.createElement(_lucideReact.ChevronRight, {
      className: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
    }))), /*#__PURE__*/_react.default.createElement(_collapsible.CollapsibleContent, null, /*#__PURE__*/_react.default.createElement(_sidebar.SidebarMenuSub, null, (_item$items = item.items) === null || _item$items === void 0 ? void 0 : _item$items.map(subItem => /*#__PURE__*/_react.default.createElement(_sidebar.SidebarMenuSubItem, {
      key: subItem.title
    }, /*#__PURE__*/_react.default.createElement(_sidebar.SidebarMenuSubButton, {
      asChild: true
    }, /*#__PURE__*/_react.default.createElement("a", {
      href: subItem.url
    }, /*#__PURE__*/_react.default.createElement("span", null, subItem.title)))))))));
  })));
}