"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _xadmin = _interopRequireWildcard(require("xadmin"));
var _reactBootstrap = require("react-bootstrap");
var _reactFontawesome = _interopRequireDefault(require("react-fontawesome"));
var _relate = require("xadmin-model/lib/relate");
var _Async = _interopRequireDefault(require("react-select/lib/Async"));
var _excluded = ["model", "item", "actions"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
//@FormWrap('model.form.fkselect')
class RelateSelect extends _relate.RelateBase {
  constructor() {
    super(...arguments);
    _defineProperty(this, "onChange", option => {
      this.props.input.onChange(option.item);
    });
  }
  render() {
    var {
      _t
    } = _xadmin.default.context;
    var {
      input: {
        value: item
      },
      field
    } = this.props;
    var displayField = field.displayField || 'name';
    return /*#__PURE__*/_react.default.createElement(_Async.default, {
      cacheOptions: true,
      defaultOptions: true,
      selectOption: item ? {
        item,
        label: item[displayField],
        value: item.id
      } : null,
      onChange: this.onChange,
      loadOptions: this.loadOptions
    });
  }
}
class RelateMultiSelect extends _relate.RelateBase {
  constructor() {
    super(...arguments);
    _defineProperty(this, "onChange", options => {
      this.props.input.onChange(options.map(opt => opt.item));
    });
  }
  render() {
    var {
      _t
    } = _xadmin.default.context;
    var {
      input: {
        value: items
      },
      field
    } = this.props;
    var displayField = field.displayField || 'name';
    return /*#__PURE__*/_react.default.createElement(_Async.default, {
      cacheOptions: true,
      defaultOptions: true,
      isMulti: true,
      closeMenuOnSelect: false,
      selectOption: items ? items.map(item => ({
        value: item.id,
        item,
        label: item[displayField]
      })) : null,
      onChange: this.onChange,
      loadOptions: this.loadOptions
    });
  }
}
class FilterRelateSelect extends _relate.RelateBase {
  constructor() {
    super(...arguments);
    _defineProperty(this, "onChange", option => {
      this.props.input.onChange(option.value);
    });
  }
  render() {
    var {
      _t
    } = _xadmin.default.context;
    var {
      input: {
        value: selectId
      }
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_Async.default, {
      cacheOptions: true,
      defaultOptions: true,
      isOptionSelected: option => selectId && option.value == selectId,
      onChange: this.onChange,
      loadOptions: this.loadOptions
    });
  }
}
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
class RelateContainer extends _react.default.Component {
  render() {
    var {
      data,
      model,
      children
    } = this.props;
    var displayField = model.displayField || 'name';
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("h4", null, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
      name: model.icon
    }), " ", data[displayField]), children);
  }
}
class RelateAction extends _react.default.Component {
  render() {
    var _this$props = this.props,
      {
        model,
        item,
        actions
      } = _this$props,
      extraProps = _objectWithoutProperties(_this$props, _excluded);
    var {
      _t
    } = _xadmin.default.context;
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.DropdownButton, {
      title: _t('Relates'),
      variant: 'primary',
      key: "dropdown-action-relate",
      size: "sm",
      className: "model-list-action"
    }, actions.map((m, index) => /*#__PURE__*/_react.default.createElement(_reactBootstrap.Dropdown.Item, {
      eventKey: index,
      key: index,
      onSelect: () => _xadmin.default.go("/app/model/".concat(model.name, "/").concat(item.id, "/relations/").concat(m.name, "/"))
    }, m.title || m.name)));
  }
}
var _default = exports.default = {
  components: {
    'Relate.Action': RelateAction,
    'Relate.Container': RelateContainer
  },
  form_fields
};