var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert(".smui-proegress{display:inline-block}.smui-proegress progress{width:160px;height:20px;border:1px solid #0064b4;background-color:#e6e6e6;color:#0064b4}.smui-proegress progress::-moz-progress-bar{background:#0064b4}.smui-proegress progress::-webkit-progress-bar{background:#fff}.smui-proegress progress::-webkit-progress-value{background:#0064b4}")
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        value: {
            default: 50
        },
        max: {
            default: 100
        }
    },
    methods: {
        changeValue: function changeValue() {
            this.$emit('change-value', { value: this.value });
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=smui-proegress><progress :value=value :max=max @change=changeValue></progress></div>"
