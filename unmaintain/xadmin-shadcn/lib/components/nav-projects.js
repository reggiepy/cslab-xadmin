"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavProjects = NavProjects;
var _react = _interopRequireDefault(require("react"));
var _lucideReact = require("lucide-react");
var _dropdownMenu = require("./ui/dropdown-menu");
var _sidebar = require("./ui/sidebar");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function NavProjects(_ref) {
  var {
    projects
  } = _ref;
  var {
    isMobile
  } = (0, _sidebar.useSidebar)();
  return /*#__PURE__*/_react.default.createElement(_sidebar.SidebarGroup, {
    className: "group-data-[collapsible=icon]:hidden"
  }, /*#__PURE__*/_react.default.createElement(_sidebar.SidebarGroupLabel, null, "Projects"), /*#__PURE__*/_react.default.createElement(_sidebar.SidebarMenu, null, projects.map(item => /*#__PURE__*/_react.default.createElement(_sidebar.SidebarMenuItem, {
    key: item.name
  }, /*#__PURE__*/_react.default.createElement(_sidebar.SidebarMenuButton, {
    asChild: true
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: item.url
  }, /*#__PURE__*/_react.default.createElement(item.icon, null), /*#__PURE__*/_react.default.createElement("span", null, item.name))), /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenu, null, /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenuTrigger, {
    asChild: true
  }, /*#__PURE__*/_react.default.createElement(_sidebar.SidebarMenuAction, {
    showOnHover: true
  }, /*#__PURE__*/_react.default.createElement(_lucideReact.MoreHorizontal, null), /*#__PURE__*/_react.default.createElement("span", {
    className: "sr-only"
  }, "More"))), /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenuContent, {
    className: "w-48 rounded-lg",
    side: isMobile ? "bottom" : "right",
    align: isMobile ? "end" : "start"
  }, /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenuItem, null, /*#__PURE__*/_react.default.createElement(_lucideReact.Folder, {
    className: "text-muted-foreground"
  }), /*#__PURE__*/_react.default.createElement("span", null, "View Project")), /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenuItem, null, /*#__PURE__*/_react.default.createElement(_lucideReact.Forward, {
    className: "text-muted-foreground"
  }), /*#__PURE__*/_react.default.createElement("span", null, "Share Project")), /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenuSeparator, null), /*#__PURE__*/_react.default.createElement(_dropdownMenu.DropdownMenuItem, null, /*#__PURE__*/_react.default.createElement(_lucideReact.Trash2, {
    className: "text-muted-foreground"
  }), /*#__PURE__*/_react.default.createElement("span", null, "Delete Project")))))), /*#__PURE__*/_react.default.createElement(_sidebar.SidebarMenuItem, null, /*#__PURE__*/_react.default.createElement(_sidebar.SidebarMenuButton, {
    className: "text-sidebar-foreground/70"
  }, /*#__PURE__*/_react.default.createElement(_lucideReact.MoreHorizontal, {
    className: "text-sidebar-foreground/70"
  }), /*#__PURE__*/_react.default.createElement("span", null, "More")))));
}