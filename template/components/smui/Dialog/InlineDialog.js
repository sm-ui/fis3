'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require('../DialogPanel/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    extends: _index2.default,
    data: function data() {
        return {
            clazz: ['dialog', 'inline'],
            isModal: false
        };
    },

    methods: {
        close: function close() {
            this.$emit('closing');
            if (this.$el) {
                this.$el.style.display = 'none';
            }

            if (this.$dialog.open) {
                this.$dialog.close();
            }
            this.$emit('closed');
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=\"dialog-panel comp\" data-comp=dialog :class=clazz><dialog-element :params=\"{native: native, style: dialogStyle, width: width, height: height}\" v-ref:dialog=\"\"><div class=\"close rotate sm-close\" @click=close v-if=needClose></div><div class=dialog-wrapper :class=\"{'pad-bottom': needFooter}\"><div class=header><slot name=title></slot></div><div class=content><slot name=content></slot></div><div class=footer><slot name=footer><div class=default-bottom><button class=\"button ensure-button\" @click=ensure>{{ensureText}}</button> <button class=\"button cancel-button\" @click=close v-if=needCancel>{{cancelText}}</button></div></slot></div></div></dialog-element></div>"
