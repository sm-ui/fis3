var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert(".alert .dialog{width:300px}.error{color:#c00}.prompt-content input{line-height:20px}.prompt-content.inline .text{width:50%;float:left;margin:2px 0}.prompt-content .field-tip{display:block;position:static}.prompt-content.inline button{width:30%;min-width:50px;border:1px solid #fff;background-color:#4593ff;color:#fff;float:right;margin-right:5px;border-radius:5px}")
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ui = require('../base/ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    params: {
        tip: '',
        min: 0,
        max: 9999,
        step: 0.1,
        value: '',
        error: '',
        type: 'text'
    },
    mixins: [_ui2.default],
    methods: {
        ensure: function ensure() {
            if (this.validate(this.value)) {
                this.$emit('finished', { value: this.value });
            }
        },
        changeValue: function changeValue(e) {
            this.error = '';
            var target = e.target;
            if (target && target.validationMessage) {
                this.error = target.validationMessage;
            }
            this.validate(this.value);
        },
        validate: function validate(value) {
            return true;
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=prompt-content><div v-if=tip>{{tip}}</div><input type=text @change=changeValue v-if=\"type=='text'\" :maxlength=max :minlength=min name=content v-model=value> <input type=number @change=changeValue v-if=\"type=='number'\" :max=max :min=min :step=step v-model=value><div class=error>{{error}}</div></div>"
