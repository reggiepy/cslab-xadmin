"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _xadmin = require("xadmin");
var _lodash = _interopRequireDefault(require("lodash"));
var _xadminI18n = require("xadmin-i18n");
var _icons = require("@ant-design/icons");
var _antd = require("antd");
var _excluded = ["name", "onBlur", "onChange"],
  _excluded2 = ["name", "onBlur", "onChange"],
  _excluded3 = ["input"],
  _excluded4 = ["option"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Search = _antd.Input.Search;
var useTextFilter = _ref => {
  var {
    input
  } = _ref;
  var {
    form
  } = (0, _xadmin.use)('form');
  var value = input.value;
  var like = null;
  if (value == null || value == undefined || value == '') {
    value = '';
    like = (0, _xadmin.config)('filter') && (0, _xadmin.config)('filter').textDefaultSearch == true;
  } else if (value && value.like !== undefined) {
    value = value.like;
    like = true;
  } else {
    like = false;
  }
  var onChange = _ref2 => {
    var {
      value,
      like
    } = _ref2;
    if (like) {
      input.onChange({
        like: value
      });
    } else {
      input.onChange(value);
    }
  };
  var onValueChange = value => {
    if (like) {
      input.onChange({
        like: value
      });
    } else {
      input.onChange(value);
    }
  };
  var onLikeChange = like => {
    if (like) {
      input.onChange({
        like: value
      });
    } else {
      input.onChange(value);
    }
  };
  var onKeyPress = e => {
    if (e.key === 'Enter') {
      form.submit();
    }
  };
  var clear = () => onValueChange(null);
  var changeModeBtn = /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: (0, _xadminI18n._t)('Exact Search')
  }, /*#__PURE__*/_react.default.createElement(_antd.Typography.Text, {
    type: !like ? 'success' : 'secondary',
    onClick: () => onLikeChange(!like),
    style: {
      cursor: 'pointer'
    }
  }, value == null || value == undefined || value == '' ? null : /*#__PURE__*/_react.default.createElement(_icons.AimOutlined, null)));
  return {
    like,
    value,
    onChange,
    onValueChange,
    onLikeChange,
    onKeyPress,
    clear,
    changeModeBtn
  };
};
var TextFilter = props => {
  var {
      input: {
        name,
        onBlur,
        onChange
      },
      label,
      field
    } = props,
    inputProps = _objectWithoutProperties(props.input, _excluded);
  var {
    value,
    changeModeBtn,
    onValueChange,
    onKeyPress
  } = useTextFilter(props);
  return /*#__PURE__*/_react.default.createElement(_antd.Input, _extends({}, inputProps, field.attrs, {
    value: value,
    suffix: changeModeBtn,
    onChange: e => onValueChange(e.target.value),
    onKeyPress: onKeyPress,
    placeholder: (0, _xadminI18n._t)('Search {{label}}', {
      label
    })
  }));
};
var SearchTextFilter = props => {
  var {
      input: {
        name,
        onBlur,
        onChange
      },
      onSubmit,
      label,
      field
    } = props,
    inputProps = _objectWithoutProperties(props.input, _excluded2);
  var {
    value,
    changeModeBtn,
    onValueChange
  } = useTextFilter(props);
  return /*#__PURE__*/_react.default.createElement(Search, _extends({}, inputProps, field.attrs, {
    value: value,
    suffix: changeModeBtn,
    onChange: e => onValueChange(e.target.value),
    onSearch: value => {
      onValueChange(value);
      onSubmit && onSubmit();
    },
    placeholder: (0, _xadminI18n._t)('Search {{label}}', {
      label
    })
  }));
};
var SubmitOnChangeWrap = _ref3 => {
  var {
      input
    } = _ref3,
    props = _objectWithoutProperties(_ref3, _excluded3);
  var [state, setState] = _react.default.useState({
    value: null,
    typing: false
  });
  _react.default.useEffect(() => {
    if (!state.typing) {
      setState({
        value: input.value,
        typing: false
      });
    }
  }, [input.value]);
  var onSubmit = () => {
    input.onChange(state.value);
    setState(_objectSpread(_objectSpread({}, state), {}, {
      typing: false
    }));
  };
  var onChange = value => setState({
    value,
    typing: true
  });
  return /*#__PURE__*/_react.default.createElement(SearchTextFilter, _extends({
    input: _objectSpread(_objectSpread({}, input), {}, {
      onChange: onChange,
      value: state.value
    })
  }, props, {
    onSubmit: onSubmit
  }));
};
var _default = _ref4 => {
  var {
      option
    } = _ref4,
    props = _objectWithoutProperties(_ref4, _excluded4);
  var submitOnChange = option && option.options && option.options.submitOnChange;
  return submitOnChange ? /*#__PURE__*/_react.default.createElement(SubmitOnChangeWrap, _extends({}, props, {
    option: option
  })) : /*#__PURE__*/_react.default.createElement(TextFilter, _extends({}, props, {
    option: option
  }));
};
exports.default = _default;