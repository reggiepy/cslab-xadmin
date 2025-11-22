"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _xadmin = require("xadmin");
var _xadminUi = require("xadmin-ui");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var BatchDeleteBtn = props => {
  var {
    _t
  } = _xadmin.app.context;
  var [show, setShow] = _react.default.useState(false);
  var {
    canDelete,
    loading,
    onBatchDelete
  } = (0, _xadmin.use)('actons.batch_delete');
  var {
    selected
  } = (0, _xadmin.use)('model.select');
  var {
    model
  } = (0, _xadmin.use)('model');
  var onClose = () => {
    setShow(false);
  };
  var renderModel = () => {
    return /*#__PURE__*/_react.default.createElement(_antd.Modal, {
      key: "actions_batch_delete_modal",
      title: _t('Confirm to delete selected items'),
      visible: show,
      onOk: () => {
        onBatchDelete().then(onClose);
      },
      okText: _t('Delete'),
      okType: "danger",
      cancelText: _t('Cancel'),
      onCancel: onClose,
      okButtonProps: {
        loading
      }
    }, /*#__PURE__*/_react.default.createElement(_antd.List, {
      dataSource: selected,
      renderItem: item => /*#__PURE__*/_react.default.createElement(_antd.List.Item, {
        key: item.id
      }, /*#__PURE__*/_react.default.createElement(_xadminUi.Icon, {
        name: model.icon
      }), " ", model.display ? model.display(item) : item.name)
    }));
  };
  return canDelete ? [/*#__PURE__*/_react.default.createElement(_antd.Menu.Item, _extends({}, props, {
    key: 'actions_batch_delete',
    onClick: e => {
      props.onClick && props.onClick(e);
      setShow(true);
    },
    disabled: selected.length == 0
  }), _t('Batch Delete Items')), selected.length > 0 ? renderModel() : null] : null;
};
var _default = exports.default = BatchDeleteBtn;