"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactBootstrap = require("react-bootstrap");
var _xadmin = _interopRequireDefault(require("xadmin"));
var _xadminModel = require("xadmin-model");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ModelPagination extends _react.default.Component {
  renderPageButtons(_ref) {
    var {
      activePage,
      items,
      maxButtons,
      onSelect
    } = _ref;
    var pageButtons = [];
    var startPage;
    var endPage;
    var hasHiddenPagesAfter;
    if (maxButtons) {
      var hiddenPagesBefore = activePage - parseInt(maxButtons / 2, 10);
      startPage = Math.max(hiddenPagesBefore, 1);
      hasHiddenPagesAfter = items >= startPage + maxButtons;
      if (!hasHiddenPagesAfter) {
        endPage = items;
        startPage = items - maxButtons + 1;
        if (startPage < 1) {
          startPage = 1;
        }
      } else {
        endPage = startPage + maxButtons - 1;
      }
    } else {
      startPage = 1;
      endPage = items;
    }
    var _loop = function _loop(pagenumber) {
      pageButtons.push(/*#__PURE__*/_react.default.createElement(_reactBootstrap.Pagination.Item, {
        onClick: () => onSelect(pagenumber),
        key: pagenumber,
        active: pagenumber === activePage
      }, pagenumber));
    };
    for (var pagenumber = startPage; pagenumber <= endPage; pagenumber++) {
      _loop(pagenumber);
    }
    if (startPage !== 1) {
      pageButtons.unshift(/*#__PURE__*/_react.default.createElement(_reactBootstrap.Pagination.Ellipsis, {
        key: "ellipsisFirst",
        disabled: true
      }));
      pageButtons.unshift(/*#__PURE__*/_react.default.createElement(_reactBootstrap.Pagination.Item, {
        onClick: () => onSelect(1),
        key: 1,
        active: false
      }, "1"));
    }
    if (maxButtons && hasHiddenPagesAfter) {
      pageButtons.push(/*#__PURE__*/_react.default.createElement(_reactBootstrap.Pagination.Ellipsis, {
        key: "ellipsis",
        disabled: true
      }));
      if (endPage !== items) {
        pageButtons.push(/*#__PURE__*/_react.default.createElement(_reactBootstrap.Pagination.Item, {
          onClick: () => onSelect(items),
          key: items,
          active: false
        }, items));
      }
    }
    return pageButtons;
  }
  render() {
    var {
      _t
    } = _xadmin.default.context;
    var {
      emptyComponent,
      items,
      activePage,
      maxButtons = 6,
      changePage
    } = this.props;
    var c = num => () => changePage(num);
    var pages = [];
    for (var i = 1; i <= items; i++) {
      pages.push(/*#__PURE__*/_react.default.createElement(_reactBootstrap.Pagination.Item, {
        active: activePage == i,
        onClick: c(i)
      }, i));
    }
    var onSelect = page => changePage(page);
    if (items > 1) {
      return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Pagination, {
        size: this.props.size || '',
        className: this.props.className
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Pagination.Prev, {
        disabled: activePage == 1,
        onClick: activePage == 1 ? () => {} : c(activePage - 1)
      }), this.renderPageButtons({
        activePage,
        items,
        maxButtons,
        onSelect
      }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Pagination.Next, {
        disabled: activePage == items,
        onClick: activePage == items ? () => {} : c(activePage + 1)
      }));
    } else {
      return emptyComponent !== undefined ? emptyComponent : /*#__PURE__*/_react.default.createElement(_reactBootstrap.Pagination, {
        size: this.props.size || '',
        className: this.props.className
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Pagination.Item, {
        disabled: true
      }, _t('No paging')));
    }
  }
}
ModelPagination.propTypes = {
  bsSize: _propTypes.default.string,
  items: _propTypes.default.number,
  activePage: _propTypes.default.number,
  changePage: _propTypes.default.func
};
var _default = exports.default = (0, _xadminModel.ModelWrap)('model.list.pagination')(ModelPagination);