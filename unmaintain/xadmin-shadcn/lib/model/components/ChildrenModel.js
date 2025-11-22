"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _xadmin = _interopRequireWildcard(require("xadmin"));
var _xadminI18n = require("xadmin-i18n");
var _antd = require("antd");
var _xadminForm = require("xadmin-form");
var _xadminModel = require("xadmin-model");
var _xadminUi = require("xadmin-ui");
var _excluded = ["parent", "model", "refFilter", "refData", "refField", "modelProps", "children", "header", "value", "onClose", "refreshTimeout"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var ChildrenModel = props => {
  var [show, setShow] = _react.default.useState(false);
  var {
      parent,
      model,
      refFilter,
      refData,
      refField,
      modelProps,
      children,
      header,
      value,
      onClose,
      refreshTimeout
    } = props,
    extProps = _objectWithoutProperties(props, _excluded);
  var handleCancel = () => {
    setShow(false);
    onClose && onClose();
  };
  var cmodel = _lodash.default.isString(model) ? _xadmin.default.get('models')[model] : model;
  var schema = _objectSpread(_objectSpread({}, cmodel), {}, {
    parent,
    itemActions: [...(cmodel.itemActions || []), item => /*#__PURE__*/_react.default.createElement(EditChildrenModelBtn, {
      id: item.id,
      refData: refData,
      refreshTimeout: refreshTimeout
    }, (0, _xadminI18n._t)('Edit'))],
    permission: _objectSpread(_objectSpread({}, cmodel.permission), {}, {
      edit: false,
      childEdit: cmodel.permission && cmodel.permission.edit
    })
  }, modelProps);
  var initialValues = {
    wheres: {
      filters: refFilter || {
        [refField]: parent.id
      }
    }
  };
  var action = children && !_lodash.default.isString(children) && /*#__PURE__*/_react.default.isValidElement(children) ? /*#__PURE__*/_react.default.cloneElement(children, {
    onClick: () => setShow(true)
  }) : /*#__PURE__*/_react.default.createElement(_antd.Button, _extends({
    size: "small",
    key: "child-model-action",
    className: "model-list-action"
  }, extProps, {
    onClick: () => setShow(true)
  }), children || cmodel.title || cmodel.name);
  var ItemsComponent = cmodel.components && cmodel.components.DataList || (0, _xadminUi.C)('Model.DataTable');
  return [action, show ? /*#__PURE__*/_react.default.createElement(_xadminModel.Model, {
    schema: schema,
    modelKey: "".concat(_lodash.default.isString(model) ? model : model.name, "_").concat(parent.id),
    initialValues: initialValues
  }, /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    key: 1,
    visible: show,
    title: header || cmodel.title || cmodel.name,
    width: "80%",
    onCancel: handleCancel,
    onOk: handleCancel
  }, /*#__PURE__*/_react.default.createElement("div", {
    key: "model-list-subnav",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '.5rem'
    }
  }, /*#__PURE__*/_react.default.createElement(_xadminUi.C, {
    is: "Model.Pagination"
  }), /*#__PURE__*/_react.default.createElement(_xadminUi.C, {
    is: "Model.ListSubMenu"
  }, /*#__PURE__*/_react.default.createElement(AddChildrenModelBtn, props))), /*#__PURE__*/_react.default.createElement(ItemsComponent, {
    key: "model-list-grid"
  }), /*#__PURE__*/_react.default.createElement("div", {
    key: "model-list-downnav",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '.5rem'
    }
  }, /*#__PURE__*/_react.default.createElement(_xadminUi.C, {
    is: "Model.ActionBar"
  }), /*#__PURE__*/_react.default.createElement(_xadminUi.C, {
    is: "Model.Pagination"
  })))) : null];
};
var AddChildrenModelBtn = props => {
  var [show, setShow] = _react.default.useState(false);
  var {
    model
  } = (0, _xadmin.use)('model');
  var {
    getItems
  } = (0, _xadmin.use)('model.getItems');
  var {
    canAdd
  } = (0, _xadmin.use)('model.permission');
  var {
    refData,
    refreshTimeout
  } = props;
  var onSuccess = () => {
    if (refreshTimeout) {
      setTimeout(getItems, refreshTimeout);
    } else {
      getItems();
    }
  };
  return canAdd ? [/*#__PURE__*/_react.default.createElement(_antd.Button, {
    key: 0,
    style: {
      marginLeft: '.5rem'
    },
    onClick: () => setShow(true)
  }, (0, _xadminI18n._t)('Add {{object}}', {
    object: model.title
  })), /*#__PURE__*/_react.default.createElement(ChildrenFormModel, {
    key: 1,
    onSuccess: onSuccess,
    refData: refData,
    show: show,
    onClose: () => setShow(false)
  })] : null;
};
var EditChildrenModelBtn = props => {
  var [show, setShow] = _react.default.useState(false);
  var {
    model
  } = (0, _xadmin.use)('model');
  var {
    getItems
  } = (0, _xadmin.use)('model.getItems');
  var {
    id,
    refData,
    refreshTimeout
  } = props;
  var canChildEdit = !!model.permission && !!model.permission.childEdit;
  var onSuccess = () => {
    if (refreshTimeout) {
      setTimeout(getItems, refreshTimeout);
    } else {
      getItems();
    }
  };
  return canChildEdit && [/*#__PURE__*/_react.default.createElement(_antd.Button, {
    key: 0,
    size: "sm",
    className: "model-list-action",
    onClick: () => setShow(true)
  }, (0, _xadminI18n._t)('Edit')), show ? /*#__PURE__*/_react.default.createElement(ChildrenFormModel, {
    key: 1,
    onSuccess: onSuccess,
    id: id,
    refData: refData,
    show: show,
    onClose: () => {
      setShow(false);
    }
  }) : null];
};
var ChildrenFormModel = props => {
  var {
    show,
    title,
    onClose,
    modalProps,
    onSuccess,
    refData
  } = props;
  var {
    model
  } = (0, _xadmin.use)('model');
  var {
    data,
    loading,
    saveItem
  } = (0, _xadmin.use)('model.item', props);
  var onSubmitSuccess = item => {
    onClose();
    onSuccess(item);
  };
  var onSaveItem = values => {
    saveItem(_objectSpread(_objectSpread({}, values), refData));
  };
  var FormLayout = props => {
    var {
      children,
      invalid,
      handleSubmit,
      submitting
    } = props;
    return /*#__PURE__*/_react.default.createElement(_antd.Modal, _extends({}, modalProps, {
      visible: show,
      width: "70%",
      title: title,
      className: "xadmin-modal-form",
      onCancel: onClose,
      onOk: handleSubmit,
      okButtonDisabled: invalid || submitting,
      okText: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_xadminUi.Icon, {
        name: "ban"
      }), " ", (0, _xadminI18n._t)('Save')),
      okButtonProps: {
        loading: submitting
      }
    }), /*#__PURE__*/_react.default.createElement(_antd.Form, null, children));
  };
  return show && !loading ? /*#__PURE__*/_react.default.createElement(_xadminForm.SchemaForm, {
    formKey: "model.modalform.".concat(model.key),
    schema: model,
    initialValues: _objectSpread(_objectSpread({}, data), refData),
    onSubmit: onSaveItem,
    onClose: onClose,
    component: FormLayout,
    onSubmitSuccess: onSubmitSuccess
  }) : null;
};
var _default = exports.default = ChildrenModel;