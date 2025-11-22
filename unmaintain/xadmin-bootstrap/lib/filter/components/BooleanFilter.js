"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _xadmin = _interopRequireDefault(require("xadmin"));
var _reactBootstrap = require("react-bootstrap");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class BooleanFilter extends _react.default.Component {
  render() {
    var {
      input: {
        name,
        value,
        onChange
      },
      field
    } = this.props;
    var {
      _t
    } = _xadmin.default.context;
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.ButtonGroup, field.attrs, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      bsStyle: value === true ? 'success' : 'default',
      onClick: () => {
        onChange(value === true ? null : true);
      }
    }, field.boolLabel ? field.boolLabel[0] : _t('True')), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      bsStyle: value === false ? 'success' : 'default',
      onClick: () => {
        onChange(value === false ? null : false);
      }
    }, field.boolLabel ? field.boolLabel[1] : _t('False')));
  }
}
exports.default = BooleanFilter;