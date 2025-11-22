"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _lodash = _interopRequireDefault(require("lodash"));
var _xadminUi = require("xadmin-ui");
var _schema = require("xadmin-form/lib/schema");
var _reactBootstrap = require("react-bootstrap");
var _xadminModel = require("xadmin-model");
var _Items = require("./Items");
var _excluded = ["title", "model"],
  _excluded2 = ["children"],
  _excluded3 = ["title", "model", "loading", "componentClass"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var FieldGroup = _ref => {
  var {
    label,
    field,
    children
  } = _ref;
  var groupProps = {};
  var attrs = field.attrs || {};
  var help = field.description || field.help;
  var size = field.option && field.option.groupSize || attrs.groupSize || {
    label: {
      sm: 4,
      md: 3,
      lg: 2
    },
    control: {
      sm: 8,
      md: 9,
      lg: 10
    }
  };
  if (attrs.size) {
    groupProps['size'] = attrs.size;
  }
  if (attrs.variant) {
    groupProps['variant'] = attrs.variant;
  }
  var controlComponent = children ? children : /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control, attrs);
  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Group, _extends({
    as: _reactBootstrap.Row
  }, groupProps), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Label, _extends({
    key: 0,
    column: true
  }, size.label), label), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, _extends({
    key: 1
  }, size.control), controlComponent, help && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Text, {
    className: "text-muted"
  }, help)));
};
class ModelInfo extends _react.default.Component {
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
    if (this.props.id !== nextProps.id) {
      this.props.getItem(nextProps.id);
    }
  }
  renderFields() {
    var _this$props = this.props,
      {
        title,
        model
      } = _this$props,
      formProps = _objectWithoutProperties(_this$props, _excluded);
    var record = this.state.record;
    return (0, _schema.convert)(model).fields.map(field => {
      field.option = _objectSpread(_objectSpread({}, field.option), formProps);
      return /*#__PURE__*/_react.default.createElement(FieldGroup, {
        key: field.key,
        label: field.label,
        field: field
      }, /*#__PURE__*/_react.default.createElement(_Items.Item, {
        item: record,
        field: field.key,
        inList: false,
        selected: false,
        wrap: _ref2 => {
          var {
              children
            } = _ref2,
            props = _objectWithoutProperties(_ref2, _excluded2);
          return /*#__PURE__*/_react.default.createElement("div", {
            key: "value",
            className: "my-1"
          }, children);
        }
      }));
    });
  }
  render() {
    var _this$props2 = this.props,
      {
        title,
        model,
        loading,
        componentClass
      } = _this$props2,
      formProps = _objectWithoutProperties(_this$props2, _excluded3);
    return loading ? /*#__PURE__*/_react.default.createElement(_xadminUi.Loading, null) : /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Card, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Card.Body, null, this.renderFields())));
  }
}
ModelInfo.propTypes = {
  id: _propTypes.default.string,
  data: _propTypes.default.object,
  loading: _propTypes.default.bool,
  model: _propTypes.default.object.isRequired,
  getItem: _propTypes.default.func.isRequired
};
var _default = exports.default = (0, _xadminModel.ModelWrap)('model.item')(ModelInfo);