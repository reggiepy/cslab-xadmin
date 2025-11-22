"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _lodash = _interopRequireDefault(require("lodash"));
var _reactFontawesome = _interopRequireDefault(require("react-fontawesome"));
var _xadmin = _interopRequireDefault(require("xadmin"));
var _xadminUi = require("xadmin-ui");
var _xadminForm = require("xadmin-form");
var _reactBootstrap = require("react-bootstrap");
var _xadminModel = require("xadmin-model");
var _excluded = ["title", "schema", "model", "loading", "saveItem", "componentClass"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DefaultLayout = props => {
  var {
    children,
    invalid,
    handleSubmit,
    submitting
  } = props;
  var icon = submitting ? 'spinner fa-spin' : 'floppy-o';
  var {
    _t
  } = _xadmin.default.context;
  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form, {
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Card, {
    className: "mt-3 mb-3",
    body: true
  }, children, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Group, {
    as: _reactBootstrap.Row,
    className: "mt-5"
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
    sm: {
      span: 10,
      offset: 2
    }
  }, invalid ? /*#__PURE__*/_react.default.createElement(_reactBootstrap.OverlayTrigger, {
    placement: "top",
    overlay: /*#__PURE__*/_react.default.createElement(_reactBootstrap.Tooltip, null, _t('Please be sure to complete all field'))
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
    key: 0,
    type: "submit",
    disabled: submitting,
    onClick: handleSubmit,
    variant: "primary"
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
    name: "ban"
  }), " ", _t('Save'))) : /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
    key: 0,
    type: "submit",
    disabled: submitting,
    onClick: handleSubmit,
    variant: "primary"
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
    name: icon
  }), " ", _t('Save')), " ", ' ', /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
    key: 1,
    onClick: () => history.back(),
    variant: "light"
  }, _t('Cancel'))))));
};
class ModelForm extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      record: _lodash.default.omitBy(_objectSpread({}, this.props.data), _lodash.default.isNil)
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({
        record: _lodash.default.omitBy(_objectSpread({}, nextProps.data), _lodash.default.isNil)
      });
    }
  }
  render() {
    var _this$props = this.props,
      {
        title,
        schema,
        model,
        loading,
        saveItem,
        componentClass
      } = _this$props,
      formProps = _objectWithoutProperties(_this$props, _excluded);
    var FormLayout = componentClass || DefaultLayout;
    return loading ? /*#__PURE__*/_react.default.createElement(_xadminUi.Loading, null) : /*#__PURE__*/_react.default.createElement(_xadminForm.SchemaForm, _extends({
      formKey: "model.".concat(model.key),
      schema: schema || model,
      initialValues: this.state.record,
      onSubmit: values => saveItem(values),
      component: FormLayout
    }, formProps, model.form_props));
  }
}
ModelForm.propTypes = {
  id: _propTypes.default.string,
  data: _propTypes.default.object,
  loading: _propTypes.default.bool,
  model: _propTypes.default.object.isRequired,
  getItem: _propTypes.default.func.isRequired,
  saveItem: _propTypes.default.func.isRequired
};
var _default = exports.default = (0, _xadminModel.ModelWrap)('model.item')(ModelForm);