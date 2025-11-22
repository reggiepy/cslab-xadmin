"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _reactBootstrap = require("react-bootstrap");
var _reactFontawesome = _interopRequireDefault(require("react-fontawesome"));
var _xadmin = require("xadmin");
var _xadminModel = require("xadmin-model");
var _dec, _class, _dec2, _class2, _dec3, _class3, _ColsDropdown, _dec4, _class4;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var CountButton = (_dec = (0, _xadminModel.ModelWrap)('model.list.btn.count'), _dec(_class = class CountButton extends _react.default.Component {
  render() {
    var {
      _t
    } = _xadmin.app.context;
    var {
      count
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      size: "sm",
      variant: "outline-secondary"
    }, _t('{{count}} records', {
      count
    }));
  }
}) || _class);
var PageSizeButton = (_dec2 = (0, _xadminModel.ModelWrap)('model.list.btn.pagesize'), _dec2(_class2 = class PageSizeButton extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      size: props.size
    };
  }
  setPageSize(e) {
    this.props.setPageSize(this.state.size);
    this.setState({
      show: false
    });
    if (document.all) {
      window.event.returnValue = false;
    } else {
      e.persist();
    }
  }
  showCustomize() {
    var {
      _t
    } = _xadmin.app.context;
    var {
      size,
      sizes,
      setPageSize
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal, {
      key: "size-modal",
      size: "sm",
      show: this.state.show,
      onHide: () => this.setState({
        show: false
      })
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Header, {
      closeButton: true
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Title, null, _t('Customize page size'))), /*#__PURE__*/_react.default.createElement("form", {
      onSubmit: this.setPageSize.bind(this)
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Body, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Group, {
      controlId: "formPageSize"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Label, null, _t('Page Size')), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control, {
      type: "number",
      value: this.state.size,
      placeholder: _t('Enter page size'),
      onChange: e => this.setState({
        size: e.target.value
      })
    }))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal.Footer, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      key: "close",
      variant: "outline-secondary",
      onClick: () => this.setState({
        show: false
      })
    }, _t('Close')), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      key: "submit",
      type: "submit",
      variant: "primary",
      disabled: this.state.size == size,
      onClick: this.setPageSize.bind(this)
    }, _t('Set page size')))));
  }
  render() {
    var {
      _t
    } = _xadmin.app.context;
    var {
      size,
      sizes,
      setPageSize
    } = this.props;
    return [/*#__PURE__*/_react.default.createElement(_reactBootstrap.DropdownButton, {
      key: "page-size-dropdown",
      size: "sm",
      variant: "outline-secondary",
      className: "ml-2",
      title: _t('{{size}} per page', {
        size
      }),
      id: "dropdown-size-btn"
    }, sizes.map(size => /*#__PURE__*/_react.default.createElement(_reactBootstrap.Dropdown.Item, {
      key: "size-".concat(size),
      onSelect: () => setPageSize(size),
      eventKey: "size-".concat(size)
    }, _t('Set {{size}} per page', {
      size
    }))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Dropdown.Divider, {
      key: "size-divider"
    }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Dropdown.Item, {
      key: "size-custom",
      eventKey: "cus-size",
      onSelect: () => this.setState({
        show: true
      })
    }, _t('Customize page size'))), this.state.show ? this.showCustomize() : null];
  }
}) || _class2);
var ColsDropdown = (_dec3 = (0, _xadminModel.ModelWrap)('model.list.btn.cols'), _dec3(_class3 = (_ColsDropdown = class ColsDropdown extends _react.default.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      open: false
    });
  }
  render() {
    var _this = this;
    var {
      _t
    } = _xadmin.app.context;
    var {
      selected,
      fields
    } = this.props;
    var items = [];
    var showFields = Object.keys(fields).filter(name => fields[name].showInGrid !== false);
    var menuShow = showFields.length <= 10;
    var _loop = function _loop() {
      var field = fields[name],
        fieldName = name,
        title = field.title || name,
        fieldSelected = _lodash.default.indexOf(selected, name) !== -1,
        icon = fieldSelected ? /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
          name: "check-square-o"
        }) : /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
          name: "square-o"
        }),
        onClick = e => {
          _this.props.changeFieldDisplay([fieldName, !fieldSelected]);
        };
      if (menuShow) {
        items.push(/*#__PURE__*/_react.default.createElement(_reactBootstrap.ListGroup.Item, {
          key: name,
          onClick: onClick
        }, icon, " ", title));
      } else {
        items.push(/*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
          sm: 3,
          key: name,
          style: {
            margin: '5px 0'
          }
        }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
          bsStyle: fieldSelected ? 'success' : 'default',
          block: true,
          onClick: onClick
        }, icon, " ", title)));
      }
    };
    for (var name of showFields) {
      _loop();
    }
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.OverlayTrigger, {
      trigger: "click",
      rootClose: true,
      placement: "bottom",
      overlay: /*#__PURE__*/_react.default.createElement(_reactBootstrap.Popover, {
        className: "px-0 py-0",
        style: {
          maxWidth: 800,
          maxHeight: 600,
          overflowY: 'auto'
        },
        id: "model-cols-select-popover"
      }, menuShow ? /*#__PURE__*/_react.default.createElement(_reactBootstrap.ListGroup, {
        className: "mx-0 my-0",
        variant: "flush"
      }, items) : /*#__PURE__*/_react.default.createElement(_reactBootstrap.Row, null, items))
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      size: "sm",
      className: "ml-2",
      variant: "outline-secondary"
    }, _t('Columns')));
  }
}, _defineProperty(_ColsDropdown, "propTypes", {
  selected: _propTypes.default.array.isRequired,
  fields: _propTypes.default.object.isRequired,
  changeFieldDisplay: _propTypes.default.func.isRequired
}), _ColsDropdown)) || _class3);
var SubMenu = (_dec4 = (0, _xadminModel.ModelWrap)('model.list.submenu'), _dec4(_class4 = class SubMenu extends _react.default.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.ButtonToolbar, null, /*#__PURE__*/_react.default.createElement(CountButton, null), /*#__PURE__*/_react.default.createElement(PageSizeButton, null), /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
      name: "model.list.submenu.btngroup",
      el: this
    }), /*#__PURE__*/_react.default.createElement(ColsDropdown, null), this.props.children);
  }
}) || _class4);
var _default = exports.default = SubMenu;