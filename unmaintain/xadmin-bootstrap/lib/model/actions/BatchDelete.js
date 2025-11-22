"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactBootstrap = require("react-bootstrap");
var _xadmin = require("xadmin");
var _xadminModel = require("xadmin-model");
var _xadminUi = require("xadmin-ui");
var _dec, _dec2, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BatchDeleteBtn = (_dec = (0, _xadminModel.ModelWrap)('actons.batch_delete'), _dec2 = (0, _xadminModel.ModelWrap)('model.list.actions'), _dec(_class = _dec2(_class = class BatchDeleteBtn extends _react.default.Component {
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
  }
  onBatchDelete() {
    this.props.onBatchDelete();
    this.onClose();
  }
  renderModel() {
    var {
      selected,
      model
    } = this.props;
    var {
      _t
    } = _xadmin.app.context;
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal, {
      key: "actions_batch_delete_modal",
      show: this.state.show,
      onHide: this.onClose
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Header, {
      closeButton: true
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Title, null, _t('Confirm to delete selected items'))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Body, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ListGroup, null, selected.map(item => /*#__PURE__*/_react.default.createElement(_reactBootstrap.ListGroupItem, {
      key: item.id
    }, /*#__PURE__*/_react.default.createElement(_xadminUi.Icon, {
      name: model.icon
    }), " ", model.display ? model.display(item) : item.name)))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Footer, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      key: 0,
      variant: "light",
      onClick: this.onClose
    }, _t('Close')), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      key: 1,
      variant: "danger",
      onClick: this.onBatchDelete.bind(this)
    }, _t('Delete'))));
  }
  render() {
    var {
      selected,
      canDelete
    } = this.props;
    var {
      _t
    } = _xadmin.app.context;
    return canDelete ? [/*#__PURE__*/_react.default.createElement(_reactBootstrap.Dropdown.Item, {
      key: 'actions_batch_delete',
      onSelect: e => {
        this.setState({
          show: true
        });
      },
      disabled: selected.length == 0
    }, _t('Batch Delete Items')), selected.length > 0 ? this.renderModel() : null] : null;
  }
}) || _class) || _class);
var _default = exports.default = BatchDeleteBtn;