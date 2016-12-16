var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert(".loading-box.mask{background:rgba(0,0,0,.2)}.loading-box.full{position:fixed}.loading-box{position:absolute;width:100%;height:100%;z-index:10001;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.01)}.loading-box .close{font-size:1.5em}.loading-box i.content{font-size:3em;color:#87cefa;margin-left:-20px;margin-top:-20px}.loading-box div.content{width:100%;left:0;text-align:center}.loading-box .content{position:absolute;left:50%;top:50%}.loading-box .close{position:absolute;top:5px;right:5px}.loading-box .sm-loading{-webkit-animation:loading 1s infinite step-start;animation:loading 1s infinite step-start}@-webkit-keyframes loading{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}12.5%{-webkit-transform:rotate(45deg);transform:rotate(45deg)}25%{-webkit-transform:rotate(90deg);transform:rotate(90deg)}37.5%{-webkit-transform:rotate(135deg);transform:rotate(135deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}62.5%{-webkit-transform:rotate(225deg);transform:rotate(225deg)}75%{-webkit-transform:rotate(270deg);transform:rotate(270deg)}87.5%{-webkit-transform:rotate(315deg);transform:rotate(315deg)}}@keyframes loading{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}12.5%{-webkit-transform:rotate(45deg);transform:rotate(45deg)}25%{-webkit-transform:rotate(90deg);transform:rotate(90deg)}37.5%{-webkit-transform:rotate(135deg);transform:rotate(135deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}62.5%{-webkit-transform:rotate(225deg);transform:rotate(225deg)}75%{-webkit-transform:rotate(270deg);transform:rotate(270deg)}87.5%{-webkit-transform:rotate(315deg);transform:rotate(315deg)}}")
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
        isShow: false,
        isFull: true,
        needMask: true,
        showMask: false,
        timeout: 10000,
        delay: 500,
        icon: 'sm-loading'
    },
    methods: {
        show: function show(option) {
            var _this = this;

            if (option) {
                (0, _assign2.default)(this, option);
            }
            this.isShow = true;
            setTimeout(function () {
                _this.close();
            }, this.timeout);

            var $vm = this;
            this.isShow = true;

            if (this.needMask) {
                setTimeout(function () {
                    $vm.showMask = true;
                }, this.delay);
            }
        },
        close: function close() {
            if (this.$el) {
                this.$el.remove();
            }
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=loading-box :class=\"{mask: showMask, full: isFull}\" v-show=isShow><slot><i :class=\"['content', icon]\" v-if=icon></i></slot></div>"
