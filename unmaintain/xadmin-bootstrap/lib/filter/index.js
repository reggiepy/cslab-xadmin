"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _components = require("./components");
var _filters = require("./filters");
var _default = exports.default = {
  components: {
    'Filter.Form': _filters.FilterForm,
    'Filter.NavForm': _filters.NavForm,
    'Filter.Submenu': _filters.Submenu,
    'Filter.Modal': _filters.FilterModal
  },
  form_fields: {
    filter_text: {
      component: _components.TextFilter
    },
    filter_enum: {
      component: _components.EnumFilter
    },
    filter_number: {
      component: _components.NumberFilter
    },
    filter_bool: {
      component: _components.BooleanFilter
    },
    filter_date: {
      component: _components.DateFilter
    },
    filter_datetime: {
      component: _components.DateFilter
    }
  }
};