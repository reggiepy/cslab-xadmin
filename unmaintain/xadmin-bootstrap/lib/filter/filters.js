"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Submenu = exports.NavForm = exports.FilterModal = exports.FilterForm = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _reactFontawesome = _interopRequireDefault(require("react-fontawesome"));
var _xadmin = _interopRequireDefault(require("xadmin"));
var _reactBootstrap = require("react-bootstrap");
var _xadminUi = require("xadmin-ui");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
  } = _xadmin.default.context;
  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form, {
    onSubmit: handleSubmit
  }, children, options && options.submitOnChange ? null : /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
    disabled: invalid || submitting,
    variant: "primary",
    onClick: handleSubmit
  }, _t('Search')), ' ', /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
    disabled: submitting,
    onClick: resetFilter
  }, _t('Clear'))));
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
  } = _xadmin.default.context;
  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form, {
    inline: true,
    className: "mr-3",
    onSubmit: handleSubmit
  }, children, options && options.submitOnChange ? null : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
    className: "ml-1",
    disabled: invalid || submitting,
    onClick: handleSubmit
  }, _t('Search')), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
    className: "ml-1",
    disabled: submitting,
    variant: "light",
    onClick: resetFilter
  }, _t('Clear'))));
};
exports.NavForm = NavForm;
var Submenu = _ref3 => {
  var {
    children,
    invalid,
    handleSubmit,
    submitting,
    options,
    resetFilter
  } = _ref3;
  var {
    _t
  } = _xadmin.default.context;
  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form, {
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Card, {
    className: "mb-3"
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Card.Body, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Row, null, children), options && options.submitOnChange ? null : /*#__PURE__*/_react.default.createElement(_reactBootstrap.Row, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
    style: {
      textAlign: 'center'
    },
    sm: 12
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
    disabled: invalid || submitting,
    size: "sm",
    onClick: handleSubmit
  }, _t('Search')), ' ', /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
    disabled: submitting,
    onClick: resetFilter,
    size: "sm",
    variant: "light"
  }, _t('Clear')))))));
};
exports.Submenu = Submenu;
var FilterModal = _ref4 => {
  var {
    children,
    invalid,
    handleSubmit,
    submitting,
    options,
    resetFilter
  } = _ref4;
  var [show, setShow] = _react.default.useState(false);
  var {
    _t
  } = _xadmin.default.context;
  var close = () => setShow(false);
  return [/*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
    key: "filter.model",
    onClick: () => setShow(true),
    className: "mr-1"
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
    name: "filter"
  }), " ", _t('Filter')), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal, {
    show: show,
    size: "lg",
    onHide: close
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Header, {
    closeButton: true
  }, _t('Filter Form')), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Body, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form, {
    onSubmit: handleSubmit
  }, children)), options && options.submitOnChange ? null : /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Footer, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
    key: 1,
    disabled: invalid || submitting,
    onClick: () => {
      handleSubmit();
      close();
    }
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
    name: "search"
  }), " ", _t('Search')), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
    key: 0,
    disabled: submitting,
    onClick: () => {
      resetFilter();
      close();
    },
    variant: "light"
  }, _t('Clear'))))];
};
exports.FilterModal = FilterModal;