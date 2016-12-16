var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert(".date-picker{font-size:12px;position:relative;color:#333;width:205px!important}.date-picker *{box-sizing:border-box}.date-picker .button-panel{position:absolute;bottom:10px}.date-picker .info-sign{position:absolute;right:45px;top:0}.date-picker .hidden{display:none}.date-picker .calable{position:absolute;display:block;left:0;top:0;width:100%;height:100%;z-index:3}.date-picker .range-type a{display:inline-block;line-height:15px;padding:0 5px}.date-picker .range-type .active{color:#42b983}.date-picker .layer{position:absolute;top:31px;left:0;background:#fff;width:530px;height:340px;padding:10px;border:1px solid #eee;z-index:100}.date-picker .date-wrapper{position:relative;display:inline-block;width:250px}.date-picker .calendar{left:0;top:40px;height:217px}.date-picker .range-input{width:100%;text-align:left}.date-picker .sm-calender{position:absolute;right:16px;top:10px;width:5px;height:10px;font-size:15px;color:#333}.date-picker .date-input{width:238px;line-height:22px}.date-picker .close-btn{position:absolute;top:10px;right:10px;font-size:12px;font-weight:bolder;cursor:pointer}.date-picker button{min-width:3em}.date-picker button.cancel{color:#777!important;border:0;background:#fff}")
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Calendar = require('../Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _Info = require('../Info');

var _Info2 = _interopRequireDefault(_Info);

var _ui = require('../base/ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var format = 'YYYY-MM-DD';
var mday = (0, _moment2.default)();
var lastMonth = (0, _moment2.default)().add(-1, 'month');

var today = mday.format(format);
var tomorrow = (0, _moment2.default)().add(1, 'days').format(format);
var lastDay = (0, _moment2.default)().add(-1, 'days').format(format);
var firstDay = (0, _moment2.default)().startOf('month').format(format);
var lastWeek = (0, _moment2.default)().add(-7, 'days').format(format);
var lastYear = (0, _moment2.default)().add(-1, 'year').format(format);
var originDate = (0, _moment2.default)().add(-18, 'month').format(format);

var lastOfMonth = lastDay;
if (mday.date() === 1) {
    lastOfMonth = firstDay;
}

var rangeMap = {
    today: [today, today, '今天'],
    thisWeek: [mday.startOf('week').format(format), lastDay, '本周'],
    thisMonth: [firstDay, lastOfMonth, '本月'],
    lastDay: [lastDay, lastDay, '昨天'],
    lastWeek: [lastWeek, lastDay, '最近7天'],
    lastMonth: [lastMonth.startOf('month').format(format), lastMonth.endOf('month').format(format), '上月']
};

var params = {
    show: true,
    format: 'YYYY-MM-DD',
    info: '',
    limitDates: 365,
    value: rangeMap.lastWeek.slice(0, 2).join('~'),
    rtype: '',
    area: [originDate, today],
    cut: { today: 1, lastDay: 1 }
};

exports.default = {
    params: params,
    private: {
        showLayer: false,
        infoText: ''
    },
    mixins: [_ui2.default],
    ready: function ready() {
        (0, _assign2.default)(this, this.params);
        if (this.rtype) {
            var range = rangeMap[this.rtype];
            this.info = range[2];
            this.setValue(range[0], range[1]);
            this.infoText = range[2];
            return;
        }
        this.info = this.infoText || this.value;
    },

    computed: {
        beginParams: function beginParams() {
            return {
                value: this.begin,
                maxDate: this.end,
                area: this.beginArea,
                type: 'date',
                limitDates: this.limitDates,
                y: 36,
                show: this.show
            };
        },
        endParams: function endParams() {
            return {
                value: this.end,
                minDate: this.begin,
                area: this.endArea,
                type: 'date',
                limitDates: this.limitDates,
                y: 36,
                show: this.show
            };
        },
        begin: function begin() {
            return this.value.split('~')[0];
        },
        end: function end() {
            return this.value.split('~')[1];
        },
        beginArea: function beginArea() {
            return this.area;
        },
        endArea: function endArea() {
            return this.area;
        }
    },
    methods: {
        ensure: function ensure() {
            this.emit('range-change', {
                rtype: this.rtype,
                info: this.info,
                begin: this.begin,
                end: this.end,
                value: this.value
            });
            this.info = this.infoText || this.value;
            this.showLayer = false;
        },
        setValue: function setValue(b, e) {
            this.infoText = '';
            this.value = (b || this.begin) + '~' + (e || this.end);
        },
        setBegin: function setBegin(e) {
            this.setValue(e.data.value);
        },
        setEnd: function setEnd(e) {
            this.setValue(0, e.data.value);
        },
        selectRange: function selectRange(rangeType) {
            var range = rangeMap[rangeType];
            this.setValue(range[0], range[1]);
            this.infoText = range[2];
            this.info = this.infoText || this.value;
            this.rtype = rangeType;
        },
        select: function select(num, unit, text) {
            var m = (0, _moment2.default)();
            if (unit === 'fmonth') {
                m = m.add(num, 'month');
                this.setValue(m.startOf('month').format(this.format), m.endOf('month').format(this.format));
            } else if (unit === 'day') {
                var end = (0, _moment2.default)().add(num, 'days');
                this.setValue(end.format(this.format), end.format(this.format));
            } else {
                var end = (0, _moment2.default)().add(-1, 'days');
                this.setValue(m.add(num, unit).format(this.format), end.format(this.format));
            }
            this.infoText = text;
        },
        showCalendar: function showCalendar(e) {
            e.stopPropagation();
            this.show = true;
            this.showLayer = true;
        },
        clearTimer: function clearTimer() {
            clearTimeout(this.timer || 100);
        },
        hideCalendar: function hideCalendar(e) {
            var _this = this;

            if (e === 0) {
                this.showLayer = false;
                return;
            }
            this.timer = setTimeout(function () {
                _this.showLayer = false;
            }, 400);
        }
    },
    components: { Calendar: _Calendar2.default, Info: _Info2.default }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=date-picker @mousemove=clearTimer @mouseout=hideCalendar><div><span @click=showCalendar id=canlendar-button class=range-input>{{info}}</span><label class=calable for=canlendar-button v-on:click=showCalendar></label><i class=sm-calender></i></div><div class=layer :class=\"{hidden: !showLayer}\"><div class=range-type><a @click=\"selectRange('lastMonth')\" :class=\"{active: infoText == '上月'}\">上月</a> <a @click=\"selectRange('thisMonth')\" :class=\"{active: infoText == '本月'}\">本月</a> <a @click=\"selectRange('lastWeek')\" :class=\"{active: infoText == '最近7天'}\">最近7天</a> <a @click=\"selectRange('lastDay')\" v-if=cut.lastDay :class=\"{active: infoText == '昨天'}\">昨天</a> <a @click=\"selectRange('today')\" v-if=cut.today :class=\"{active: infoText == '今天'}\">今天</a><info><h3>日期选择说明：</h3><div v-if=limitDates>最大选择天数：{{limitDates}} 天</div><div v-if=area>选择范围：<div>{{area[0]}} ~ {{area[1]}}</div></div></info></div><div><div class=date-wrapper><input type=date class=\"date-input start\" v-model=begin placeholder=请输入日期 :disabled=true><calendar :params=beginParams @value-change=setBegin></calendar></div><div class=date-wrapper><input type=date class=\"date-input end\" v-model=end placeholder=请输入日期 :disabled=true><calendar :params=endParams @value-change=setEnd></calendar></div></div><i class=\"close-btn close rotate sm-close\" @click=hideCalendar(0)></i><div class=button-panel><button class=\"ensure button\" @click.prevent=ensure>确定</button> <button class=\"cancel button\" @click=hideCalendar(0)>取消</button></div></div></div>"
