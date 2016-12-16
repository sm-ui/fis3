var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert(".command-list{position:relative;display:inline-block;min-width:100px;border:1px solid #ddd;border-radius:2px;cursor:pointer}.command-list .layer{min-width:86px;position:absolute;top:28px;left:0;background:#fff;z-index:777;padding:5px 0;border:1px solid #ddd}.command-list li{padding:0 10px;line-height:2em}.command-list li:hover{background-color:#eee;color:#39bd8b}.command-list:disabled{color:#eee}.command-list:disabled .layer{display:none!important}")
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ui = require('../base/ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var params = {
    value: '',
    name: '',
    title: '选择操作',
    mod: 'command',
    disabled: false,
    show: false
};

exports.default = {
    params: params,
    mixins: [_ui2.default],
    methods: {
        selectItem: function selectItem(e) {
            var target = e.target;
            if (target.tagName !== 'LI' && target.tagName !== 'A') {
                return;
            }
            this.name = target.textContent;

            if (this.mod === 'select') {
                this.title = this.name;
                this.value = target.value;
            }

            this.show = false;
            this.emit('select-change', {
                value: this.value,
                name: this.name
            });
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=\"command-list button\" @mouseleave=\"show = false\" :class=\"{disabled: disabled}\"><label class=title @click=\"show = !show\" :disabled=disabled>{{title}} <i class=\"drop-icon sm-arrow-dropdown\"></i></label><div class=layer @click=selectItem v-show=\"show &amp;&amp; !disabled\"><slot></slot></div></div>"
