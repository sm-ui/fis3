var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert(".select-wrapper{position:relative;display:inline-block;box-sizing:border-box}.select-wrapper .select-tip{position:absolute;top:0;left:0;line-height:30px;padding:0 10px;color:#999}.select-wrapper .drop-icon{position:absolute;right:8px;top:10px;font-size:12px;color:#777}.select-wrapper .select{padding:0 10px;padding-right:25px;background-color:transparent;box-sizing:border-box;border:1px solid #c0c8c9;border-radius:4px;position:relative;background-repeat:no-repeat;background-size:1.5rem 1rem;background-position:100%;font:inherit;color:inherit;z-index:3;height:28px;-webkit-appearance:none;-moz-appearance:none;appearance:none}.select-wrapper .select:focus{outline:none}")
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
        var uid = (Math.random().toFixed(3) * 1000).toString(32);
        return {
            uiId: 'select_' + uid,
            name: '',
            items: [],
            value: ''
        };
    },

    watch: {
        'params.items': function paramsItems(value) {
            this.items = value;
        }
    },
    methods: {
        getValue: function getValue() {
            return this.value;
        },
        changeValue: function changeValue() {
            this.emit('value-change', { value: this.value });
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=select-wrapper><div v-if=\"name &amp;&amp; !value\" class=select-tip>{{name}}</div><select v-model=value class=select :id=uiId v-on:change=changeValue><option v-for=\"item in items\" v-bind:value=item.value>{{item.name}}</select><i class=\"drop-icon sm-arrow-dropdown\" :for=uiId></i></div>"
