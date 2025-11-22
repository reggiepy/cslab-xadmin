"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _xadmin = _interopRequireDefault(require("xadmin"));
var _reactBootstrap = require("react-bootstrap");
var _reactFontawesome = _interopRequireDefault(require("react-fontawesome"));
var _xadminForm = require("xadmin-form");
var _xadminModel = require("xadmin-model");
var _Pagination = _interopRequireDefault(require("./Pagination"));
var _Items = require("./Items");
var _SubMenu = _interopRequireDefault(require("./SubMenu"));
var _ActionBar = _interopRequireDefault(require("./ActionBar"));
var _dec, _class, _dec2, _class2, _dec3, _class3;
var _excluded = ["parent", "model", "refFilter", "refData", "refField", "modelProps", "children", "header"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class ChildrenModelBtn extends _react.default.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      show: false
    });
    _defineProperty(this, "handleCancel", () => {
      this.setState({
        show: false
      });
      this.props.onClose && this.props.onClose();
    });
  }
  render() {
    var _this$props = this.props,
      {
        parent,
        model,
        refFilter,
        refData,
        refField,
        modelProps,
        children,
        header
      } = _this$props,
      props = _objectWithoutProperties(_this$props, _excluded);
    var {
      _t
    } = _xadmin.default.context;
    var cmodel = _lodash.default.isString(model) ? _xadmin.default.get('models')[model] : model;
    var schema = _objectSpread(_objectSpread({}, cmodel), {}, {
      parent,
      item_actions: [...(cmodel.itemActions || []), item => /*#__PURE__*/_react.default.createElement(EditChildrenModelBtn, {
        id: item.id
      }, _t('Edit'))],
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
    return [/*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, _extends({
      size: "sm",
      key: 0,
      className: "model-list-action"
    }, props, {
      onClick: () => this.setState({
        show: true
      })
    }), children), this.state.show ? /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal, {
      key: 1,
      show: this.state.show,
      dialogClassName: "mw-100 mx-5",
      onHide: this.handleCancel
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Header, {
      closeButton: true
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Title, null, header || children)), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Body, null, /*#__PURE__*/_react.default.createElement(_xadminModel.Model, {
      schema: schema,
      modelKey: "".concat(_lodash.default.isString(model) ? model : model.name, "_").concat(parent.id),
      initialValues: initialValues
    }, /*#__PURE__*/_react.default.createElement(ChildrenModelPage, {
      parent: parent,
      refData: refData || {
        [refField]: parent.id
      },
      refField: refField
    })))) : null];
  }
}
class ChildrenModelPage extends _react.default.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      key: "model-list-subnav",
      style: {
        display: 'flex',
        justifyContent: 'space-between'
      },
      className: "mb-3"
    }, /*#__PURE__*/_react.default.createElement(_Pagination.default, {
      size: "sm",
      className: "my-0"
    }), /*#__PURE__*/_react.default.createElement(_SubMenu.default, null, /*#__PURE__*/_react.default.createElement(AddChildrenModelBtn, this.props))), ",", /*#__PURE__*/_react.default.createElement(_Items.Grid, {
      key: "model-list-grid"
    }), ",", /*#__PURE__*/_react.default.createElement(_ActionBar.default, {
      key: "model-list-action"
    }), ",", /*#__PURE__*/_react.default.createElement(_Pagination.default, {
      key: "model-list-pagination"
    }));
  }
}
var AddChildrenModelBtn = (_dec = (0, _xadminModel.ModelWrap)('model.page.list', {
  method: {
    onSuccess: _ref => {
      var {
        dispatch,
        model
      } = _ref;
      return () => dispatch({
        model,
        type: 'GET_ITEMS'
      });
    }
  }
}), _dec(_class = class AddChildrenModelBtn extends _react.default.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      show: false
    });
  }
  render() {
    var {
      canAdd,
      model,
      onSuccess,
      refData
    } = this.props;
    var {
      _t
    } = _xadmin.default.context;
    return [/*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      key: 0,
      size: "sm",
      className: "ml-2",
      style: {
        float: 'right'
      },
      onClick: () => this.setState({
        show: true
      })
    }, _t('Add {{object}}', {
      object: model.title
    })), /*#__PURE__*/_react.default.createElement(ChildrenFormModel, {
      key: 1,
      onSuccess: onSuccess,
      refData: refData,
      show: this.state.show,
      onClose: () => this.setState({
        show: false
      })
    })];
  }
}) || _class);
var EditChildrenModelBtn = (_dec2 = (0, _xadminModel.ModelWrap)('model.list.row', {
  compute: (_ref2, _ref3) => {
    var {
      model
    } = _ref2;
    var {
      item
    } = _ref3;
    return {
      canChildEdit: !!model.permission && !!model.permission.childEdit && item && item._canEdit !== false
    };
  },
  method: {
    onSuccess: _ref4 => {
      var {
        dispatch,
        model
      } = _ref4;
      return () => dispatch({
        model,
        type: 'GET_ITEMS'
      });
    }
  }
}), _dec2(_class2 = class EditChildrenModelBtn extends _react.default.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      show: false
    });
  }
  render() {
    var {
      canChildEdit,
      model,
      onSuccess,
      id,
      refData
    } = this.props;
    var {
      _t
    } = _xadmin.default.context;
    return canChildEdit && [/*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      key: 0,
      size: "sm",
      className: "model-list-action",
      onClick: () => this.setState({
        show: true
      })
    }, _t('Edit')), /*#__PURE__*/_react.default.createElement(ChildrenFormModel, {
      key: 1,
      onSuccess: onSuccess,
      id: id,
      refData: refData,
      show: this.state.show,
      onClose: () => {
        this.setState({
          show: false
        });
      }
    })];
  }
}) || _class2);
var ChildrenFormModel = (_dec3 = (0, _xadminModel.ModelWrap)('model.item'), _dec3(_class3 = class ChildrenFormModel extends _react.default.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "onSubmitSuccess", item => {
      this.props.onClose();
      this.props.onSuccess(item);
    });
    _defineProperty(this, "onSaveItem", values => {
      this.props.saveItem(_objectSpread(_objectSpread({}, values), this.props.refData));
    });
  }
  render() {
    var {
      show,
      data,
      loading,
      model,
      title,
      onClose,
      modalProps
    } = this.props;
    var {
      _t
    } = _xadmin.default.context;
    var FormLayout = props => {
      var {
        children,
        invalid,
        handleSubmit,
        submitting,
        onClose
      } = props;
      var icon = submitting ? 'spinner fa-spin' : 'floppy-o';
      return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal, _extends({}, modalProps, {
        show: show,
        size: "lg",
        className: "xadmin-modal-form",
        onHide: onClose
      }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Header, {
        closeButton: true
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Title, null, title)), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Body, null, /*#__PURE__*/_react.default.createElement("form", {
        className: "form-horizontal"
      }, children)), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Footer, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        onClick: onClose,
        variant: "light"
      }, _t('Close')), invalid ? /*#__PURE__*/_react.default.createElement(_reactBootstrap.OverlayTrigger, {
        placement: "top",
        overlay: /*#__PURE__*/_react.default.createElement(_reactBootstrap.Tooltip, null, _t('Please be sure to complete all field.'))
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        type: "submit",
        disabled: invalid || submitting,
        onClick: handleSubmit
      }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
        name: "ban"
      }), " ", _t('Save'))) : /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        type: "submit",
        disabled: invalid || submitting,
        onClick: handleSubmit
      }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
        name: icon
      }), " ", _t('Save'))));
    };
    return show && !loading ? /*#__PURE__*/_react.default.createElement(_xadminForm.SchemaForm, {
      formKey: "model.modalform.".concat(model.key),
      schema: model,
      initialValues: data,
      onSubmit: this.onSaveItem,
      onClose: onClose,
      component: FormLayout,
      onSubmitSuccess: this.onSubmitSuccess
    }) : null;
  }
}) || _class3);
var _default = exports.default = ChildrenModelBtn;