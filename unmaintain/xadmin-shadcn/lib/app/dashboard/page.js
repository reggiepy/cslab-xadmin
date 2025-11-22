"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page;
var _react = _interopRequireDefault(require("react"));
var _appSidebar = require("../../components/app-sidebar");
var _breadcrumb = require("../../components/ui/breadcrumb");
var _separator = require("../../components/ui/separator");
var _sidebar = require("../../components/ui/sidebar");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Page() {
  return /*#__PURE__*/_react.default.createElement(_sidebar.SidebarProvider, null, /*#__PURE__*/_react.default.createElement(_appSidebar.AppSidebar, null), /*#__PURE__*/_react.default.createElement(_sidebar.SidebarInset, null, /*#__PURE__*/_react.default.createElement("header", {
    className: "flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center gap-2 px-4"
  }, /*#__PURE__*/_react.default.createElement(_sidebar.SidebarTrigger, {
    className: "-ml-1"
  }), /*#__PURE__*/_react.default.createElement(_separator.Separator, {
    orientation: "vertical",
    className: "mr-2 h-4"
  }), /*#__PURE__*/_react.default.createElement(_breadcrumb.Breadcrumb, null, /*#__PURE__*/_react.default.createElement(_breadcrumb.BreadcrumbList, null, /*#__PURE__*/_react.default.createElement(_breadcrumb.BreadcrumbItem, {
    className: "hidden md:block"
  }, /*#__PURE__*/_react.default.createElement(_breadcrumb.BreadcrumbLink, {
    href: "#"
  }, "Building Your Application")), /*#__PURE__*/_react.default.createElement(_breadcrumb.BreadcrumbSeparator, {
    className: "hidden md:block"
  }), /*#__PURE__*/_react.default.createElement(_breadcrumb.BreadcrumbItem, null, /*#__PURE__*/_react.default.createElement(_breadcrumb.BreadcrumbPage, null, "Data Fetching")))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-1 flex-col gap-4 p-4 pt-0"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "grid auto-rows-min gap-4 md:grid-cols-3"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "aspect-video rounded-xl bg-muted/50"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "aspect-video rounded-xl bg-muted/50"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "aspect-video rounded-xl bg-muted/50"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"
  }))));
}