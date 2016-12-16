var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert(".line-box{position:relative;border:1px solid #e4e4e4;border-radius:3px;min-height:10rem;box-sizing:content-box;overflow:hidden}.line-box .line-list{display:block;width:30px;text-align:center;background-color:#e3e3e3;padding-top:2px;font-size:13px;height:100%;overflow:hidden;position:absolute;top:0;left:0}.line-box .line-list li{height:25px;line-height:25px;text-align:center}.line-box .textarea-container{padding-left:35px;box-sizing:border-box}.line-box textarea{width:100%;font-size:13px;border:0;outline:none;line-height:25px;min-height:200px;overflow:hidden;padding-left:5px}")
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ui = require('../base/ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Vue = require('vue');
var util = require('./util');

var params = {
    contentText: '',
    rows: 10,
    cols: 30,
    doms: {
        textarea: null,
        ulNum: null
    },
    textareaDisabled: false
};

exports.default = {
    params: params,
    mixins: [_ui2.default],
    computed: {
        style: function style() {
            return {
                width: this.cols + 'rem',
                height: this.rows + 'rem'
            };
        }
    },
    methods: {
        textChanged: function textChanged(e) {
            var lines = this.contentText.split('\n');
            this.rows = lines.length;
            this.emit('text-changed', lines);
        }
    },
    watch: {
        'contentText': function contentText() {
            this.textChanged();
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=line-box :style=style><ul class=line-list><li v-for=\"n in rows\" v-if=\"rows > 0\">{{ n + 1 }}</ul><div class=textarea-container :style=style><textarea :disabled=\"textareaDisabled == 1\" v-model=contentText class=input-textarea></textarea></div></div>"
