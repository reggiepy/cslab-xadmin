"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalLayout = exports.FormLayout = void 0;
var _react = _interopRequireDefault(require("react"));
var _button = require("../../components/ui/button");
var _lucideReact = require("lucide-react");
var _card = require("../../components/ui/card");
var _dialog = require("../../components/ui/dialog");
var _xadmin = _interopRequireDefault(require("xadmin"));
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var FormLayout = props => {
  var {
    children,
    invalid,
    handleSubmit,
    submitting,
    onCancel
  } = props;
  var {
    _t
  } = _xadmin.default.context;
  return /*#__PURE__*/_react.default.createElement(_card.Card, null, /*#__PURE__*/_react.default.createElement(_card.CardContent, null, /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleSubmit,
    className: "mt-6 space-y-6"
  }, children, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex gap-4 justify-center"
  }, /*#__PURE__*/_react.default.createElement(_button.Button, {
    type: "submit",
    disabled: invalid || submitting
  }, submitting && /*#__PURE__*/_react.default.createElement(_lucideReact.Loader2, {
    className: "animate-spin"
  }), _t('Save')), /*#__PURE__*/_react.default.createElement(_button.Button, {
    onClick: () => onCancel ? onCancel() : history.back()
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
  return /*#__PURE__*/_react.default.createElement(_dialog.Dialog, {
    open: show,
    onOpenChange: open => !open && onClose ? onClose() : null
  }, /*#__PURE__*/_react.default.createElement(_dialog.DialogContent, {
    className: "sm:max-w-4xl w-5/6 max-h-full overflow-y-auto"
  }, /*#__PURE__*/_react.default.createElement(_dialog.DialogHeader, null, /*#__PURE__*/_react.default.createElement(_dialog.DialogTitle, null, title)), /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "mt-6 space-y-6"
  }, children), /*#__PURE__*/_react.default.createElement(_dialog.DialogFooter, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex gap-4 mt-6"
  }, /*#__PURE__*/_react.default.createElement(_button.Button, {
    type: "submit",
    disabled: invalid || submitting
  }, submitting && /*#__PURE__*/_react.default.createElement(_lucideReact.Loader2, {
    className: "animate-spin"
  }), saveText || _t('Save')), /*#__PURE__*/_react.default.createElement(_button.Button, {
    onClick: () => onClose ? onClose() : history.back()
  }, _t('Cancel')))))));
};
exports.ModalLayout = ModalLayout;