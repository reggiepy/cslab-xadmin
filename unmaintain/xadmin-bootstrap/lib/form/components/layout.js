"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalLayout = exports.FormLayout = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactBootstrap = require("react-bootstrap");
var _xadmin = _interopRequireDefault(require("xadmin"));
var _reactFontawesome = _interopRequireDefault(require("react-fontawesome"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var FormLayout = props => {
  var {
    children,
    invalid,
    handleSubmit,
    onDelete,
    schema,
    submitting
  } = props;
  var {
    _t
  } = _xadmin.default.context;
  var icon = submitting ? 'spinner fa-spin' : 'floppy-o';
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
exports.FormLayout = FormLayout;
var ModalLayout = _ref => {
  var {
    children,
    invalid,
    handleSubmit,
    submitting,
    title,
    show,
    onClose,
    saveText
  } = _ref;
  var {
    _t
  } = _xadmin.default.context;
  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal, {
    show: show,
    size: "lg",
    onHide: onClose
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Header, {
    closeButton: true
  }, title), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Body, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form, {
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
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
    name: submitting ? 'spinner fa-spin' : 'floppy-o'
  }), " ", saveText || _t('Save'))));
};
exports.ModalLayout = ModalLayout;