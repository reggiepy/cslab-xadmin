"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModelListPage = exports.ModelFormPage = exports.ModelDetailPage = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactBootstrap = require("react-bootstrap");
var _reactFontawesome = _interopRequireDefault(require("react-fontawesome"));
var _xadmin = require("xadmin");
var _xadminUi = require("xadmin-ui");
var _xadminModel = require("xadmin-model");
var _Pagination = _interopRequireDefault(require("./Pagination"));
var _SubMenu = _interopRequireDefault(require("./SubMenu"));
var _ActionBar = _interopRequireDefault(require("./ActionBar"));
var _dec, _class, _dec2, _class2, _dec3, _class3;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var ModelListPage = exports.ModelListPage = (_dec = (0, _xadminModel.ModelWrap)('model.page.list'), _dec(_class = class ModelListPage extends _react.default.Component {
  renderNav() {
    var {
      title,
      canAdd,
      addItem,
      model
    } = this.props;
    var {
      _t
    } = _xadmin.app.context;
    return [/*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav, {
      key: "nav-left",
      className: "mr-auto"
    }, /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
      name: "model.list.nav"
    })), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav, {
      key: "nav-right"
    }, /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
      name: "model.list.navbtn"
    }), canAdd ? /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      variant: "primary",
      onClick: addItem
    }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
      name: "plus"
    }), " ", _t('Add {{object}}', {
      object: model.title
    })) : null)];
  }
  render() {
    var {
      icon,
      title,
      location,
      model
    } = this.props;
    var ItemsComponent = model.components && model.components.DataTable || (0, _xadminUi.C)('Model.DataTable');
    var query = location && location.query;
    var GridComponents = [/*#__PURE__*/_react.default.createElement("div", {
      key: "model-list-subnav",
      style: {
        display: 'flex',
        justifyContent: 'space-between'
      },
      className: "mb-3"
    }, /*#__PURE__*/_react.default.createElement(_Pagination.default, {
      size: "sm",
      className: "my-0"
    }), /*#__PURE__*/_react.default.createElement(_SubMenu.default, null)), /*#__PURE__*/_react.default.createElement(ItemsComponent, {
      key: "model-list-grid",
      query: query
    }), /*#__PURE__*/_react.default.createElement("div", {
      key: "model-list-subnav",
      style: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/_react.default.createElement(_ActionBar.default, {
      key: "model-list-action"
    }), /*#__PURE__*/_react.default.createElement(_Pagination.default, {
      key: "model-list-pagination"
    }))];
    return /*#__PURE__*/_react.default.createElement(_xadminUi.Page, {
      className: "xadmin-model-list-".concat(model.key),
      title: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
        name: icon
      }), " ", title),
      nav: this.renderNav()
    }, /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
      name: "model.list.submenu"
    }), /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
      name: "model.list.sidemenu"
    }, sideMenu => /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
      name: "model.list.sidepanel"
    }, sidePanel => sideMenu || sidePanel ? /*#__PURE__*/_react.default.createElement(_reactBootstrap.Row, null, sideMenu ? /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
      sm: sideMenu && sidePanel ? 1 : 2
    }, sideMenu) : null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
      sm: sideMenu && sidePanel ? 9 : 10
    }, GridComponents), sidePanel ? /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
      sm: sideMenu && sidePanel ? 1 : 2
    }, sidePanel) : null) : GridComponents)));
  }
}) || _class);
var ModelFormPage = exports.ModelFormPage = (_dec2 = (0, _xadminModel.ModelWrap)('model.page.form'), _dec2(_class2 = class ModelFormPage extends _react.default.Component {
  renderNav() {
    return [/*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav, {
      key: "nav-left",
      className: "mr-auto"
    }, /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
      name: "model.edit.nav"
    })), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav, {
      key: "nav-right"
    }, /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
      name: "model.edit.navbtn"
    }))];
  }
  render() {
    var {
      params,
      location: {
        query
      },
      title,
      model,
      onSuccess,
      componentClass
    } = this.props;
    var FormComponent = model.components && model.components.DataForm || (0, _xadminUi.C)('Model.DataForm');
    return /*#__PURE__*/_react.default.createElement(_xadminUi.Page, {
      title: title,
      className: "xadmin-model-form-".concat(model.key),
      nav: this.renderNav()
    }, /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
      name: "model.form.before"
    }), /*#__PURE__*/_react.default.createElement(FormComponent, {
      id: params && params.id,
      query: query,
      onSubmitSuccess: onSuccess
    }), /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
      name: "model.form.after"
    }));
  }
}) || _class2);
var ModelDetailPage = exports.ModelDetailPage = (_dec3 = (0, _xadminModel.ModelWrap)('model.page.detail'), _dec3(_class3 = class ModelDetailPage extends _react.default.Component {
  renderNav() {
    var {
      onClose,
      onEdit,
      canEdit
    } = this.props;
    var {
      _t
    } = _xadmin.app.context;
    return [/*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav, {
      key: "nav-left",
      className: "mr-auto"
    }, /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
      name: "model.detail.nav"
    })), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav, {
      key: "nav-right"
    }, /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
      name: "model.detail.navbtn"
    }), canEdit ? /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      onClick: onEdit,
      className: "mr-2"
    }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
      name: "pencil"
    }), " ", _t('Edit')) : null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      onClick: onClose,
      variant: "secondary"
    }, _t('Back')))];
  }
  render() {
    var {
      params,
      title,
      model,
      componentClass
    } = this.props;
    var DetailComponent = model.components && model.components.DataDetail || (0, _xadminUi.C)('Model.DataDetail');
    var {
      _t
    } = _xadmin.app.context;
    return /*#__PURE__*/_react.default.createElement(_xadminUi.Page, {
      title: title,
      className: "xadmin-model-detail-".concat(model.key),
      nav: this.renderNav()
    }, /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
      name: "model.detail.before"
    }), /*#__PURE__*/_react.default.createElement(DetailComponent, {
      id: params && params.id
    }), /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
      name: "model.detail.after"
    }));
  }
}) || _class3);