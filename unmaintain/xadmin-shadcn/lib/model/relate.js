"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _xadminI18n = require("xadmin-i18n");
var _antd = require("antd");
var _xadmin = _interopRequireWildcard(require("xadmin"));
var _xadminUi = require("xadmin-ui");
var _excluded = ["value", "isOptionSelected", "label", "onChange", "style", "field"],
  _excluded2 = ["model", "item", "actions"];
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
var Option = _antd.Select.Option;
var AsyncSelect = _ref => {
  var {
      value,
      isOptionSelected,
      label,
      onChange,
      style,
      field
    } = _ref,
    extraProps = _objectWithoutProperties(_ref, _excluded);
  var {
    loadOptions,
    loading,
    options
  } = (0, _xadmin.use)('model.relate.select', {
    field
  });
  var data = _react.default.useMemo(() => options.reduce((prev, opt) => {
    prev[opt.value] = _objectSpread({
      key: opt.value
    }, opt);
    return prev;
  }, {}), [options]);
  var onItemChange = selectOpt => {
    onChange(_lodash.default.isArray(selectOpt) ? selectOpt.map(_ref2 => {
      var {
        key
      } = _ref2;
      return data[key] || _lodash.default.find(value, v => v.key == key) || null;
    }).filter(Boolean) : data[selectOpt.key]);
  };
  var useOptions = _react.default.useMemo(() => {
    var options = Object.values(data);
    if (extraProps.mode == 'multiple' && value) {
      var selected = value.map(v => v.key);
      options = options.filter(opt => selected.indexOf(opt.key) == -1);
    }
    return options;
  }, [data, extraProps.mode, value]);
  return /*#__PURE__*/_react.default.createElement(_antd.Select, _extends({
    showSearch: true,
    labelInValue: true,
    value: value ? value : isOptionSelected ? Object.values(data).filter(isOptionSelected) : undefined,
    notFoundContent: loading ? /*#__PURE__*/_react.default.createElement("div", {
      style: {
        margin: '2px',
        textAlign: 'center'
      }
    }, /*#__PURE__*/_react.default.createElement(_antd.Spin, {
      size: "small"
    })) : /*#__PURE__*/_react.default.createElement(_antd.Empty, null),
    onSearch: loadOptions,
    onChange: onItemChange,
    onBlur: () => {
      loadOptions(null);
    },
    filterOption: false,
    placeholder: label,
    style: _objectSpread({
      minWidth: 150
    }, style)
  }, extraProps), useOptions.map(d => /*#__PURE__*/_react.default.createElement(Option, {
    key: d.key
  }, d.label)));
};
var RelateSelect = props => {
  var {
    input: {
      value: item,
      onChange: _onChange
    },
    label,
    field
  } = props;
  var displayField = field.displayField || 'name';
  return /*#__PURE__*/_react.default.createElement(AsyncSelect, {
    value: item ? {
      item,
      label: item[displayField],
      key: item.id
    } : null,
    onChange: option => {
      _onChange(option.item);
    },
    field: field,
    label: label
  });
};
var RelateMultiSelect = props => {
  var {
    input: {
      value: items,
      onChange: _onChange2
    },
    label,
    field
  } = props;
  var displayField = field.displayField || 'name';
  return /*#__PURE__*/_react.default.createElement(AsyncSelect, {
    mode: "multiple",
    value: items ? items.map(item => ({
      key: item.id,
      item,
      label: item[displayField]
    })) : null,
    onChange: options => {
      _onChange2(options.map(opt => opt.item));
    },
    field: field,
    label: label
  });
};
var FilterRelateSelect = props => {
  var {
    input: {
      value: selectId,
      onChange: _onChange3
    },
    label,
    field
  } = props;
  return /*#__PURE__*/_react.default.createElement(AsyncSelect, {
    isOptionSelected: option => selectId && option.key == selectId,
    onChange: option => {
      _onChange3(option.value);
    },
    field: field,
    label: label
  });
};
var form_fields = {
  fkselect: {
    component: RelateSelect
  },
  multi_select: {
    component: RelateMultiSelect
  },
  filter_relate: {
    component: FilterRelateSelect,
    parse: (value, name) => {
      if (value && value.id) {
        return value.id;
      }
      return value;
    }
  }
};
var RelateContainer = _ref3 => {
  var {
    data,
    model,
    children
  } = _ref3;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("h4", null, /*#__PURE__*/_react.default.createElement(_xadminUi.Icon, {
    name: model.icon
  }), " ", data[model.displayField || 'name']), children);
};
var RelateAction = _ref4 => {
  var {
      model,
      item,
      actions
    } = _ref4,
    extraProps = _objectWithoutProperties(_ref4, _excluded2);
  return /*#__PURE__*/_react.default.createElement(_antd.Dropdown, {
    key: "dropdown-action-relate",
    overlay: /*#__PURE__*/_react.default.createElement(_antd.Menu, null, actions.map((m, index) => /*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
      key: index,
      onClick: () => _xadmin.default.go("/app/model/".concat(model.name, "/").concat(item.id, "/relations/").concat(m.name, "/"))
    }, m.title || m.name)))
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    size: "small",
    className: "model-list-action"
  }, (0, _xadminI18n._t)('Relates')));
};
var _default = exports.default = {
  components: {
    'Relate.Action': RelateAction,
    'Relate.Container': RelateContainer
  },
  form_fields
};