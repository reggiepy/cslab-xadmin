"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _components = require("./components");
var _groups = require("./components/groups");
var _layout = require("./components/layout");
var _default = exports.default = {
  components: {
    'Form.Layout': _layout.FormLayout,
    'Form.ModalLayout': _layout.ModalLayout,
    'Form.FieldGroup': _groups.FieldGroup,
    'Form.InlineGroup': _groups.InlineGroup,
    'Form.SimpleGroup': _groups.SimpleGroup,
    'Form.ColGroup': _groups.ColGroup
  },
  form_fields: {
    text: {
      component: _components.Text
    },
    textarea: {
      component: _components.Textarea
    },
    number: {
      component: _components.Text,
      normalize: (value, previousValue) => {
        var ret = parseFloat(value);
        return Number.isNaN(ret) ? value : ret;
      },
      attrs: {
        type: 'number',
        style: {
          maxWidth: 200
        }
      }
    },
    integer: {
      component: _components.Text,
      normalize: (value, previousValue) => {
        var ret = parseInt(value);
        return Number.isNaN(ret) ? value : ret;
      },
      attrs: {
        type: 'number',
        style: {
          maxWidth: 200
        }
      }
    },
    select: {
      component: _components.Select
    },
    numselect: {
      component: _components.Select,
      normalize: (value, previousValue) => {
        var ret = parseFloat(value);
        return Number.isNaN(ret) ? value : ret;
      }
    },
    date: {
      component: _components.DateTime,
      normalize: (value, previousValue) => {
        return value && value.format ? value.format('YYYY-MM-DD') : value || previousValue;
      },
      attrs: {
        dateFormat: true,
        timeFormat: false,
        valueFormat: 'L'
      }
    },
    time: {
      component: _components.DateTime,
      normalize: (value, previousValue) => {
        return value && value.format ? value.format('HH:mm:ss') : value || previousValue;
      },
      attrs: {
        dateFormat: false,
        timeFormat: true,
        viewMode: 'time',
        valueFormat: 'LT'
      }
    },
    datetime: {
      component: _components.DateTime,
      normalize: (value, previousValue) => {
        return value && value.format ? value.format('YYYY-MM-DD HH:mm:ss') : value || previousValue;
      },
      attrs: {
        dateFormat: true,
        timeFormat: true,
        valueFormat: 'L LT'
      }
    },
    bool: {
      component: _components.Checkbox,
      normalize: (value, previousValue) => {
        return Boolean(value);
      }
    },
    checkbox: {
      component: _components.Checkbox
    },
    fieldset: {
      component: _components.Fieldset
    },
    array: {
      component: _components.ArrayWidget
    }
  }
};