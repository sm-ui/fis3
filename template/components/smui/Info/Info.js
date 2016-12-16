var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert(".info-sign{position:relative;line-height:1.5em;padding:5px 0;display:inline}.info-sign .info{box-sizing:border-box;position:absolute;background:#fff;display:block;top:32px;left:-102px;width:216px;padding:8px 16px;border:1px solid rgba(34,36,38,.2);border-radius:4px;box-shadow:0 2px 3px rgba(34,36,38,.15);color:#333;font-size:13px;font-weight:400;line-height:1.8;z-index:999}.info-sign .info:after,.info-sign .info:before{content:\"\";position:absolute;left:102px;border:6px solid transparent;border-bottom-width:10px}.info-sign .info:before{top:-17px;border-bottom-color:rgba(34,36,38,.2)}.info-sign .info:after{top:-16px;border-bottom-color:#fff}")
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ui = require('../base/ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    mixins: [_ui2.default],
    data: function data() {
        return {
            show: false,
            auto: false,
            content: '信息'
        };
    },

    methods: {
        showInfo: function showInfo() {
            this.show = true;
        },
        hideInfo: function hideInfo() {
            this.show = false;
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=info-sign v-on:mouseover=showInfo v-on:mouseout=hideInfo><i class=sm-question @click=showInfo></i><div class=info v-show=\"auto || show\"><slot>{{content}}</slot></div></div>"
