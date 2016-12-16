var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert(".tree-wrapper ul{margin-left:1rem;list-style-type:none;padding:10px}.tree-wrapper .list-icon{display:inline;margin-right:10px;color:#777}.tree-wrapper li{position:relative;cursor:pointer;box-sizing:border-box}.tree-wrapper li span{text-decoration:none;color:#777;font-size:14px;display:inline-block;margin-left:15px;width:100%}.tree-wrapper li span:hover{color:#42b983}.tree-wrapper li i{color:#777;position:absolute;top:4px;font-size:.6em}.tree-wrapper .expand-transition{-webkit-transition:all .7s ease;transition:all .7s ease;height:auto;padding:10px}.tree-wrapper .expand-enter,.tree-wrapper .expand-leave{height:0;padding:0 10px;opacity:0}")
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ui = require('../base/ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var params = {
    clazz: ['tree-list'],
    items: [],
    title: '',
    showItem: ''
};

exports.default = {
    name: 'tree-node',
    params: params,
    mixins: [_ui2.default],
    methods: {
        toggle: function toggle(item) {
            var node = this.$el.querySelector('#node-' + item.id);
            var display = item.fold ? 'block' : 'none';
            item.fold = !item.fold;
            if (node) {
                node.style.display = display;
            }
            this.emit('toggle', item);
        },
        clickItem: function clickItem(item) {
            this.emit('item-clicked', item);
        },
        clickSub: function clickSub(e) {
            this.emit('item-clicked', e.data);
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=tree-wrapper><ul :class=clazz><li v-for=\"item in items\" class=tree-item><div :data-id=item.id><i v-if=item.children @click=toggle(item) class=sm-add></i> <i v-else=item.children class=sm-plan></i> <span @click=clickItem(item) class=item>{{item.name}}</span></div><div :id=\"'node-' + item.id\"><tree-node :params=\"{items: item.children}\" @item-clicked=clickSub v-if=item.children></tree-node></div></ul></div>"
