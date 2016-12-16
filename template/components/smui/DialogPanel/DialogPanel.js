var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert(".wild-dialog .dialog{left:30%;top:10%}.dialog{position:absolute;min-width:180px;padding:0;border:1px solid rgba(34,36,38,.2);border-radius:4px;box-sizing:border-box;box-shadow:0 2px 3px rgba(34,36,38,.15);background-color:#fff;z-index:80}.dialog .header{margin:0;font-size:13px;border-radius:4px 4px 0 0;color:#333;box-sizing:border-box;height:40px;padding:10px 38px 10px 16px;border-bottom:1px solid #e4e4e4;background-color:#f5f5f5;line-height:20px}.dialog .content{padding:28px;display:block;min-width:120px}.dialog .dialog-wrapper.pad-bottom{position:relative}.dialog .footer{padding:12px 16px;bottom:0;border-top:1px solid #e4e4e4;width:100%;box-sizing:border-box}.dialog .footer .default-bottom{text-align:right;min-width:100px}.dialog .footer button{margin-left:5px;cursor:pointer;width:56px;min-width:20px;line-height:24px;height:24px}.dialog .footer .ensure-button:hover{border:1px solid #2bbc89}.dialog .footer .cancel-button{padding:0;border:0;width:28px;background-color:#fff;outline-color:#fff;background-image:none;margin-left:13px;margin-right:0}.dialog::-webkit-backdrop{background-color:rgba(0,0,0,.2)}.dialog::backdrop{background-color:rgba(0,0,0,.2)}.dialog .close{position:absolute;cursor:pointer;right:11px;top:12px;font-size:14px;color:#333;z-index:3}.dialog.fixed,.dialog.full{position:fixed;z-index:999;left:0;top:0}.dialog.full{width:100%;height:100vh;overflow:auto}.dialog.inline{padding-bottom:0;min-width:150px}.dialog.inline .close{right:2px;top:2px}.dialog.inline .footer{display:none}.dialog.inline .content{min-height:20px;padding:5px}")
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _ui = require('../base/ui');

var _ui2 = _interopRequireDefault(_ui);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _DialogElement = require('./DialogElement');

var _DialogElement2 = _interopRequireDefault(_DialogElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNative = !!(document.createElement('dialog') || {}).showModal;

var params = {
    title: '',
    content: '',
    native: isNative,
    removeOnClose: true,
    ensureText: '确定',
    cancelText: '取消',
    clazz: { full: false },
    needClose: true,
    needFooter: true,
    data: {},
    style: {},
    width: '',
    height: '',
    headerView: 'head',
    contentView: 'ContentView',
    footerView: 'foot',
    needCancel: true
};

function getContainer() {
    var dom = document.createElement('div');
    dom.id = 'dialog-instance';
    var panel = document.querySelector('#dialog-container-wrapper');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'dialog-container-wrapper';
        document.body.append(panel);
    }
    panel.appendChild(dom);
    return dom;
}

exports.default = {
    params: params,
    replace: false,
    mixins: [_ui2.default],
    created: function created() {
        var content = this.$options.content;
        if ((typeof content === 'undefined' ? 'undefined' : (0, _typeof3.default)(content)) === 'object') {
            if (_vue2.default.version.charAt(0) === '1') {
                content = _vue2.default.extend(content);
            }
            this.$options.components.ContentView = content;
        } else if (typeof content === 'string') {
            this.content = content;
        }
    },
    ready: function ready() {
        this.$dialog = this.$refs.dialog;
    },

    components: {
        DialogElement: _DialogElement2.default
    },
    methods: {
        appendTo: function appendTo(container) {
            container.appendChild(this.$el);
        },
        showModal: function showModal(option) {
            this.show(option, true);
        },
        set: function set(option) {
            if (typeof option === 'string') {
                option = {
                    content: option
                };
            }
            (0, _assign2.default)(this, option);
        },
        delegateEvent: function delegateEvent(target) {
            var $vm = this;

            $vm.view = target;
            target.$emit = function (type, e) {
                $vm.$emit(type, e);
            }.bind(target);
        },
        show: function show(option, isModal) {
            this.set(option);

            if (!this.$el || !this.$el.parentElement) {
                this.$mount(getContainer(option));
            }

            if (isModal) {
                this.$refs.dialog.showModal();
            } else {
                this.$refs.dialog.show();
            }

            if (this.$refs.view) {
                this.delegateEvent(this.$refs.view);
            }
        },

        ensure: function ensure() {
            var view = this.$refs.view;
            if (view && view.ensure) {
                view.ensure();
            } else {
                this.$emit('ensure');
            }
        },
        close: function close() {
            this.$emit('closing');
            if (this.$dialog.open) {
                this.$dialog.close();
            }
            this.$emit('closed');
        },
        hide: function hide() {
            this.$dialog.hide();
            this.$emit('hide');
        }
    },
    computed: {
        comps: function comps() {
            var comps = {};
            for (var key in this.$options.components) {
                comps[key] = key;
            }
            return comps;
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=dialog-panel :class=clazz><dialog-element :params=\"{native: native, style: dialogStyle, width: width, height: height}\" v-ref:dialog=\"\"><div class=\"close rotate sm-close\" @click=close v-if=needClose></div><div class=dialog-wrapper :class=\"{'pad-bottom': needFooter}\"><div class=header v-if=title><slot name=title><div :show=title v-html=title></div></slot></div><div class=content><slot name=content><component :is=contentView :params=data v-if=comps[contentView] v-ref:view=\"\"></component><div v-else=comps[contentView] v-html=content></div></slot></div><div class=footer v-if=needFooter><slot name=footer><div class=default-bottom><button class=\"button ensure-button\" @click=ensure>{{ensureText}}</button> <button class=\"button cancel-button\" @click=close v-if=needCancel>{{cancelText}}</button></div></slot></div></div></dialog-element></div>"
