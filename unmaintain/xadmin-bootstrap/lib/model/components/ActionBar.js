"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _lodash = _interopRequireDefault(require("lodash"));
var _reactBootstrap = require("react-bootstrap");
var _xadmin = require("xadmin");
var _xadminModel = require("xadmin-model");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ActionBar extends _react.default.Component {
  render() {
    var count = this.props.count;
    var {
      _t
    } = _xadmin.app.context;
    return /*#__PURE__*/_react.default.createElement(_xadminModel.ModelBlock, {
      name: "model.list.actions",
      el: this
    }, actions => actions && /*#__PURE__*/_react.default.createElement(_reactBootstrap.DropdownButton, {
      className: "mb-3",
      title: count > 0 ? _t('{{count}} record selected', {
        count
      }) : _t('No data selected'),
      id: "model-list-actions",
      variant: "success",
      drop: "up"
    }, _react.default.Children.toArray(actions)));
  }
}
ActionBar.propTypes = {
  count: _propTypes.default.number.isRequired
};
var _default = exports.default = (0, _xadminModel.ModelWrap)('model.list.actions')(ActionBar);