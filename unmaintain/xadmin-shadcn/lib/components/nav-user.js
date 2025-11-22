"use strict";
"use client";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavUser = NavUser;
var _react = _interopRequireDefault(require("react"));
var _lucideReact = require("lucide-react");
var _avatar = require("./ui/avatar");
var _dropdownMenu = require("./ui/dropdown-menu");
var _sidebar = require("./ui/sidebar");
var _themeSwitch = require("./theme-switch");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function NavUser(_ref) {
  var {
    user
  } = _ref;
  var {
    isMobile
  } = (0, _sidebar.useSidebar)();
  return /*#__PURE__*/_react.default.createElement(_sidebar.SidebarMenu, null, /*#__PURE__*/_react.default.createElement(_sidebar.SidebarMenuItem, null, /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenu, null, /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenuTrigger, {
    asChild: true
  }, /*#__PURE__*/_react.default.createElement(_sidebar.SidebarMenuButton, {
    size: "lg",
    className: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
  }, /*#__PURE__*/_react.default.createElement(_avatar.Avatar, {
    className: "h-8 w-8 rounded-lg"
  }, /*#__PURE__*/_react.default.createElement(_avatar.AvatarImage, {
    src: user.avatar,
    alt: user.name
  }), /*#__PURE__*/_react.default.createElement(_avatar.AvatarFallback, {
    className: "rounded-lg"
  }, "CN")), /*#__PURE__*/_react.default.createElement("div", {
    className: "grid flex-1 text-left text-sm leading-tight"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "truncate font-semibold"
  }, user.name), /*#__PURE__*/_react.default.createElement("span", {
    className: "truncate text-xs"
  }, user.email)), /*#__PURE__*/_react.default.createElement(_lucideReact.ChevronsUpDown, {
    className: "ml-auto size-4"
  }))), /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenuContent, {
    className: "w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg",
    side: isMobile ? "bottom" : "right",
    align: "end",
    sideOffset: 4
  }, /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenuLabel, {
    className: "p-0 font-normal"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center gap-2 px-1 py-1.5 text-left text-sm"
  }, /*#__PURE__*/_react.default.createElement(_avatar.Avatar, {
    className: "h-8 w-8 rounded-lg"
  }, /*#__PURE__*/_react.default.createElement(_avatar.AvatarImage, {
    src: user.avatar,
    alt: user.name
  }), /*#__PURE__*/_react.default.createElement(_avatar.AvatarFallback, {
    className: "rounded-lg"
  }, "CN")), /*#__PURE__*/_react.default.createElement("div", {
    className: "grid flex-1 text-left text-sm leading-tight"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "truncate font-semibold"
  }, user.name), /*#__PURE__*/_react.default.createElement("span", {
    className: "truncate text-xs"
  }, user.email)), /*#__PURE__*/_react.default.createElement(_themeSwitch.ThemeSwitch, null))), /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenuSeparator, null), /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenuGroup, null, /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenuItem, null, /*#__PURE__*/_react.default.createElement(_lucideReact.Sparkles, null), "Upgrade to Pro")), /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenuSeparator, null), /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenuGroup, null, /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenuItem, null, /*#__PURE__*/_react.default.createElement(_lucideReact.BadgeCheck, null), "Account"), /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenuItem, null, /*#__PURE__*/_react.default.createElement(_lucideReact.CreditCard, null), "Billing"), /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenuItem, null, /*#__PURE__*/_react.default.createElement(_lucideReact.Bell, null), "Notifications")), /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenuSeparator, null), /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenuItem, null, /*#__PURE__*/_react.default.createElement(_lucideReact.LogOut, null), "Log out")))));
}