var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert(".popup{position:fixed;z-index:9999;bottom:10px;right:10px;padding:10px;font-size:12px;border:1px solid #ccc;border-radius:5px;min-width:250px;background:#fff}.popup .close{position:absolute;top:5px;right:5px}.popup .title{background:#eee;border-bottom:1px solid #ccc;line-height:2em;padding-left:10px}.popup .content{padding:40px 10px 20px;min-height:30px;max-width:300px}.popup .footer{height:40px}.popup .close-button{float:right;color:#fff;border:1px solid #39bd8b;background:-webkit-linear-gradient(rgba(57,189,139,.7),#39bd8b);background:linear-gradient(rgba(57,189,139,.7),#39bd8b)}")
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _ui = require('../base/ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    mixins: [_ui2.default],
    params: {
        message: '',
        title: '',
        delay: 2000,
        needClose: false,
        isShow: false
    },
    methods: {
        show: function show(option) {
            var _this = this;

            (0, _assign2.default)(this, option);
            this.isShow = true;
            if (this.delay !== false) {
                setTimeout(function () {
                    _this.isShow = false;
                }, this.delay);
            }
        },
        close: function close() {
            this.isShow = false;
            this.emit('close');
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=popup :class=clazz v-if=isShow><i class=\"sm-close close\" @click=close></i><div class=title v-if=title>{{title}}</div><div class=content v-html=message></div><div class=footer v-if=needClose><div class=\"close-button button\" @click=close>关闭</div></div></div>"
