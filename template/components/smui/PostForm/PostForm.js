var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert(".post-form{position:relative}.post-form input,.post-form textarea{outline:none;border:1px solid #bbb}.post-form .on input:invalid{border:1px solid red}.post-form .on textarea:valid{border:1px solid green}.post-form .on textarea:invalid{border:1px solid red}.post-form .on input:disabled{border:1px solid #ccc}")
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ui = require('../base/ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    params: {
        autoCheck: false,
        message: '',
        mod: 'add'
    },
    mixins: [_ui2.default],
    ready: function ready() {
        if (this.form) {
            return;
        }
        this.form = this.$el;
        if (this.$el.querySelector) {
            this.form = this.$el.querySelector('form');
            this.form.onsubmit = this.submit.bind(this);
        }
        if (this.mod === 'edit') {
            this.validate();
        }
    },
    methods: {
        validate: function validate(input) {
            var _this = this;

            var fields = this.form.querySelectorAll('.field');
            this.errorMessage = '';

            fields = Array.prototype.slice.call(fields);
            fields.forEach(function (field) {
                field.validate && field.validate();
                if (!field.validity.valid && !_this.errorMessage) {
                    _this.errorMessage = field.validationMessage;
                }
            });
            if (this.errorMessage) {
                return false;
            }
            return true;
        },
        sendQuery: function sendQuery() {},
        submit: function submit(e) {
            e.preventDefault();
            if (!this.validate()) {
                this.showError();
            } else {
                this.sendQuery();
            }
            return false;
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=post-form><form><slot></slot></form><div class=error>{{message}}</div></div>"
