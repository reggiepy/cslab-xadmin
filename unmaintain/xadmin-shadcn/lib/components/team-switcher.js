"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeamSwitcher = TeamSwitcher;
var React = _interopRequireWildcard(require("react"));
var _lucideReact = require("lucide-react");
var _dropdownMenu = require("./ui/dropdown-menu");
var _sidebar = require("./ui/sidebar");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function TeamSwitcher(_ref) {
  var {
    teams
  } = _ref;
  var {
    isMobile
  } = (0, _sidebar.useSidebar)();
  var [activeTeam, setActiveTeam] = React.useState(teams[0]);
  return /*#__PURE__*/React.createElement(_sidebar.SidebarMenu, null, /*#__PURE__*/React.createElement(_sidebar.SidebarMenuItem, null, /*#__PURE__*/React.createElement(_dropdownMenu.DropdownMenu, null, /*#__PURE__*/React.createElement(_dropdownMenu.DropdownMenuTrigger, {
    asChild: true
  }, /*#__PURE__*/React.createElement(_sidebar.SidebarMenuButton, {
    size: "lg",
    className: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
  }, /*#__PURE__*/React.createElement(activeTeam.logo, {
    className: "size-4"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid flex-1 text-left text-sm leading-tight"
  }, /*#__PURE__*/React.createElement("span", {
    className: "truncate font-semibold"
  }, activeTeam.name), /*#__PURE__*/React.createElement("span", {
    className: "truncate text-xs"
  }, activeTeam.plan)), /*#__PURE__*/React.createElement(_lucideReact.ChevronsUpDown, {
    className: "ml-auto"
  }))), /*#__PURE__*/React.createElement(_dropdownMenu.DropdownMenuContent, {
    className: "w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg",
    align: "start",
    side: isMobile ? "bottom" : "right",
    sideOffset: 4
  }, /*#__PURE__*/React.createElement(_dropdownMenu.DropdownMenuLabel, {
    className: "text-xs text-muted-foreground"
  }, "Teams"), teams.map((team, index) => /*#__PURE__*/React.createElement(_dropdownMenu.DropdownMenuItem, {
    key: team.name,
    onClick: () => setActiveTeam(team),
    className: "gap-2 p-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex size-6 items-center justify-center rounded-sm border"
  }, /*#__PURE__*/React.createElement(team.logo, {
    className: "size-4 shrink-0"
  })), team.name, /*#__PURE__*/React.createElement(_dropdownMenu.DropdownMenuShortcut, null, "\u2318", index + 1))), /*#__PURE__*/React.createElement(_dropdownMenu.DropdownMenuSeparator, null), /*#__PURE__*/React.createElement(_dropdownMenu.DropdownMenuItem, {
    className: "gap-2 p-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex size-6 items-center justify-center rounded-md border bg-background"
  }, /*#__PURE__*/React.createElement(_lucideReact.Plus, {
    className: "size-4"
  })), /*#__PURE__*/React.createElement("div", {
    className: "font-medium text-muted-foreground"
  }, "Add team"))))));
}