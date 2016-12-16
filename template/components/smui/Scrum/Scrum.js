var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert(".scrum{margin:10px 0}.scrum ul{margin:0;padding:0}.scrum li{list-style:none;display:inline-block;padding:0;padding-right:15px;color:#42b983;cursor:pointer}.scrum li:last-child{color:#777}.scrum li:last-child i{display:none}")
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ui = require('../base/ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    mixins: [_ui2.default],
    params: {
        items: []
    },
    methods: {
        changeLink: function changeLink(item) {
            this.emit('link-change', item);
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=scrum><ul><li v-for=\"item in items\"><a @click=changeLink(item)>{{item.text}}</a> <i class=sm-arrow-right></i></ul></div>"
