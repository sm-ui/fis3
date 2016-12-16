var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert(".press-tab{height:30px;display:inline-block;border:1px solid #ccc;border-radius:5px;background-color:#fff;margin:10px 18px}.press-tab a{display:inline-block;width:84px;line-height:30px;border-right:1px solid #ccc;padding:0 5px;text-align:center;background-color:#fff;float:left;color:#333;background:-webkit-linear-gradient(#fff,#ebebeb);background:linear-gradient(#fff,#ebebeb);cursor:pointer}.press-tab a.active{background:-webkit-linear-gradient(#ebebeb,#fff);background:linear-gradient(#ebebeb,#fff);cursor:auto}.press-tab a:first-child{border-radius:5px 0 0 5px;border-right:1px solid #ccc}.press-tab a:last-child{border-radius:0 5px 5px 0;border-right:0}")
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ui = require('../base/ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var params = {
    items: [],
    tab: ''
};

exports.default = {
    params: params,
    mixins: [_ui2.default],
    methods: {
        changeTab: function changeTab(tab) {
            this.tab = tab;
            this.emit('tab-change', { tab: tab });
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=press-tab><slot><a v-for=\"item in items\" :class=\"{active: value == item.name}\" @click=changeTab(item.name)>{{item.text || item.name}}</a></slot></div>"
