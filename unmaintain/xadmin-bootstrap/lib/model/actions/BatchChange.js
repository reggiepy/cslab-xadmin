"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _reactBootstrap = require("react-bootstrap");
var _xadminForm = require("xadmin-form");
var _xadmin = require("xadmin");
var _xadminModel = require("xadmin-model");
var _xadminUi = require("xadmin-ui");
var _dec, _dec2, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var FieldGroup = _ref => {
  var {
    label,
    meta,
    input,
    field,
    children
  } = _ref;
  var groupProps = {};
  var attrs = field.attrs || {};
  var error = meta.touched && meta.error;
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
  var controlComponent = children ? children : /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control, _extends({}, input, attrs));
  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Group, _extends({
    as: _reactBootstrap.Row,
    controlId: input.name
  }, groupProps), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Label, _extends({
    column: true
  }, size.label), label, field && field.required ? /*#__PURE__*/_react.default.createElement("span", {
    className: "text-danger"
  }, "*") : ''), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, size.control, controlComponent, error && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control.Feedback, {
    type: "invalid"
  }, error), help && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Text, {
    className: "text-muted"
  }, help)));
};
var BatchChangeBtn = (_dec = (0, _xadminModel.ModelWrap)('actons.batch_change'), _dec2 = (0, _xadminModel.ModelWrap)('model.list.actions'), _dec(_class = _dec2(_class = class BatchChangeBtn extends _react.default.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      show: false
    });
    _defineProperty(this, "onClose", () => {
      this.setState({
        show: false
      });
    });
    _defineProperty(this, "onBatchChange", value => {
      this.props.onBatchChange(value);
      this.onClose();
    });
  }
  renderModel() {
    var {
      model,
      fields
    } = this.props;
    var {
      _t
    } = _xadmin.app.context;
    var show = this.state.show;
    return /*#__PURE__*/_react.default.createElement(_xadminForm.SchemaForm, {
      formKey: "model_batch.".concat(model.key),
      schema: _lodash.default.omit(_objectSpread(_objectSpread({}, model), {}, {
        properties: _lodash.default.pick(model.properties, fields),
        form: model.form !== undefined ? model.form.filter(obj => {
          return obj == '*' || fields.indexOf(obj) >= 0 || fields.indexOf(obj.key) >= 0;
        }) : ['*']
      }), 'required'),
      option: {
        group: FieldGroup
      },
      onSubmit: values => this.onBatchChange(values),
      onClose: this.onClose
    }, _ref2 => {
      var {
        children,
        invalid,
        handleSubmit,
        submitting,
        onClose
      } = _ref2;
      return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal, {
        key: "actions_batch_change_modal",
        show: show,
        onHide: onClose
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Header, {
        closeButton: true
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Title, null, _t('Please input the value to batch change items'))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Body, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form, {
        onSubmit: handleSubmit
      }, children)), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Footer, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        key: 0,
        variant: "light",
        onClick: onClose
      }, _t('Close')), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        key: 1,
        type: "submit",
        disabled: invalid || submitting,
        variant: "primary",
        onClick: handleSubmit
      }, /*#__PURE__*/_react.default.createElement(_xadminUi.Icon, {
        name: submitting ? 'spinner fa-spin' : 'floppy-o'
      }), " ", _t('Change'))));
    });
  }
  render() {
    var {
      selected,
      canEdit,
      fields
    } = this.props;
    var {
      _t
    } = _xadmin.app.context;
    return canEdit && fields.length > 0 ? [/*#__PURE__*/_react.default.createElement(_reactBootstrap.Dropdown.Item, {
      key: "actions_batch_change",
      onSelect: e => {
        this.setState({
          show: true
        });
      },
      disabled: selected.length == 0
    }, _t('Batch Change Items')), selected.length > 0 ? this.renderModel() : null] : null;
  }
}) || _class) || _class);
var _default = exports.default = BatchChangeBtn;