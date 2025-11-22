"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _xadmin = _interopRequireDefault(require("xadmin"));
var _xadminI18n = _interopRequireDefault(require("xadmin-i18n"));
var _xadminForm = _interopRequireDefault(require("xadmin-form"));
var _xadminUi = _interopRequireDefault(require("xadmin-ui"));
var _xadminModel = _interopRequireDefault(require("xadmin-model"));
var _xadminAuth = _interopRequireDefault(require("xadmin-auth"));
var _relate = _interopRequireDefault(require("xadmin-model/lib/relate"));
var _filter = _interopRequireDefault(require("xadmin-model/lib/filter"));
var _actions = _interopRequireDefault(require("xadmin-model/lib/actions"));
var _search = _interopRequireDefault(require("xadmin-model/lib/search"));
var _modalform = _interopRequireDefault(require("xadmin-model/lib/modalform"));
var _reldetail = _interopRequireDefault(require("xadmin-model/lib/reldetail"));
var _loading = _interopRequireDefault(require("xadmin-ui/lib/loading"));
var _splashscreen = _interopRequireDefault(require("xadmin-ui/lib/splashscreen"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = _xadmin.default.use(_xadminI18n.default).use(_xadminUi.default).use(_xadminForm.default).use(_xadminModel.default).use(_xadminAuth.default).use(_relate.default).use(_filter.default).use(_search.default).use(_loading.default).use(_modalform.default).use(_actions.default).use(_reldetail.default).use(_splashscreen.default);