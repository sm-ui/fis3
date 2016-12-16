var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert(".tab-list{background:#f5f5f5;border:1px solid #e4e4e4;border-right:0;border-left:0;color:#333;padding-left:16px;font-size:14px;position:relative}.tab-list ul{list-style:none;padding:0;margin:0}.tab-list .tab{display:inline-block;vertical-align:top}.tab-list .tab.double.active{height:98px}.tab-list .tab.active>a{position:relative;box-sizing:border-box;border-bottom:3px solid #39bd8b;color:#39bd8b;font-weight:700;z-index:1}.tab-list .tab a{display:inline-block;height:51px;margin-bottom:-1px;line-height:50px;padding:0 16px}.tab-list .tab .sub-tab{position:absolute;left:0}.tab-list .sub-tab{box-sizing:border-box;height:24px;width:100%;padding:13px 16px;border-top:1px solid #e4e4e4;color:#333;font-size:13px;font-weight:400}.tab-list .sub-tab ul{padding:0 16px}.tab-list .sub-tab li{display:inline-block;margin-right:10px;padding:0 10px;border-radius:3px}.tab-list .sub-tab li.focus{border:1px solid #39bd8b;color:#39bd8b;padding:0 9px}.tab-list .sub-tab a{height:22px;padding:0;line-height:22px}")
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _ui = require('../base/ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var params = {
    tab: '',
    subTab: '',
    items: []
};

exports.default = {
    params: params,
    mixins: [_ui2.default],
    methods: {
        selectTab: function selectTab(tab, subTab) {
            this.tab = tab.tab;
            if (!subTab && tab.subTab) {
                subTab = tab.children.find(function (sub) {
                    return sub.tab === tab.subTab;
                });
            }

            if (subTab && subTab.tab) {
                this.subTab = subTab.tab;
            } else {
                this.subTab = '';
            }

            var data = (0, _assign2.default)({}, tab, { tab: tab.tab, subTab: '', children: '' });
            if (subTab) {
                data = (0, _assign2.default)(data, subTab, { tab: tab.tab, subTab: subTab.tab });
            }
            this.emit('tab-change', data);
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=\"tab-list comp\" data-name=tab><ul><li v-for=\"item in items\" class=tab :class=\"{double: item.children, active: item.tab == tab}\"><a :data-tab=item.tab @click=selectTab(item)>{{item.name}}</a><div class=sub-tab v-if=\"item.tab == tab &amp;&amp; item.children\"><ul><li v-for=\"sub in item.children\" :class=\"{focus: sub.tab == subTab}\"><a @click=\"selectTab(item, sub)\">{{sub.name}}</a></ul></div></ul></div>"
