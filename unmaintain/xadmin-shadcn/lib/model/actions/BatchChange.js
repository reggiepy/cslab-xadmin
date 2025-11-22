"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _antd = require("antd");
var _xadminForm = require("xadmin-form");
var _xadmin = require("xadmin");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BatchChangeBtn = props => {
  var {
    _t
  } = _xadmin.app.context;
  var [show, setShow] = _react.default.useState(false);
  var {
    canEdit,
    fields,
    loading,
    onBatchChange
  } = (0, _xadmin.use)('actons.batch_change');
  var {
    selected
  } = (0, _xadmin.use)('model.select');
  var {
    model
  } = (0, _xadmin.use)('model');
  var onClose = () => setShow(false);
  var renderModel = () => {
    var fs = fields.map(f => f.split('.')[0]);
    return /*#__PURE__*/_react.default.createElement(_xadminForm.SchemaForm, {
      key: "actions_batch_change_form",
      formKey: "model_batch.".concat(model.key),
      schema: _lodash.default.omit(_objectSpread(_objectSpread({}, model), {}, {
        properties: _lodash.default.pick(model.properties, fs),
        form: model.form !== undefined ? fs.map(name => _lodash.default.find(model.form, f => f && f.key == name) || name) : ['*']
      }), 'required'),
      onSubmit: onBatchChange,
      onSubmitSuccess: onClose,
      onClose: onClose
    }, _ref => {
      var {
        children,
        invalid,
        handleSubmit,
        submitting,
        onClose
      } = _ref;
      return /*#__PURE__*/_react.default.createElement(_antd.Modal, {
        key: "actions_batch_change_modal",
        visible: show,
        onClose: onClose,
        title: _t('Please input the value to batch change items'),
        okText: _t('Change'),
        onOk: handleSubmit,
        okButtonDisabled: invalid || submitting,
        cancelText: _t('Cancel'),
        onCancel: onClose,
        okButtonProps: {
          loading
        }
      }, /*#__PURE__*/_react.default.createElement(_antd.Form, {
        onSubmit: handleSubmit
      }, children));
    });
  };
  return canEdit && fields.length > 0 ? [/*#__PURE__*/_react.default.createElement(_antd.Menu.Item, _extends({}, props, {
    key: "actions_batch_change",
    onClick: e => {
      props.onClick && props.onClick(e);
      setShow(true);
    },
    disabled: selected.length == 0
  }), _t('Batch Change Items')), selected.length > 0 ? renderModel() : null] : null;
};
var _default = exports.default = BatchChangeBtn;