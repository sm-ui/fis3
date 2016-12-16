var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert(".dialog .main-wrapper{z-index:999;background:#fff;position:absolute;min-width:200px;min-height:100px}.dialog.poly{width:100vw;height:100vh;background:none;border:none;position:fixed;top:0;left:0}.dialog.poly .mask-layer{position:fixed;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,.6);z-index:777}.dialog.poly .main-wrapper{position:absolute;left:50%;width:400px;background:#fff}")
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _util = require('../base/util');

var _util2 = _interopRequireDefault(_util);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _ui = require('../base/ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var params = {
    isShow: false,
    isFull: false,
    isModal: false,
    native: true,
    style: {},
    clazz: [],
    x: 100,
    y: 100,
    width: 100,
    height: 100
};

exports.default = {
    params: params,
    props: ['params'],
    mixins: [_ui2.default],
    methods: {
        show: function show() {
            var _this = this;

            this.isShow = true;
            if (this.native && this.$el.parentElement) {
                var dialog = this.$el.querySelector('dialog');
                dialog.show();
            } else if (this.isModal) {
                this.fixSize();
                setTimeout(function () {
                    _this.fixSize();
                }, 150);
            }
        },
        showModal: function showModal() {
            var _this2 = this;

            this.isShow = true;
            this.isModal = true;
            if (this.native && this.$el.parentElement) {
                var dialog = this.$el.querySelector('.dialog');
                dialog.showModal();
            } else if (this.isModal) {
                setTimeout(function () {
                    _this2.fixSize();
                }, 200);
            }
        },
        fixSize: function fixSize() {
            var el = document.body.querySelector('.dialog-wrapper');
            if (!this.height && el) {
                this.height = el.clientHeight;
            }

            if (!this.width && el) {
                this.width = el.clientWidth;
            }
        },
        open: function open() {
            this.isShow = true;
        },
        remove: function remove() {
            this.isShow = false;
            this.$el.remove();
        },
        close: function close() {
            this.isShow = false;
            if (this.native) {
                this.$el.remove();
            }
        },
        hide: function hide() {
            this.isShow = false;
        }
    },
    computed: {
        dialogStyle: function dialogStyle() {
            if (!this.isModal) {
                return this.style;
            }
            var pos = {};

            if (this.isModal && !this.native) {
                pos.left = Math.floor((document.body.clientWidth - this.width) / 2) + 'px';
                pos.top = Math.floor((document.body.clientHeight - this.height) / 2) + 'px';
            }

            return (0, _assign2.default)({
                width: this.width && this.width + 'px',
                height: this.height && this.height + 'px'
            }, this.style, pos);
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div><div><dialog is=dialog class=dialog :class=clazz :style=dialogStyle v-if=native><slot></slot></dialog></div><div class=dialog :class=\"{poly: isModal}\" v-if=\"!native &amp;&amp; isShow\"><div class=mask-layer v-if=isModal></div><div class=main-wrapper :class=clazz :style=dialogStyle><slot></slot></div></div></div>"
