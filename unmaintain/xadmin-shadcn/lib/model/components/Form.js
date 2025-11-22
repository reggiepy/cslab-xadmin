"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _xadminUi = require("xadmin-ui");
var _xadminForm = require("xadmin-form");
var _xadmin = require("xadmin");
var _excluded = ["title", "schema"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var ModelForm = props => {
  var {
      title,
      schema
    } = props,
    formProps = _objectWithoutProperties(props, _excluded);
  var {
    model
  } = (0, _xadmin.use)('model');
  var {
    data,
    loading,
    saveItem
  } = (0, _xadmin.use)('model.item', props);
  return loading ? /*#__PURE__*/_react.default.createElement(_xadminUi.Loading, null) : /*#__PURE__*/_react.default.createElement(_xadminForm.SchemaForm, _extends({
    formKey: "model.".concat(model.key),
    schema: schema || model,
    initialValues: data,
    onSubmit: item => saveItem(item)
  }, formProps, model.formProps));
};
var _default = exports.default = ModelForm;