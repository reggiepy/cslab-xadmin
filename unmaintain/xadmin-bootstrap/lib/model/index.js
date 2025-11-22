"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Pages = require("./components/Pages");
var _Pagination = _interopRequireDefault(require("./components/Pagination"));
var _SubMenu = _interopRequireDefault(require("./components/SubMenu"));
var _Items = require("./components/Items");
var _Form = _interopRequireDefault(require("./components/Form"));
var _Info = _interopRequireDefault(require("./components/Info"));
var _DetailModal = _interopRequireDefault(require("./components/DetailModal"));
var _SearchBar = _interopRequireDefault(require("./components/SearchBar"));
var _BatchDelete = _interopRequireDefault(require("./actions/BatchDelete"));
var _BatchChange = _interopRequireDefault(require("./actions/BatchChange"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = {
  components: {
    'Model.ListPage': _Pages.ModelListPage,
    'Model.FormPage': _Pages.ModelFormPage,
    'Model.DetailPage': _Pages.ModelDetailPage,
    'Model.Pagination': _Pagination.default,
    'Model.ListSubMenu': _SubMenu.default,
    'Model.DataTable': _Items.DataTable,
    'Model.DataList': _Items.DataList,
    'Model.DataForm': _Form.default,
    'Model.DataDetail': _Info.default,
    'Model.DataItem': _Items.Item,
    'Model.DetailModal': _DetailModal.default,
    'Model.SearchBar': _SearchBar.default,
    'Model.BatchChange': _BatchChange.default,
    'Model.BatchDelete': _BatchDelete.default
  }
};