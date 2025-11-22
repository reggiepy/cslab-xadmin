"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _reactBootstrap = require("react-bootstrap");
var _reactFontawesome = _interopRequireDefault(require("react-fontawesome"));
var _xadmin = _interopRequireDefault(require("xadmin"));
var _xadminModel = require("xadmin-model");
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var SearchBar = (_dec = (0, _xadminModel.ModelWrap)('model.searchbar'), _dec(_class = class SearchBar extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: props.searchValue || ''
    };
  }
  onSearch(e) {
    this.props.onSearch(this.state.value || '');
    event.preventDefault();
  }
  onClean(e) {
    this.setState({
      value: ''
    });
    this.props.onSearch('');
  }
  onKeyPress(e) {
    if (e.keyCode == 13) {
      this.onSearch(e);
    }
  }
  render() {
    var {
      _t
    } = _xadmin.default.context;
    var {
      searchValue,
      searchTitles
    } = this.props;
    if (searchTitles && searchTitles.length > 0) {
      var placeholder = _t('Search') + ' ' + searchTitles.join(', ');
      return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form, {
        inline: true,
        onSubmit: this.onSearch.bind(this)
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.InputGroup, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control, {
        value: this.state.value,
        onKeyPress: this.onKeyPress.bind(this),
        placeholder: placeholder,
        onChange: e => {
          this.setState({
            value: e.target.value
          });
        }
      }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.InputGroup.Append, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        type: "submit"
      }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
        name: "search"
      })))));
    }
    return null;
  }
}) || _class);
var _default = exports.default = SearchBar;