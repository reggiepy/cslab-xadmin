"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModelListPage = exports.ModelFormPage = exports.ModelDetailPage = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _xadmin = require("xadmin");
var _xadminI18n = require("xadmin-i18n");
var _xadminModel = require("xadmin-model");
var _xadminUi = require("xadmin-ui");
var _button = require("../../components/ui/button");
var _lucideReact = require("lucide-react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var DefaultAddButton = _ref => {
  var {
    onAdd,
    children
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_button.Button, {
    onClick: onAdd
  }, children);
};
var ModelListPage = () => {
  var {
    model
  } = (0, _xadmin.use)('model');
  var {
    canAdd
  } = (0, _xadmin.use)('model.permission');
  var {
    onAdd
  } = (0, _xadmin.use)('model.event');
  var query = (0, _xadmin.use)('searchParams');
  var ItemsComponent = model.components && model.components.DataList || (0, _xadminUi.C)('Model.DataTable');
  var icon = model.icon || model.name;
  if (_lodash.default.isString(icon)) {
    icon = /*#__PURE__*/_react.default.createElement(_xadminUi.Icon, {
      name: icon,
      className: "inline"
    });
  }
  var title = model.title;
  var renderActions = () => {
    var AddButton = model.components && model.components.AddButton || (0, _xadminUi.C)('Model.AddButton') || DefaultAddButton;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
      name: "model.list.navbtn"
    }), canAdd ? /*#__PURE__*/_react.default.createElement(AddButton, {
      onAdd: onAdd
    }, /*#__PURE__*/_react.default.createElement(_lucideReact.PlusIcon, null), " ", (0, _xadminI18n._t)('Add {{object}}', {
      object: model.title
    })) : null);
  };
  var GridComponents = [/*#__PURE__*/_react.default.createElement("div", {
    key: "model-list-subnav",
    className: "flex justify-between mb-2"
  }, /*#__PURE__*/_react.default.createElement(_xadminUi.C, {
    is: "Model.Pagination"
  }), /*#__PURE__*/_react.default.createElement(_xadminUi.C, {
    is: "Model.ListSubMenu"
  })), /*#__PURE__*/_react.default.createElement(ItemsComponent, {
    key: "model-list-grid",
    query: query
  }), /*#__PURE__*/_react.default.createElement("div", {
    key: "model-list-downnav",
    className: "flex justify-between mt-2"
  }, /*#__PURE__*/_react.default.createElement(_xadminUi.C, {
    is: "Model.ActionBar"
  }), /*#__PURE__*/_react.default.createElement(_xadminUi.C, {
    is: "Model.Pagination"
  }))];
  return /*#__PURE__*/_react.default.createElement(_xadminUi.Page, {
    className: "xadmin-model-list-".concat(model.key),
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "flex items-center gap-2"
    }, icon, " ", title),
    subTitle: /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
      name: "model.list.nav"
    }),
    actions: renderActions()
  }, /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
    name: "model.list.submenu"
  }), /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
    name: "model.list.sidemenu"
  }, sideMenu => /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
    name: "model.list.sidepanel"
  }, sidePanel => sideMenu || sidePanel ? /*#__PURE__*/_react.default.createElement("div", {
    className: "flex"
  }, sideMenu ? /*#__PURE__*/_react.default.createElement("div", {
    className: "w-1/4 mr-2"
  }, sideMenu) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex-1"
  }, GridComponents), sidePanel ? /*#__PURE__*/_react.default.createElement("div", {
    className: "w-1/4 ml-2"
  }, sidePanel) : null) : GridComponents)));
};
exports.ModelListPage = ModelListPage;
var ModelFormPage = () => {
  var {
    model
  } = (0, _xadmin.use)('model');
  var {
    id
  } = (0, _xadmin.use)('params');
  var {
    onSaved
  } = (0, _xadmin.use)('model.event');
  var {
    data,
    loading
  } = (0, _xadmin.use)('model.item', {
    id
  });
  var query = (0, _xadmin.use)('query');
  var title = id ? (0, _xadminI18n._t)('Edit {{title}}', {
    title: model.title + ' ' + (data && data[model.displayField || 'name'] || '')
  }) : (0, _xadminI18n._t)('Create {{title}}', {
    title: model.title
  });
  var FormComponent = model.components && model.components.DataForm || (0, _xadminUi.C)('Model.DataForm');
  return /*#__PURE__*/_react.default.createElement(_xadminUi.Page, {
    className: "xadmin-model-form-".concat(model.key),
    title: title,
    onBack: () => history.back(),
    subTitle: /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
      name: "model.edit.nav"
    }),
    actions: /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
      name: "model.edit.navbtn"
    })
  }, /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
    name: "model.form.before"
  }), loading ? /*#__PURE__*/_react.default.createElement(_xadminUi.Loading, null) : /*#__PURE__*/_react.default.createElement(FormComponent, {
    id: id,
    item: data,
    query: query,
    onSubmitSuccess: onSaved
  }), /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
    name: "model.form.after"
  }));
};
exports.ModelFormPage = ModelFormPage;
var ModelDetailPage = () => {
  var {
    model
  } = (0, _xadmin.use)('model');
  var {
    id
  } = (0, _xadmin.use)('params');
  var renderActions = () => {
    var {
      canEdit
    } = (0, _xadmin.use)('model.permission');
    var {
      onEdit
    } = (0, _xadmin.use)('model.event');
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
      name: "model.detail.navbtn"
    }), canEdit ? /*#__PURE__*/_react.default.createElement(_button.Button, {
      onClick: () => onEdit(id)
    }, /*#__PURE__*/_react.default.createElement(_lucideReact.PencilIcon, null), " ", (0, _xadminI18n._t)('Edit')) : null);
  };
  var DetailComponent = model.components && model.components.DataDetail || (0, _xadminUi.C)('Model.DataDetail');
  return /*#__PURE__*/_react.default.createElement(_xadminUi.Page, {
    className: "xadmin-model-detail-".concat(model.key),
    title: model.title,
    onBack: () => history.back(),
    subTitle: /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
      name: "model.detail.nav"
    }),
    actions: renderActions()
  }, /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
    name: "model.detail.before"
  }), /*#__PURE__*/_react.default.createElement(DetailComponent, {
    id: id
  }), /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
    name: "model.detail.after"
  }));
};
exports.ModelDetailPage = ModelDetailPage;