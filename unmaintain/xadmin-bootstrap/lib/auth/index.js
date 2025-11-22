"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _SignIn = _interopRequireDefault(require("./components/SignIn"));
var _SignUp = _interopRequireDefault(require("./components/SignUp"));
var _UserMenu = _interopRequireDefault(require("./components/UserMenu"));
var _CaptchaCodeInput = _interopRequireDefault(require("./components/CaptchaCodeInput"));
var _ChangePassword = _interopRequireDefault(require("./components/ChangePassword"));
var _ForgetPassword = _interopRequireDefault(require("./components/ForgetPassword"));
var _ResetPassword = _interopRequireDefault(require("./components/ResetPassword"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = {
  components: {
    'Auth.Signin': _SignIn.default,
    'Auth.Signup': _SignUp.default,
    'Auth.UserMenu': _UserMenu.default,
    'Auth.ChangePassword': _ChangePassword.default,
    'Auth.ForgetPassword': _ForgetPassword.default,
    'Auth.ResetPassword': _ResetPassword.default
  },
  form_fields: {
    captcha: {
      component: _CaptchaCodeInput.default
    }
  }
};