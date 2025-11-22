"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;
Object.defineProperty(exports, "Icon", {
  enumerable: true,
  get: function get() {
    return _reactFontawesome.default;
  }
});
exports.default = exports.Page = exports.Main = exports.Loading = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactBootstrap = require("react-bootstrap");
var _xadmin = require("xadmin");
var _reactFontawesome = _interopRequireDefault(require("react-fontawesome"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Bread extends _react.default.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Breadcrumb, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Breadcrumb.Item, {
      href: "#"
    }, "Home"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Breadcrumb.Item, {
      active: true
    }, "Data"));
  }
}
class Footer extends _react.default.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      id: "footer"
    }, /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("footer", {
      className: "text-center"
    }, /*#__PURE__*/_react.default.createElement("p", null, "\xA9 ", /*#__PURE__*/_react.default.createElement("slot", null, (0, _xadmin.config)('site.copyright')))), /*#__PURE__*/_react.default.createElement(_xadmin.Block, {
      name: "footer",
      el: this
    }));
  }
}
class MainMenu extends _react.default.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Card, {
      body: true
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav, {
      variant: "pills",
      className: "flex-column"
    }, /*#__PURE__*/_react.default.createElement(_xadmin.Block, {
      name: "main.menu",
      el: this
    })));
  }
}
class Page extends _react.default.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Container, {
      className: 'px-0 ' + this.props.className,
      style: this.props.style,
      fluid: true
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Navbar, {
      key: "page-nav",
      bg: "light",
      className: "mb-3"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Navbar.Brand, null, this.props.title), this.props.nav), /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: "page-content"
    }, this.props.children));
  }
}
exports.Page = Page;
class TopNav extends _react.default.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Navbar, {
      bg: "dark",
      variant: "dark",
      sticky: "top",
      expand: "lg"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Navbar.Brand, {
      href: "#",
      onClick: () => _xadmin.app.go('/app/')
    }, this.props.site_title), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Navbar.Toggle, {
      "aria-controls": "main-navbar-nav"
    }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Navbar.Collapse, {
      id: "main-navbar-nav"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav, {
      className: "mr-auto"
    }, /*#__PURE__*/_react.default.createElement(_xadmin.Block, {
      name: "top.left",
      el: this
    })), /*#__PURE__*/_react.default.createElement(_xadmin.Block, {
      name: "top.center",
      el: this
    }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav, null, /*#__PURE__*/_react.default.createElement(_xadmin.Block, {
      name: "top.right",
      el: this
    }))));
  }
}
class Main extends _react.default.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_xadmin.Block, {
      name: "body",
      el: this
    }), /*#__PURE__*/_react.default.createElement(TopNav, {
      site_title: (0, _xadmin.config)('site.title', 'Admin')
    }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Container, {
      fluid: true,
      className: "mt-3"
    }, /*#__PURE__*/_react.default.createElement(_xadmin.Block, {
      name: "main",
      el: this
    }), this.props.children), /*#__PURE__*/_react.default.createElement(Footer, null));
  }
}
exports.Main = Main;
class App extends _react.default.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Row, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
      key: 0.1,
      sm: 3,
      lg: 2
    }, /*#__PURE__*/_react.default.createElement(MainMenu, null)), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
      key: 0.2,
      sm: 9,
      lg: 10
    }, this.props.children));
  }
}
exports.App = App;
class Loading extends _react.default.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Card, {
      body: true,
      className: "text-center"
    }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
      name: "spinner fa-spin fa-4x"
    }));
  }
}
exports.Loading = Loading;
class Dashboard extends _react.default.Component {
  render() {
    var {
      _t
    } = _xadmin.app.context;
    return /*#__PURE__*/_react.default.createElement(Page, {
      title: _t('Dashboard')
    }, /*#__PURE__*/_react.default.createElement("div", null, _t('Welcome, Have a nice day!')), (0, _xadmin.Block)('dashboard.main', this));
  }
}
var _default = exports.default = {
  '@': {
    path: '/',
    component: Main,
    breadcrumbName: '',
    indexRoute: {
      onEnter: (_, replace) => replace({
        pathname: '/app/'
      })
    }
  },
  '/': {
    path: 'app/',
    component: App,
    breadcrumbName: 'Home',
    indexRoute: {
      onEnter: (_, replace) => replace({
        pathname: '/app/dashboard'
      })
    }
  },
  '/app/': {
    path: 'dashboard',
    component: Dashboard
  }
};