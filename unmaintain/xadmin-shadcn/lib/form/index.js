"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _components = require("./components");
var _DatePicker = _interopRequireDefault(require("./components/DatePicker"));
var _TimePicker = _interopRequireDefault(require("./components/TimePicker"));
var _DatetimePicker = _interopRequireDefault(require("./components/DatetimePicker"));
var _Array = _interopRequireDefault(require("./components/Array"));
var _Fieldset = _interopRequireDefault(require("./components/Fieldset"));
var _base = require("./components/base");
var _layout = require("./components/layout");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = {
  components: {
    'Form.Layout': _layout.FormLayout,
    'Form.ModalLayout': _layout.ModalLayout,
    'Form.FieldGroup': _base.FieldGroup,
    'Form.InlineGroup': _base.InlineGroup,
    'Form.SimpleGroup': _base.SimpleGroup,
    'Form.ColGroup': _base.ColGroup
  },
  form_fields: {
    text: {
      component: _components.Text,
      parse: value => value === '' ? null : value
    },
    textarea: {
      component: _components.Textarea,
      parse: value => value === '' ? null : value
    },
    number: {
      component: _components.Text,
      parse: value => {
        return value === '' || value == null ? null : parseFloat(value);
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
      parse: value => {
        return value === '' || value == null ? null : parseFloat(value);
      },
      attrs: {
        type: 'number',
        style: {
          maxWidth: 200
        }
      }
    },
    select: {
      component: _components.Select,
      parse: value => value
    },
    numselect: {
      component: _components.Select,
      parse: value => {
        return value === '' || value == null ? null : parseFloat(value);
      }
    },
    date: {
      component: _DatePicker.default
    },
    datetime: {
      component: _DatetimePicker.default
    },
    time: {
      component: _TimePicker.default
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
    transfer: {
      component: _components.Transfer
    },
    fieldset: {
      component: _Fieldset.default
    },
    array: {
      component: _Array.default
    }
  }
};