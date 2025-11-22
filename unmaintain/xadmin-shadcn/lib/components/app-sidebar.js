"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppSidebar = AppSidebar;
var React = _interopRequireWildcard(require("react"));
var _xadmin = require("xadmin");
var _lucideReact = require("lucide-react");
var _navMain = require("./nav-main");
var _navProjects = require("./nav-projects");
var _navUser = require("./nav-user");
var _sidebar = require("./ui/sidebar");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// This is sample data.
var data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg"
  },
  teams: [{
    name: "Acme Inc",
    logo: _lucideReact.GalleryVerticalEnd,
    plan: "Enterprise"
  }, {
    name: "Acme Corp.",
    logo: _lucideReact.AudioWaveform,
    plan: "Startup"
  }, {
    name: "Evil Corp.",
    logo: _lucideReact.Command,
    plan: "Free"
  }],
  navMain: [{
    title: "Playground",
    url: "#",
    icon: _lucideReact.SquareTerminal,
    isActive: true,
    items: [{
      title: "History",
      url: "#"
    }, {
      title: "Starred",
      url: "#"
    }, {
      title: "Settings",
      url: "#"
    }]
  }, {
    title: "Models",
    url: "#",
    icon: _lucideReact.Bot,
    items: [{
      title: "Genesis",
      url: "#"
    }, {
      title: "Explorer",
      url: "#"
    }, {
      title: "Quantum",
      url: "#"
    }]
  }, {
    title: "Documentation",
    url: "#",
    icon: _lucideReact.BookOpen,
    items: [{
      title: "Introduction",
      url: "#"
    }, {
      title: "Get Started",
      url: "#"
    }, {
      title: "Tutorials",
      url: "#"
    }, {
      title: "Changelog",
      url: "#"
    }]
  }, {
    title: "Settings",
    url: "#",
    icon: _lucideReact.Settings2,
    items: [{
      title: "General",
      url: "#"
    }, {
      title: "Team",
      url: "#"
    }, {
      title: "Billing",
      url: "#"
    }, {
      title: "Limits",
      url: "#"
    }]
  }],
  projects: [{
    name: "Design Engineering",
    url: "#",
    icon: _lucideReact.Frame
  }, {
    name: "Sales & Marketing",
    url: "#",
    icon: _lucideReact.PieChart
  }, {
    name: "Travel",
    url: "#",
    icon: _lucideReact.Map
  }]
};
function AppSidebar(_ref) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return /*#__PURE__*/React.createElement(_sidebar.Sidebar, _extends({
    collapsible: "icon"
  }, props), /*#__PURE__*/React.createElement(_sidebar.SidebarHeader, null, /*#__PURE__*/React.createElement(_sidebar.SidebarMenuButton, {
    size: "lg",
    className: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
  }, (0, _xadmin.config)('site.logo')), /*#__PURE__*/React.createElement("div", {
    className: "grid flex-1 text-left text-sm leading-tight"
  }, /*#__PURE__*/React.createElement("span", {
    className: "truncate font-semibold"
  }, (0, _xadmin.config)('site.title', 'Admin')), /*#__PURE__*/React.createElement("span", {
    className: "truncate text-xs"
  }, (0, _xadmin.config)('site.solgan', 'xadmin site'))))), /*#__PURE__*/React.createElement(_sidebar.SidebarContent, null, /*#__PURE__*/React.createElement(_xadmin.Block, {
    name: "main.menu"
  }, items => /*#__PURE__*/React.createElement(_navMain.NavMain, {
    items: data.navMain
  })), /*#__PURE__*/React.createElement(_navProjects.NavProjects, {
    projects: data.projects
  })), /*#__PURE__*/React.createElement(_sidebar.SidebarFooter, null, /*#__PURE__*/React.createElement(_navUser.NavUser, {
    user: data.user
  })), /*#__PURE__*/React.createElement(_sidebar.SidebarRail, null));
}