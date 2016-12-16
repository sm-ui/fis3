var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("@-webkit-keyframes toast-opacity{0%{opacity:0}50%{opacity:1}75%{opacity:.75}to{opacity:0}}@keyframes toast-opacity{0%{opacity:0}50%{opacity:1}75%{opacity:.75}to{opacity:0}}.toast{position:absolute;top:35%;left:30%;text-align:center;font-size:12px;padding:5px 10px;background:#eee;border:1px solid #ccc;border-radius:5px;-webkit-animation:toast-opacity 2s;animation:toast-opacity 2s}.toast.info{border:1px solid #d5f1fd;background-color:#eaf8fe}.toast.tip{border:1px solid #e7f6e1;background-color:#f3faf0;color:#777}.toast.warn{border:1px solid #fec;background-color:#fff7e6;color:#d00}.toast.error{border:1px solid #fdc;background-color:#ffeee6}")
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
        isShow: true,
        clazz: ['info']
    },
    methods: {
        show: function show(option) {
            var _this = this;

            (0, _assign2.default)(this, option);
            setTimeout(function () {
                _this.isShow = false;
            }, this.delay);
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=toast :class=clazz v-show=isShow><slot><div>{{title}}</div><div>{{message}}</div></slot></div>"
