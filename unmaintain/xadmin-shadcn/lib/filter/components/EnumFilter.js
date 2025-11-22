"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _antd = require("antd");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var FilterEnum = props => {
  var {
    input: {
      value,
      onChange
    },
    field
  } = props;
  var placeholder = field && field.placeholder;
  var titleMap = field && field.titleMap;
  var selectChange = values => {
    var v = null;
    if (values.length > 1) {
      v = {
        $in: values
      };
    } else if (values.length > 0) {
      v = values[0];
    }
    onChange(v);
  };
  var seleted = [];
  // 初始化value
  if (value && value != '') {
    if (_lodash.default.isString(value)) seleted = [value];
    if (_lodash.default.isObject(value)) seleted = value.$in;
  }
  return /*#__PURE__*/_react.default.createElement(_antd.Select, {
    mode: "multiple",
    style: {
      width: '100%'
    },
    placeholder: placeholder ? placeholder : '请选择',
    value: seleted,
    onChange: selectChange
  }, titleMap && titleMap.length > 0 && titleMap.map(item => {
    return /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
      key: item.value
    }, item.name);
  }));
};
var _default = exports.default = FilterEnum;