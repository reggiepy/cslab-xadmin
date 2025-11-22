"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _xadminUi = require("xadmin-ui");
var _xadminForm = require("xadmin-form");
var _antd = require("antd");
var _Items = require("./Items");
var _xadmin = require("xadmin");
var _excluded = ["data", "title", "schema", "model", "loading", "saveItem"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var FieldGroup = _ref => {
  var {
    label,
    field,
    children
  } = _ref;
  var attrs = field.attrs || {};
  var extra = field.description || field.help;
  var size = field.option && field.option.groupSize || attrs.groupSize || {
    labelCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 5
      }
    },
    wrapperCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 18
      }
    }
  };
  var groupProps = _objectSpread(_objectSpread({
    extra
  }, size), {}, {
    required: field.required
  });
  return /*#__PURE__*/_react.default.createElement(_antd.Form.Item, _extends({
    label: label
  }, groupProps), children);
};
var ModelInfo = _ref2 => {
  var {
      data,
      title,
      schema,
      model,
      loading,
      saveItem
    } = _ref2,
    formProps = _objectWithoutProperties(_ref2, _excluded);
  var renderFields = () => {
    return (0, _xadminForm.schemaConvert)(model).fields.map(field => {
      field.option = _objectSpread(_objectSpread({}, field.option), formProps);
      return /*#__PURE__*/_react.default.createElement(FieldGroup, {
        key: field.key,
        label: field.label,
        field: field
      }, /*#__PURE__*/_react.default.createElement(_Items.Item, {
        item: data,
        field: field.key,
        value: data[field.key],
        inList: false,
        selected: false,
        wrap: _ref3 => {
          var {
            children
          } = _ref3;
          return children;
        }
      }));
    });
  };
  return loading ? /*#__PURE__*/_react.default.createElement(_xadminUi.Loading, null) : /*#__PURE__*/_react.default.createElement(_antd.Form, null, /*#__PURE__*/_react.default.createElement(_antd.Card, null, renderFields()));
};
var _default = props => /*#__PURE__*/_react.default.createElement(ModelInfo, _extends({}, props, (0, _xadmin.use)('model.get', props)));
exports.default = _default;