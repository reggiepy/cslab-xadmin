"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _xadminForm = require("xadmin-form");
var _lucideReact = require("lucide-react");
var _button = require("../../components/ui/button");
var _card = require("../../components/ui/card");
var _xadmin = _interopRequireDefault(require("xadmin"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var defaultItemsRender = _ref => {
  var {
    fields,
    meta: {
      touched,
      error
    },
    field,
    fieldsBuilder
  } = _ref;
  var {
    items,
    label
  } = field;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "space-y-4 flex flex-col"
  }, /*#__PURE__*/_react.default.createElement(_button.Button, {
    type: "button",
    onClick: () => fields.push(null)
  }, /*#__PURE__*/_react.default.createElement(_lucideReact.PlusIcon, null)), fields.map((name, index) => {
    var removeBtn = /*#__PURE__*/_react.default.createElement(_button.Button, {
      type: "button",
      variant: "ghost",
      onClick: e => {
        fields.remove(index);
        e.persist();
      }
    }, /*#__PURE__*/_react.default.createElement(_lucideReact.TrashIcon, null));
    var fieldsComponent = fieldsBuilder(name, index, removeBtn);
    return fieldsComponent.length > 1 ? /*#__PURE__*/_react.default.createElement(_card.Card, null, /*#__PURE__*/_react.default.createElement(_card.CardHeader, null, /*#__PURE__*/_react.default.createElement(_card.CardTitle, null, label + ' ' + (index + 1), " ", removeBtn)), /*#__PURE__*/_react.default.createElement(_card.CardContent, {
      className: "space-y-6"
    }, fieldsComponent)) : fieldsComponent;
  }), touched && error ? error : null);
};
var _default = _ref2 => {
  var {
    input,
    label,
    meta,
    field,
    option,
    group
  } = _ref2;
  var renderItems = field.itemsRender || defaultItemsRender;
  if (typeof renderItems === 'string') {
    renderItems = _xadmin.default.load_dict('array_render')[renderItems];
  }
  var {
    items
  } = field;
  var fieldsBuilder = (name, index, removeBtn, itemLable) => {
    var itemLabel = itemLable || /*#__PURE__*/_react.default.createElement("div", null, removeBtn ? removeBtn : '');
    var itemFields = items.fields ? items.fields.map(f => (0, _xadminForm.prefixFieldKey)(f, name + '.')) : [_objectSpread(_objectSpread({}, items), {}, {
      key: name,
      name: name,
      label: itemLabel
    })];
    return (0, _xadminForm.objectBuilder)(itemFields, items.render, option);
  };
  return /*#__PURE__*/_react.default.createElement(_xadminForm.FieldArray, {
    name: field.name,
    label: label,
    meta: meta,
    input: input,
    component: renderItems,
    field: field,
    group: group,
    fieldsBuilder: fieldsBuilder
  });
};
exports.default = _default;