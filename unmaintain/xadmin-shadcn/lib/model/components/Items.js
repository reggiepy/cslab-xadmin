"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ItemEditForm = exports.Item = exports.Header = exports.DataTable = exports.DataList = exports.DataCard = exports.ActionEdit = exports.ActionDelete = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _xadminModel = require("xadmin-model");
var _xadmin = require("xadmin");
var _xadminI18n = require("xadmin-i18n");
var _xadminForm = require("xadmin-form");
var _xadminUi = require("xadmin-ui");
var _icons = require("@ant-design/icons");
var _antd = require("antd");
var _excluded = ["item", "field", "wrap"],
  _excluded2 = ["children"],
  _excluded3 = ["children"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var {
  getFieldProp
} = _xadminModel.utils;
var ItemEditFormLayout = props => {
  var {
    children,
    pristine,
    invalid,
    handleSubmit,
    submitting
  } = props;
  return /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleSubmit
  }, children, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    style: {
      marginTop: '-1rem'
    },
    block: true,
    htmlType: "submit",
    loading: submitting,
    disabled: pristine || invalid,
    size: "small"
  }, (0, _xadminI18n._t)('Change')));
};
var ItemEditForm = props => {
  var {
    item,
    field,
    value,
    schema,
    onClose
  } = props;
  var {
    model
  } = (0, _xadmin.use)('model');
  var {
    saveItem
  } = (0, _xadmin.use)('model.save', props);
  var getSchema = () => {
    var formField = _lodash.default.find(model.form || [], obj => obj && obj.key == field) || {
      key: field
    };
    var required = (model.required || []).indexOf(field) >= 0 ? {
      required: ['value']
    } : {};
    return _objectSpread({
      type: 'object',
      properties: {
        value: schema
      },
      form: [_objectSpread(_objectSpread({}, formField), {}, {
        key: 'value'
      })]
    }, required);
  };
  var [formSchema, setFormSchema] = _react.default.useState(getSchema);
  _react.default.useEffect(() => {
    setFormSchema(getSchema());
  }, [model, field, schema]);
  return /*#__PURE__*/_react.default.createElement(_xadminForm.SchemaForm, {
    initialValues: {
      id: item['id'],
      value
    },
    schema: formSchema,
    option: {
      group: (0, _xadminUi.C)('Form.InlineGroup')
    },
    onSubmit: values => saveItem({
      id: values.id,
      [field]: values.value
    }, true),
    onSubmitSuccess: () => onClose(),
    component: ItemEditFormLayout
  });
};
exports.ItemEditForm = ItemEditForm;
var Item = props => {
  var {
      item,
      field,
      wrap
    } = props,
    itemProps = _objectWithoutProperties(props, _excluded);
  var {
    value,
    schema,
    componentClass,
    editable
  } = (0, _xadmin.use)('model.list.item', props);
  var RawWrapComponent = wrap || 'span';
  var WrapComponent = editable ? RawWrapComponent : _ref => {
    var {
        children
      } = _ref,
      props = _objectWithoutProperties(_ref, _excluded2);
    var [edit, setEdit] = _react.default.useState(false);
    return /*#__PURE__*/_react.default.createElement(_antd.Popover, {
      content: /*#__PURE__*/_react.default.createElement(_xadminUi.C, {
        is: "Model.ItemEditForm",
        item: item,
        field: field,
        value: value,
        schema: schema,
        onClose: () => setEdit(false)
      }),
      trigger: "click",
      onVisibleChange: setEdit,
      visible: edit,
      placement: "right"
    }, /*#__PURE__*/_react.default.createElement(RawWrapComponent, _extends({}, props, {
      style: {
        cursor: 'pointer'
      }
    }), children, " ", /*#__PURE__*/_react.default.createElement(_icons.EditOutlined, null)));
  };
  if (item == undefined || item == null) {
    return /*#__PURE__*/_react.default.createElement(WrapComponent, null, /*#__PURE__*/_react.default.createElement("span", {
      className: "text-muted"
    }, (0, _xadminI18n._t)('Null')));
  }
  if (componentClass) {
    var ItemComponent = componentClass;
    return /*#__PURE__*/_react.default.createElement(ItemComponent, _extends({
      item: item,
      value: value,
      field: field,
      schema: schema,
      wrap: WrapComponent
    }, itemProps));
  } else {
    return /*#__PURE__*/_react.default.createElement(WrapComponent, null, value == undefined || value == null ? /*#__PURE__*/_react.default.createElement("span", {
      className: "text-muted"
    }, (0, _xadminI18n._t)('Null')) : value);
  }
};
exports.Item = Item;
var Header = props => {
  var {
    showText,
    field
  } = props;
  var {
    title
  } = (0, _xadmin.use)('model.list.header', {
    field
  });
  var {
    order,
    canOrder,
    changeOrder
  } = (0, _xadmin.use)('model.list.order', {
    field
  });
  var renderOrder = () => {
    var orderItems = [];
    if (canOrder) {
      orderItems = [/*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
        onClick: e => {
          changeOrder('ASC');
        },
        key: "ASC"
      }, /*#__PURE__*/_react.default.createElement(_icons.CaretUpOutlined, null), " ", (0, _xadminI18n._t)('Sort ASC')), /*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
        onClick: e => {
          changeOrder('DESC');
        },
        key: "DESC"
      }, /*#__PURE__*/_react.default.createElement(_icons.CaretDownOutlined, null), " ", (0, _xadminI18n._t)('Sort DESC'))];
      if (order != '') {
        orderItems.push(/*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
          onClick: e => {
            changeOrder('');
          }
        }, /*#__PURE__*/_react.default.createElement(_icons.CloseOutlined, null), " ", (0, _xadminI18n._t)('Clear order')));
      }
    }
    return orderItems;
  };
  var icon = {
    'ASC': /*#__PURE__*/_react.default.createElement(_icons.CaretUpOutlined, null),
    'DESC': /*#__PURE__*/_react.default.createElement(_icons.CaretDownOutlined, null)
  }[order] || '';
  var items = [...renderOrder(), ...((0, _xadmin.Block)('model.list.header.menu') || [])];
  return items.filter(item => !_lodash.default.isNil(item)).length > 0 ? /*#__PURE__*/_react.default.createElement(_antd.Dropdown, {
    overlay: /*#__PURE__*/_react.default.createElement(_antd.Menu, {
      selectedKeys: [order]
    }, _react.default.Children.toArray(items)),
    trigger: ['click']
  }, /*#__PURE__*/_react.default.createElement("a", {
    style: {
      cursor: 'pointer'
    }
  }, title, " ", icon)) : showText === false ? null : /*#__PURE__*/_react.default.createElement("span", null, title, " ", icon);
};
exports.Header = Header;
var useActions = props => {
  var {
    renderActions
  } = (0, _xadmin.use)('model.actions');
  return /*#__PURE__*/_react.default.createElement(_antd.Button.Group, {
    size: "small",
    className: "model-list-action"
  }, renderActions(props));
};
var useList = render => props => {
  var state = _objectSpread(_objectSpread(_objectSpread({}, props), (0, _xadmin.use)('model.list')), (0, _xadmin.use)('model'));
  var {
    loading,
    items,
    model
  } = state;
  var list = render(state);
  if (loading) {
    return /*#__PURE__*/_react.default.createElement(_xadminUi.Loading, null, items.length > 0 ? list : null);
  } else {
    if (items.length > 0) {
      return list;
    } else {
      var EmptyComponent = model.components && model.components.DataEmpty;
      if (EmptyComponent) {
        return /*#__PURE__*/_react.default.createElement(EmptyComponent, null);
      } else {
        return /*#__PURE__*/_react.default.createElement(_antd.Card, null, /*#__PURE__*/_react.default.createElement(_antd.Empty, {
          style: {
            marginBottom: '.5rem'
          },
          description: (0, _xadminI18n._t)('No Data')
        }));
      }
    }
  }
};
var DataTableActionRender = props => {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%',
      textAlign: 'center'
    }
  }, useActions(_objectSpread(_objectSpread({}, props), (0, _xadmin.use)('model.list.row', {
    id: props.id
  }))));
};
var DataTable = exports.DataTable = useList(_ref2 => {
  var {
    model,
    items,
    fields,
    size,
    onRow
  } = _ref2;
  var {
    selected,
    onSelect,
    onSelectAll
  } = (0, _xadmin.use)('model.select');
  var {
    actions
  } = (0, _xadmin.use)('model.actions');
  var {
    actions: batchActions
  } = (0, _xadmin.use)('model.batchActions');
  var lockedFields = model.lockedFields || [];
  var columns = [];
  fields.forEach(fieldName => {
    var field = getFieldProp(model, fieldName);
    if (!field) return;
    var column = _objectSpread({
      field,
      width: field.width || undefined,
      fixed: lockedFields.indexOf(fieldName) >= 0,
      title: /*#__PURE__*/_react.default.createElement(Header, {
        key: "model-list-header-".concat(fieldName),
        field: fieldName
      }),
      key: fieldName,
      dataIndex: fieldName,
      render: (value, item) => {
        return /*#__PURE__*/_react.default.createElement(_xadminUi.C, {
          is: "Model.DataItem",
          item: item,
          field: fieldName,
          inList: true
        });
      }
    }, field.column);
    if (field.level2) {
      if (columns.length > 0 && columns[columns.length - 1].children !== undefined && columns[columns.length - 1].title == field.level2) {
        columns[columns.length - 1].children.push(column);
      } else {
        columns.push({
          title: field.level2,
          children: [column]
        });
      }
    } else {
      columns.push(column);
    }
  });
  if (actions && actions.length > 0) columns.push({
    title: '',
    key: '__action__',
    fixed: 'right',
    render: (val, item) => /*#__PURE__*/_react.default.createElement(DataTableActionRender, {
      key: item.id,
      fields: fields,
      id: item.id
    })
  });
  var rowSelection = batchActions && batchActions.length > 0 ? {
    selectedRowKeys: selected.map(r => r.id),
    onSelect,
    onSelectAll
  } : undefined;
  var tableProps = model.dataTableProps ? typeof model.dataTableProps == 'function' ? model.dataTableProps(columns, items) : model.dataTableProps : {};
  return /*#__PURE__*/_react.default.createElement(_antd.Table, _extends({
    columns: columns,
    dataSource: items,
    bordered: true,
    size: size,
    rowSelection: rowSelection,
    pagination: false,
    onRow: onRow,
    rowKey: "id"
    //scroll={{ x: 700 }}
  }, tableProps));
});
var DataListRender = props => {
  var {
    id,
    fields
  } = props;
  var {
    item,
    selected
  } = (0, _xadmin.use)('model.list.row', {
    id
  });
  var Item = (0, _xadminUi.C)('Model.DataItem');
  return /*#__PURE__*/_react.default.createElement(_antd.List.Item, {
    actions: [useActions(props)]
  }, /*#__PURE__*/_react.default.createElement(_antd.List.Item.Meta, {
    title: /*#__PURE__*/_react.default.createElement(Item, {
      item: item,
      field: fields[0],
      value: item[fields[0]],
      selected: selected
    }),
    description: /*#__PURE__*/_react.default.createElement(Item, {
      item: item,
      field: fields[1],
      value: item[fields[1]],
      selected: selected
    })
  }), _react.default.Children.toArray(fields.slice(2).map(field => {
    return /*#__PURE__*/_react.default.createElement(Item, {
      item: item,
      field: field,
      value: item[field],
      selected: selected,
      inList: true,
      wrap: _ref3 => {
        var {
            children
          } = _ref3,
          props = _objectWithoutProperties(_ref3, _excluded3);
        return /*#__PURE__*/_react.default.createElement("div", _extends({
          key: "item-".concat(item.id, "-").concat(field)
        }, props), children);
      }
    });
  })));
};
var DataList = exports.DataList = useList(_ref4 => {
  var {
    model,
    items,
    fields,
    size
  } = _ref4;
  var RenderItem = model.components && model.components.DataListRender || (0, _xadminUi.C)('Model.DataListRender') || DataListRender;
  return /*#__PURE__*/_react.default.createElement(_antd.Card, null, /*#__PURE__*/_react.default.createElement(_antd.List, _extends({
    itemLayout: "vertical",
    dataSource: items,
    size: size,
    renderItem: item => /*#__PURE__*/_react.default.createElement(RenderItem, {
      key: item.id,
      fields: fields,
      id: item.id
    })
  }, model.dataListProps)));
});
var DataCard = exports.DataCard = DataTable;
var ActionEdit = props => {
  var {
    canEdit
  } = (0, _xadmin.use)('model.permission');
  var {
    onEdit
  } = (0, _xadmin.use)('model.event');
  if (canEdit) {
    return /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      placement: "top",
      title: (0, _xadminI18n._t)('Edit')
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      key: "action-edit",
      size: "small",
      className: "model-list-action",
      onClick: () => onEdit(props.id)
    }, /*#__PURE__*/_react.default.createElement(_icons.EditOutlined, null)));
  }
  return null;
};
exports.ActionEdit = ActionEdit;
var ActionDelete = props => {
  var {
    canDelete
  } = (0, _xadmin.use)('model.permission');
  var {
    deleteItem
  } = (0, _xadmin.use)('model.delete', props);
  if (canDelete) {
    return /*#__PURE__*/_react.default.createElement(_antd.Popconfirm, {
      key: "action-delete",
      title: (0, _xadminI18n._t)('Comfirm Delete') + '?',
      onConfirm: () => deleteItem(),
      okText: (0, _xadminI18n._t)('Delete'),
      cancelText: (0, _xadminI18n._t)('Cancel')
    }, /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
      placement: "top",
      title: (0, _xadminI18n._t)('Delete')
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      key: "action-delete",
      size: "small",
      className: "model-list-action",
      type: "danger"
    }, /*#__PURE__*/_react.default.createElement(_icons.DeleteOutlined, null))));
  }
  return null;
};
exports.ActionDelete = ActionDelete;
var _default = exports.default = DataTable;