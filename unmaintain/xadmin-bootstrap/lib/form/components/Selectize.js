"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactSelect = _interopRequireDefault(require("react-select"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var _default = _ref => {
  var {
    input,
    field
  } = _ref;
  var onValueChange = select => {
    input.onChange(select && select.value);
  };
  var onSelectBlur = _ref2 => {
    var {
      originalEvent,
      value
    } = _ref2;
    input.onBlur(value && value.value);
  };
  var onSelectFocus = _ref3 => {
    var {
      originalEvent,
      value
    } = _ref3;
    input.onFocus(value && value.value);
  };
  var options = field.titleMap;
  var value = {};
  if (input.value !== undefined && input.value !== null) {
    for (var option of options) {
      if (option.value == input.value) {
        value = {
          label: option.name != undefined ? option.name : 'null',
          value: option.value
        };
        break;
      }
    }
  }
  return /*#__PURE__*/_react.default.createElement(_reactSelect.default, _extends({
    id: input.name,
    theme: "bootstrap3",
    placeholder: field.description,
    value: value,
    clearable: false,
    options: options.map(option => {
      return {
        label: option.name != undefined ? option.name : 'null',
        value: option.value
      };
    }),
    onChange: onValueChange,
    onBlur: onSelectBlur,
    onFocus: onSelectFocus
  }, field.attrs));
};
exports.default = _default;