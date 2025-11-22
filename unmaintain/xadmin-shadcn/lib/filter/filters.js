"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Submenu = exports.NavForm = exports.FilterModal = exports.FilterForm = void 0;
var _react = _interopRequireDefault(require("react"));
var _xadmin = require("xadmin");
var _icons = require("@ant-design/icons");
var _antd = require("antd");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var {
  useBreakpoint
} = _antd.Grid;
var FilterForm = _ref => {
  var {
    children,
    invalid,
    handleSubmit,
    submitting,
    options,
    resetFilter
  } = _ref;
  var {
    _t
  } = _xadmin.app.context;
  return /*#__PURE__*/_react.default.createElement(_antd.Form, {
    onSubmit: handleSubmit
  }, children, options && options.submitOnChange ? null : /*#__PURE__*/_react.default.createElement(_antd.Form.Item, {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Space, null, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    disabled: invalid,
    loading: submitting,
    type: "primary",
    onClick: handleSubmit,
    icon: /*#__PURE__*/_react.default.createElement(_icons.SearchOutlined, null)
  }, _t('Search')), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    disabled: submitting,
    onClick: resetFilter
  }, _t('Reset')))));
};
exports.FilterForm = FilterForm;
var NavForm = _ref2 => {
  var {
    children,
    invalid,
    handleSubmit,
    submitting,
    options,
    resetFilter
  } = _ref2;
  var {
    _t
  } = _xadmin.app.context;
  return /*#__PURE__*/_react.default.createElement(_antd.Form, {
    layout: "inline",
    onSubmit: handleSubmit
  }, children, options && options.submitOnChange ? null : /*#__PURE__*/_react.default.createElement(_antd.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd.Space, null, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    disabled: invalid,
    loading: submitting,
    type: "primary",
    onClick: handleSubmit,
    icon: /*#__PURE__*/_react.default.createElement(_icons.SearchOutlined, null)
  }, _t('Search')), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    disabled: submitting,
    onClick: resetFilter
  }, _t('Reset')))));
};
exports.NavForm = NavForm;
var FilterOpenLink = _ref3 => {
  var {
    count,
    onClick,
    show
  } = _ref3;
  var {
    _t
  } = _xadmin.app.context;
  var screens = useBreakpoint();
  return screens.xxl == false && count > 3 || count > 4 ? /*#__PURE__*/_react.default.createElement(_antd.Typography.Link, {
    onClick: onClick
  }, show ? _t('Collapse') : _t('Expand')) : null;
};
var Submenu = _ref4 => {
  var {
    children,
    invalid,
    handleSubmit,
    submitting,
    options,
    resetFilter
  } = _ref4;
  var {
    _t
  } = _xadmin.app.context;
  var defaultShowAllFilter = (0, _xadmin.config)('filter') && (0, _xadmin.config)('filter').submenuShowAllFilter == true;
  var [showAllFilter, setShowAllFilter] = _react.default.useState(defaultShowAllFilter);
  return /*#__PURE__*/_react.default.createElement(_antd.Form, {
    className: "ant-advanced-search-form",
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement(_antd.Card, {
    style: {
      marginBottom: '.5rem',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Row, {
    gutter: 8,
    style: {
      flexWrap: children.length <= 3 || showAllFilter ? 'wrap' : 'nowrap'
    }
  }, children), options && options.submitOnChange ? null : /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 24,
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Space, null, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    disabled: invalid,
    loading: submitting,
    type: "primary",
    onClick: handleSubmit,
    icon: /*#__PURE__*/_react.default.createElement(_icons.SearchOutlined, null)
  }, _t('Search')), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    disabled: submitting,
    onClick: resetFilter
  }, _t('Reset')), /*#__PURE__*/_react.default.createElement(FilterOpenLink, {
    count: children.length,
    onClick: () => setShowAllFilter(!showAllFilter),
    show: showAllFilter
  }))))));
};
exports.Submenu = Submenu;
class FilterModal extends _react.default.Component {
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
  render() {
    var {
      _t
    } = _xadmin.app.context;
    var {
      children,
      invalid,
      handleSubmit,
      submitting,
      options,
      resetFilter
    } = this.props;
    var icon = submitting ? 'spinner fa-spin' : 'floppy-o';
    var buttons = options && options.submitOnChange ? {} : {
      okText: _t('Search'),
      cancelText: _t('Reset'),
      okButtonProps: {
        disabled: invalid,
        loading: submitting,
        icon: /*#__PURE__*/_react.default.createElement(_icons.SearchOutlined, null)
      },
      onOk: () => {
        handleSubmit();
        this.onClose();
      },
      onCancel: () => {
        resetFilter();
        this.onClose();
      }
    };
    return [/*#__PURE__*/_react.default.createElement(_antd.Button, {
      key: "filter-btn",
      onClick: () => this.setState({
        show: true
      })
    }, /*#__PURE__*/_react.default.createElement(_icons.FilterOutlined, null), " ", _t('Filter')), /*#__PURE__*/_react.default.createElement(_antd.Modal, _extends({
      key: "filter-modal",
      title: _t('Filter Form'),
      visible: this.state.show
    }, buttons), /*#__PURE__*/_react.default.createElement(_antd.Form, {
      onSubmit: handleSubmit
    }, children))];
  }
}
exports.FilterModal = FilterModal;