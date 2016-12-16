var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert(".field-tip{position:absolute;max-width:200px;line-height:1.5em;font-size:12px;left:0;top:0}.field-tip .warning{color:#c00}.field-tip .message{color:#333}")
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ui = require('../base/ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var params = {
    message: '',
    warning: '',
    for: '',
    position: 'absolute',
    show: false,
    placed: '',
    auto: false,
    tries: 0,
    width: 0,
    left: 0,
    top: 0,
    x: 0,
    y: 0
};

exports.default = {
    params: params,
    mixins: [_ui2.default],
    computed: {
        style: function style() {
            if (!this.show || !this.message && !this.warning) {
                return { display: 'none' };
            }
            var st = {
                position: this.position,
                left: this.x + 'px',
                top: this.y + 'px',
                display: 'block'
            };
            if (this.width) {
                st.width = this.width + 'px';
            }
            return st;
        }
    },
    ready: function ready() {
        this.init();
    },

    methods: {
        attachTo: function attachTo(el) {
            this.x = el.offsetWidth + el.offsetLeft + +this.left;
            this.y = el.offsetTop + +this.top;
        },
        init: function init() {
            var $vm = this;
            var target = null;
            if (!$vm.$el) {
                return;
            }
            if (this.placed) {
                this.message = this.placed.replace(/\[([a-z\/]+)\]/g, function (match, seg) {
                    return '<' + seg + '>';
                });
            }

            if (this.for) {
                target = this.$parent.$el.querySelector(this.for);
            }

            var fork = 0;
            var check = function check() {
                $vm.attachTo(target);
                clearTimeout(fork);
                fork = setTimeout(function () {
                    $vm.warning = target.validationMessage;
                    $vm.message = target.message || $vm.palced;
                }, 100);
            };

            if (!target && $vm.$el.parentElement) {
                $vm.$el.parentElement.querySelector('.field');
            }

            if (!target) {
                target = $vm.$el.previousElementSibling;
            }
            if (target) {
                $vm.attachTo(target);
                target.addEventListener('change', check);

                target.showMessage = check;
                $vm.show = true;
            }
            if (!target && this.tries < 3) {
                setTimeout(function () {
                    $vm.init();
                }, 1000);
                this.tries++;
                return;
            }
            if (this.auto) {
                check();
            }
            this.target = target;
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=field-tip :style=style><div class=warning v-if=warning>{{warning}}</div><div class=message v-if=message v-else=warning v-html=message></div></div>"
