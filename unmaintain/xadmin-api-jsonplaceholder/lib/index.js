"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));
var _xadmin = require("xadmin");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class API extends _xadmin.RESTBaseAPI {
  getHost() {
    return 'https://jsonplaceholder.typicode.com/';
  }
  fetch(id, options) {
    return (0, _isomorphicFetch.default)(this.getHost() + this.resource + (id ? '/' + id : ''), options).then(resp => {
      return resp.json();
    }).catch(console.error);
  }
}
exports.default = API;