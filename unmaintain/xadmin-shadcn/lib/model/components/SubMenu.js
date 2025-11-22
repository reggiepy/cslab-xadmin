"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _icons = require("@ant-design/icons");
var _xadmin = require("xadmin");
var _xadminI18n = require("xadmin-i18n");
var _xadminModel = require("xadmin-model");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var CountButton = () => {
  var {
    count
  } = (0, _xadmin.use)('model.count');
  return /*#__PURE__*/_react.default.createElement(_antd.Button, null, (0, _xadminI18n._t)('{{count}} records', {
    count
  }));
};
var PageSizeButton = () => {
  var {
    size,
    sizes,
    setPageSize
  } = (0, _xadmin.use)('model.pagesize');
  var [visible, setVisible] = _react.default.useState(false);
  var [inputSize, setInputSize] = _react.default.useState('');
  var input = /*#__PURE__*/_react.default.createRef();
  var onSetPageSize = size => {
    setPageSize(size);
    setVisible(false);
  };
  var onInputSize = e => {
    if (e.key == 'Enter') {
      var _size = parseInt(inputSize);
      onSetPageSize(_size);
      setInputSize('');
    }
    e.persist();
  };
  return /*#__PURE__*/_react.default.createElement(_antd.Dropdown, {
    key: "page-size-dropdown",
    onVisibleChange: setVisible,
    visible: visible,
    overlay: /*#__PURE__*/_react.default.createElement(_antd.Menu, null, sizes.map(size => /*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
      key: "size-".concat(size),
      onClick: () => setPageSize(size),
      eventKey: "size-".concat(size)
    }, (0, _xadminI18n._t)('Set {{size}} per page', {
      size
    }))), /*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
      key: "size-custom"
    }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
      placeholder: (0, _xadminI18n._t)('Customize page size'),
      value: inputSize,
      onChange: e => setInputSize(e.target.value),
      precision: 0,
      onKeyPress: onInputSize,
      style: {
        width: 100
      }
    })))
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, null, (0, _xadminI18n._t)('{{size}} per page', {
    size
  })));
};
var ColsDropdown = () => {
  var {
    selected,
    fields,
    changeFieldDisplay
  } = (0, _xadmin.use)('model.fields');
  var items = [];
  var showFields = Object.keys(fields).filter(name => fields[name].showInList !== false);
  var menuShow = showFields.length <= 10;
  var _loop = function _loop() {
    var field = fields[name],
      fieldName = name,
      title = field.title || name,
      fieldSelected = _lodash.default.indexOf(selected, name) !== -1,
      onClick = e => {
        changeFieldDisplay([fieldName, e.target.checked]);
      },
      onClickBtn = () => {
        changeFieldDisplay([fieldName, !fieldSelected]);
      };
    if (menuShow) {
      items.push(/*#__PURE__*/_react.default.createElement(_antd.Checkbox, {
        key: name,
        onChange: onClick,
        checked: fieldSelected
      }, title));
    } else {
      items.push(/*#__PURE__*/_react.default.createElement(_antd.Col, {
        span: 3,
        key: name,
        style: {
          margin: '5px 0'
        }
      }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
        type: fieldSelected ? 'primary' : 'default',
        block: true,
        onClick: onClickBtn
      }, title)));
    }
  };
  for (var name of showFields) {
    _loop();
  }
  return /*#__PURE__*/_react.default.createElement(_antd.Popover, {
    placement: "bottomRight",
    overlayStyle: {
      maxWidth: '80%'
    },
    content: menuShow ? items : /*#__PURE__*/_react.default.createElement(_antd.Row, {
      gutter: 12
    }, items),
    trigger: "click"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "text"
  }, /*#__PURE__*/_react.default.createElement(_icons.SettingOutlined, null)));
};
var _default = _ref => {
  var {
    children
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_antd.Space, null, /*#__PURE__*/_react.default.createElement(CountButton, null), /*#__PURE__*/_react.default.createElement(PageSizeButton, null), /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
    name: "model.list.submenu.btngroup"
  }), /*#__PURE__*/_react.default.createElement(ColsDropdown, null), children);
};
exports.default = _default;