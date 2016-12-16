'use strict';

exports.Dialog = require('./Dialog');
exports.DialogPanel = require('./DialogPanel');
exports.Calendar = require('./Calendar');
exports.DatePicker = require('./DatePicker');
exports.DropList = require('./DropList');
exports.FieldTip = require('./FieldTip');
exports.Info = require('./Info');
exports.Pager = require('./Pager');
exports.PressTab = require('./PressTab');
exports.UiProgress = require('./Progress');
exports.RichTable = require('./RichTable');
exports.Schedule = require('./Schedule');
exports.Scrum = require('./Scrum');
exports.SelectList = require('./SelectList');
exports.Tab = require('./Tab');
exports.Tree = require('./Tree');

window.SMUI = exports;

if ('function' === typeof window.define) {

    window.define('smui', window.SMUI);

    // 为了方便依赖，定义vue模块，可直接使用
    if (!window.Vue) {
        window.Vue = require('vue');
        window.define('vue', function () {
            return window.Vue;
        });
    }

    // 注册所有子模块
    for (var key in exports) {
        if (exports.hasOwnProperty(key)) {
            (function () {
                var comp = exports[key];
                window.define('smui/' + key, function () {
                    return comp;
                });
            })();
        }
    }
}