"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRow = exports.Item = exports.Header = exports.GridRow = exports.DataTable = exports.DataList = exports.BaseRow = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _lodash = _interopRequireDefault(require("lodash"));
var _reactFontawesome = _interopRequireDefault(require("react-fontawesome"));
var _xadmin = require("xadmin");
var _xadminForm = require("xadmin-form");
var _xadminUi = require("xadmin-ui");
var _reactBootstrap = require("react-bootstrap");
var _xadminModel = require("xadmin-model");
require("./Items.css");
var _dec, _class, _dec2, _class2, _dec3, _class3, _dec4, _class4, _dec5, _class5;
var _excluded = ["componentClass", "actions"],
  _excluded2 = ["children"],
  _excluded3 = ["children"],
  _excluded4 = ["children"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
class BaseRow extends _react.default.Component {
  actions() {
    var {
      canEdit,
      canDelete
    } = this.props;
    var {
      _t
    } = _xadmin.app.context;
    var actions = (this.props.actions || []).map(Action => /*#__PURE__*/_react.default.createElement(Action, this.props));
    if (canEdit) {
      actions.push(/*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        key: "action-edit",
        size: "sm",
        className: "model-list-action",
        style: {
          height: '1.5rem',
          lineHeight: 1
        },
        onClick: this.props.editItem
      }, _t('Edit')));
    }
    if (canDelete) {
      actions.push(/*#__PURE__*/_react.default.createElement(_reactBootstrap.OverlayTrigger, {
        key: "action-delete",
        trigger: "click",
        rootClose: true,
        placement: "top",
        overlay: /*#__PURE__*/_react.default.createElement(_reactBootstrap.Popover, {
          id: "delete-item-popover"
        }, /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("strong", null, _t('Comfirm Delete'), "\uFF1F")), /*#__PURE__*/_react.default.createElement("p", {
          className: "text-center"
        }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
          variant: "danger",
          onClick: this.props.deleteItem
        }, _t('Delete'))))
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        size: "sm",
        className: "model-list-action",
        style: {
          height: '1.5rem',
          lineHeight: 1
        },
        variant: "danger"
      }, _t('Delete'))));
    }
    return actions;
  }
  render() {
    var _this$props = this.props,
      {
        componentClass,
        actions
      } = _this$props,
      extProps = _objectWithoutProperties(_this$props, _excluded);
    if (componentClass !== undefined) {
      var newActions = this.actions();
      var RowComponent = componentClass;
      return /*#__PURE__*/_react.default.createElement(RowComponent, _extends({
        actions: newActions
      }, extProps));
    } else {
      return this.renderRow();
    }
  }
}
exports.BaseRow = BaseRow;
BaseRow.propTypes = {
  item: _propTypes.default.object.isRequired,
  fields: _propTypes.default.array.isRequired,
  selected: _propTypes.default.bool.isRequired,
  changeSelect: _propTypes.default.func.isRequired,
  canEdit: _propTypes.default.bool.isRequired,
  canDelete: _propTypes.default.bool.isRequired,
  editItem: _propTypes.default.func.isRequired,
  deleteItem: _propTypes.default.func.isRequired,
  actions: _propTypes.default.array
};
class HeaderLink extends _react.default.Component {
  render() {
    var {
      onClick,
      children
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("a", {
      style: {
        cursor: 'pointer'
      },
      onClick: onClick
    }, children);
  }
}
var Header = exports.Header = (_dec = (0, _xadminModel.ModelWrap)('model.list.header'), _dec(_class = class Header extends _react.default.Component {
  renderOrder() {
    var {
      field,
      order,
      canOrder
    } = this.props;
    var {
      _t
    } = _xadmin.app.context;
    var orderItems = [];
    if (canOrder) {
      orderItems = [/*#__PURE__*/_react.default.createElement(_reactBootstrap.Dropdown.Item, {
        onSelect: e => {
          this.props.changeOrder('ASC');
        },
        active: order === 'ASC'
      }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
        name: "sort-amount-asc"
      }), " ", _t('Sort ASC')), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Dropdown.Item, {
        onSelect: e => {
          this.props.changeOrder('DESC');
        },
        active: order === 'DESC'
      }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
        name: "sort-amount-desc"
      }), " ", _t('Sort DESC'))];
      if (order != '') {
        orderItems.push(/*#__PURE__*/_react.default.createElement(_reactBootstrap.Dropdown.Item, {
          onSelect: e => {
            this.props.changeOrder('');
          }
        }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
          name: "close"
        }), " ", _t('Clear order')));
      }
    }
    return orderItems;
  }
  render() {
    var {
        title,
        order,
        showText,
        style
      } = this.props,
      icon = {
        'ASC': /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
          name: "sort-asc"
        }),
        'DESC': /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
          name: "sort-desc"
        })
      }[order] || '';
    return /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
      name: "model.list.header.menu",
      el: this
    }, bs => {
      var items = [...this.renderOrder(), ...(bs || [])];
      return items.length ? /*#__PURE__*/_react.default.createElement(_reactBootstrap.Dropdown, {
        key: "nav-dropdown",
        style: style
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Dropdown.Toggle, {
        as: HeaderLink
      }, title, " ", icon), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Dropdown.Menu, null, _react.default.Children.toArray(items))) : showText === false ? null : /*#__PURE__*/_react.default.createElement("span", null, title, " ", icon);
    });
  }
}) || _class);
var ItemEditFieldGroup = _ref => {
  var {
    label,
    meta,
    input,
    field,
    children
  } = _ref;
  var groupProps = {};
  var attrs = field.attrs || {};
  var error = meta.error;
  var help = field.description || field.help;
  if (attrs.size) {
    groupProps['size'] = attrs.size;
  }
  if (attrs.variant) {
    groupProps['variant'] = attrs.variant;
  }
  var controlComponent = children ? children : /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control, _extends({}, input, attrs));
  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Group, _extends({
    className: "mb-2",
    controlId: input.name
  }, groupProps), controlComponent, error && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control.Feedback, {
    type: "invalid"
  }, error), help && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Text, {
    className: "text-muted"
  }, help));
};
var ItemEditFormLayout = props => {
  var {
    children,
    pristine,
    invalid,
    handleSubmit,
    submitting,
    onClose
  } = props;
  var icon = submitting ? 'spinner fa-spin' : 'floppy-o';
  var {
    _t
  } = _xadmin.app.context;
  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form, {
    onSubmit: handleSubmit
  }, children, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
    block: true,
    type: "submit",
    disabled: pristine || invalid || submitting,
    variant: "primary",
    size: "sm",
    onClick: handleSubmit
  }, _t('Change')));
};
var ItemEditForm = (0, _xadminModel.ModelWrap)('model.item')(_ref2 => {
  var {
    item,
    field,
    schema,
    model,
    onClose,
    saveItem
  } = _ref2;
  var formField = _lodash.default.find(model.form || [], obj => obj && obj.key == field) || {
    key: field
  };
  var required = (model.required || []).indexOf(field) >= 0 ? {
    required: [field]
  } : {};
  return /*#__PURE__*/_react.default.createElement(_xadminForm.SchemaForm, {
    formKey: "ChangeDataForm-".concat(item.id, "-").concat(field),
    initialValues: item,
    schema: _objectSpread({
      type: 'object',
      properties: {
        [field]: schema
      },
      form: [formField]
    }, required),
    option: {
      group: ItemEditFieldGroup
    },
    onSubmit: values => saveItem(_objectSpread(_objectSpread({}, values), {}, {
      __partial__: true
    })),
    onSubmitSuccess: () => onClose(),
    onClose: onClose,
    component: ItemEditFormLayout
  });
});
var Item = exports.Item = (_dec2 = (0, _xadminModel.ModelWrap)('model.list.item'), _dec2(_class2 = class Item extends _react.default.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      show: false
    });
  }
  render() {
    var {
      item,
      field,
      schema,
      componentClass,
      wrap,
      nest,
      model,
      inList = true
    } = this.props;
    var {
      _t
    } = _xadmin.app.context;
    var editable_fields = model.editableFields;
    var RawWrapComponent = wrap || (_ref3 => {
      var {
        children
      } = _ref3;
      return /*#__PURE__*/_react.default.createElement("span", {
        style: {
          cursor: 'pointer'
        }
      }, children);
    });
    var WrapComponent = nest == true || editable_fields == undefined || editable_fields.indexOf(field) < 0 ? RawWrapComponent : _ref4 => {
      var {
          children
        } = _ref4,
        props = _objectWithoutProperties(_ref4, _excluded2);
      return /*#__PURE__*/_react.default.createElement(RawWrapComponent, _extends({}, props, {
        style: {
          cursor: 'pointer'
        }
      }), this.state.show ? /*#__PURE__*/_react.default.createElement(ItemEditForm, {
        item: item,
        field: field,
        schema: schema,
        onClose: () => this.setState({
          show: false
        })
      }) : /*#__PURE__*/_react.default.createElement("span", {
        onClick: () => this.setState({
          show: true
        })
      }, children));
    };
    if (item == undefined || item == null) {
      return /*#__PURE__*/_react.default.createElement(WrapComponent, null, /*#__PURE__*/_react.default.createElement("span", {
        className: "text-muted"
      }, _t('Null')));
    }
    var value = _lodash.default.get(item, field);
    if (componentClass) {
      var ItemComponent = componentClass;
      return /*#__PURE__*/_react.default.createElement(ItemComponent, {
        item: item,
        value: value,
        field: field,
        schema: schema,
        inList: inList,
        model: model,
        wrap: WrapComponent
      });
    } else {
      return /*#__PURE__*/_react.default.createElement(WrapComponent, null, value == undefined || value == null ? /*#__PURE__*/_react.default.createElement("span", {
        className: "text-muted"
      }, _t('Null')) : value);
    }
  }
}) || _class2);
Item.WrappedComponent.propTypes = {
  item: _propTypes.default.object,
  field: _propTypes.default.string.isRequired,
  schema: _propTypes.default.object.isRequired
};
var AllCheck = (_dec3 = (0, _xadminModel.ModelWrap)('model.checkall'), _dec3(_class3 = class AllCheck extends _react.default.Component {
  handleSelect(e) {
    var selected = this.refs.selector.checked;
    this.props.changeAllSelect(selected);
  }
  render() {
    var {
      selecteall
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("input", {
      type: "checkbox",
      ref: "selector",
      checked: selecteall,
      onChange: this.handleSelect.bind(this)
    });
  }
}) || _class3);
class GridRowComponent extends BaseRow {
  handleSelect(e) {
    var selected = this.refs.selector.checked;
    this.props.changeSelect(selected);
  }
  renderRow() {
    var {
      item,
      fields,
      selected
    } = this.props;
    var actions = this.actions();
    return /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
      key: ".checkbox",
      className: selected ? 'bg-warning' : ''
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "checkbox",
      ref: "selector",
      checked: selected,
      onChange: this.handleSelect.bind(this)
    })), _react.default.Children.toArray(fields.map(field => {
      return /*#__PURE__*/_react.default.createElement(Item, {
        key: ".".concat(field),
        item: item,
        field: field,
        selected: selected,
        wrap: _ref5 => {
          var {
              children
            } = _ref5,
            props = _objectWithoutProperties(_ref5, _excluded3);
          return /*#__PURE__*/_react.default.createElement("td", _extends({
            className: selected ? 'bg-warning' : ''
          }, props), children);
        }
      });
    })), /*#__PURE__*/_react.default.createElement("td", {
      key: ".action",
      className: selected ? 'bg-warning' : '',
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ButtonGroup, null, _react.default.Children.toArray(actions))));
  }
}
var GridRow = exports.GridRow = (0, _xadminModel.ModelWrap)('model.list.row')(GridRowComponent);
var DataTable = exports.DataTable = (_dec4 = (0, _xadminModel.ModelWrap)('model.items'), _dec4(_class4 = class DataTable extends _react.default.Component {
  render() {
    var {
      fields,
      items,
      loading
    } = this.props;
    var {
      _t
    } = _xadmin.app.context;
    if (loading) {
      return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Table, null, /*#__PURE__*/_react.default.createElement(_xadminUi.Loading, null));
    } else {
      if (items.length > 0) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "table-responsive"
        }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Table, {
          striped: true,
          bordered: true,
          hover: true
        }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", null, /*#__PURE__*/_react.default.createElement(AllCheck, null)), _react.default.Children.toArray(fields.map(field => {
          return /*#__PURE__*/_react.default.createElement("th", null, /*#__PURE__*/_react.default.createElement(Header, {
            key: "model-list-header-".concat(field),
            field: field
          }));
        })), /*#__PURE__*/_react.default.createElement("th", {
          style: {
            textAlign: 'center'
          }
        }, _t('Actions')))), /*#__PURE__*/_react.default.createElement("tbody", null, _react.default.Children.toArray(items.map(item => {
          return /*#__PURE__*/_react.default.createElement(GridRow, {
            key: item.id,
            fields: fields,
            id: item.id
          });
        })))));
      } else {
        return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Jumbotron, null, /*#__PURE__*/_react.default.createElement("h5", {
          className: "text-center text-muted"
        }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
          name: "file-o"
        }), " ", _t('No Data')));
      }
    }
  }
}) || _class4);
class ListRowComponent extends BaseRow {
  handleChange(e) {
    var selected = this.refs.selector.checked;
    this.props.changeSelect(selected);
  }
  renderRow() {
    var {
      item,
      fields,
      selected,
      layout = {
        sm: 12,
        md: 6
      }
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, _extends({
      className: "mb-2"
    }, layout), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Card, {
      border: selected ? 'warning' : 'default'
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Card.Body, null, /*#__PURE__*/_react.default.createElement("input", {
      key: "select-checkbox",
      className: "float-right",
      type: "checkbox",
      ref: "selector",
      checked: selected,
      onChange: this.handleChange.bind(this)
    }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Card.Title, null, /*#__PURE__*/_react.default.createElement(Item, {
      item: item,
      field: fields[0],
      selected: selected
    })), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Card.Text, null, _react.default.Children.toArray(fields.slice(1).map(field => {
      return /*#__PURE__*/_react.default.createElement(Item, {
        item: item,
        field: field,
        selected: selected,
        wrap: _ref6 => {
          var {
              children
            } = _ref6,
            props = _objectWithoutProperties(_ref6, _excluded4);
          return /*#__PURE__*/_react.default.createElement("span", _extends({
            key: "item-".concat(item.id, "-").concat(field)
          }, props), children);
        }
      });
    })))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Card.Footer, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ButtonGroup, null, this.actions()))));
  }
}
var ListRow = exports.ListRow = (0, _xadminModel.ModelWrap)('model.list.row')(ListRowComponent);
var DataList = exports.DataList = (_dec5 = (0, _xadminModel.ModelWrap)('model.items'), _dec5(_class5 = class DataList extends _react.default.Component {
  render() {
    var {
      fields,
      items,
      loading,
      layout
    } = this.props;
    var {
      _t
    } = _xadmin.app.context;
    if (loading) {
      return /*#__PURE__*/_react.default.createElement(_xadminUi.Loading, null);
    } else {
      if (items.length > 0) {
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav, {
          className: "mb-3"
        }, _react.default.Children.toArray(fields.map(field => {
          return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav.Item, null, /*#__PURE__*/_react.default.createElement(Header, {
            key: "model-list-header-".concat(field),
            field: field,
            showText: false,
            style: {
              marginRight: 10,
              fontSize: '0.8em'
            }
          }));
        }))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Row, null, _react.default.Children.toArray(items.map(item => /*#__PURE__*/_react.default.createElement(ListRow, {
          key: item.id,
          fields: fields,
          id: item.id,
          layout: layout
        })))));
      } else {
        return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Jumbotron, null, /*#__PURE__*/_react.default.createElement("h5", {
          className: "text-center text-muted"
        }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
          name: "file-o"
        }), " ", _t('No Data')));
      }
    }
  }
}) || _class5);