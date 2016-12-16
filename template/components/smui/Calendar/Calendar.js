var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert(".calendar{width:235px;padding:10px;background:#fff;position:absolute;border:1px solid #dedede;border-radius:2px;-webkit-transition:all .5s ease;transition:all .5s ease;color:#333}.calendar .calendar-enter,.calendar .calendar-leave{opacity:0;-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}.calendar .toast.warn{color:#c00;background:#eee;font-size:12px;padding:2px 10px;line-height:18px;border:1px solid #ccc;border-radius:2px;position:absolute;display:inline-block;bottom:0;left:30%}.calendar:before{top:-10px;border:5px solid transparent;border-bottom-color:#dedede}.calendar:after,.calendar:before{position:absolute;left:30px;content:\"\"}.calendar:after{top:-9px;border:5px solid transparent;border-bottom-color:#fff}.calendar .month-input{width:40px!important;outline:none}.calendar .year-input{width:65px!important;outline:none}.calendar .calendar-tools{height:32px;font-size:18px;line-height:32px;color:#42b983}.calendar .calendar-tools .float.ileft{float:left;font-size:16px}.calendar .calendar-tools .float.iright{float:right;font-size:16px}.calendar .calendar-tools input{font-size:18px;line-height:32px;color:#42b983;width:60px;text-align:center;border:none;background-color:transparent}.calendar .calendar-tools>i{margin:0 12px;line-height:32px;cursor:pointer;color:#707070}.calendar .calendar-tools .disabled{color:#eee}.calendar .calendar-tools>i:hover{color:#42b983}.calendar table{clear:both;width:100%;margin-bottom:10px;border-collapse:collapse;color:#444}.calendar td{margin:2px!important;padding:5px 0;width:14.28571429%;text-align:center;vertical-align:middle;font-size:12px;line-height:125%;cursor:pointer}.calendar td:hover{background:#f3f8fa}.calendar td.disabled,.calendar td.week{pointer-events:none!important;cursor:default!important}.calendar td.disabled{color:silver;background-color:none}.calendar td.valid{color:#42b983;font-size:12px}.calendar td.selected{color:#fff;background-color:#42b983;font-size:12px}.calendar thead td{text-transform:uppercase}.calendar .timer{margin:10px 0;text-align:center}.calendar .timer input{border-radius:2px;padding:5px;font-size:14px;line-height:18px;color:#42b983;width:50px;text-align:center;border:1px solid #efefef}.calendar .timer input:focus{border:1px solid #42b983}.calendar .calendar-button{text-align:center}.calendar .calendar-button button{border:none;cursor:pointer;display:inline-block;min-height:1em;vertical-align:baseline;background:#42b983;color:#fff;margin:0 .25em 0 0;padding:5px 10px;font-size:1em;line-height:1em;text-align:center;border-radius:.3em}.calendar .calendar-button button.cancel{background:#efefef;color:#666}")
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _ui = require('../base/ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var monthArray = new Array(12).fill('0').map(function (x, idx) {
    return idx < 9 ? '0' + (idx + 1) : '' + (idx + 1);
});

var weekArray = ['日', '一', '二', '三', '四', '五', '六'];

var params = {
    show: false,
    value: '',
    area: false,
    maxDate: false,
    minDate: false,
    message: '',
    x: 0,
    y: 0,
    hour: 0,
    minute: 0,
    second: 0,
    limitDates: false,
    page: {
        year: 2016,
        month: 0,
        showMonth: 1
    },
    days: [],
    type: 'date',
    format: 'YYYY-MM-DD',
    sep: '-',
    canPrev: true,
    canNext: true,
    weeks: weekArray,
    months: monthArray
};

exports.default = {
    params: params,
    mixins: [_ui2.default],
    ready: function ready() {
        var time = new _moment2.default(this.value);
        this.page = {
            year: time.year(),
            month: time.month(),
            showMonth: time.month() + 1
        };
    },

    watch: {
        params: function params(value) {
            (0, _assign2.default)(this, value);
        },
        value: function value() {
            var time = new _moment2.default(this.value);
            this.page.year = time.year();
            this.page.month = time.month();
            this.update();
        },
        maxDate: function maxDate(value) {
            this.update();
        },
        minDate: function minDate(value) {
            this.update();
        }
    },
    computed: {
        style: function style() {
            return {
                left: this.x + 'px',
                top: this.y + 'px'
            };
        },
        maxYear: function maxYear() {
            return new Date().getFullYear();
        },
        minYear: function minYear() {
            return new _moment2.default().add(-2, 'year').year();
        }
    },
    methods: {
        prepared: function prepared() {
            this.update();
        },
        zero: function zero(n) {
            return n < 10 ? '0' + n : n;
        },
        update: function update() {
            var time = new _moment2.default(this.value);
            if (this.type == 'datetime') {
                this.hour = time.hour();
                this.minute = time.minute();
                this.second = time.second();
                this.format = 'YYYY-MM-DD HH:mm:ss';
            }
            this.render();
        },
        changeYear: function changeYear() {
            if (this.page.year < 1970 || this.page.year > 2500) {
                this.page.year = new _moment2.default(this.value).year();
            }
            this.render();
        },
        changeMonth: function changeMonth() {
            if (this.page.showMonth < 1 || this.page.showMonth > 12) {
                this.page.showMonth = new _moment2.default(this.value).month() + 1;
            }
            this.page.month = this.page.showMonth - 1;
            this.render();
        },
        prev: function prev(e) {
            e.stopPropagation();
            var page = this.page;
            var time = new _moment2.default(new Date(page.year, page.month, 1)).subtract(1, 'month');
            page.year = time.year();
            page.month = time.month();
            this.render();
        },
        next: function next(e) {
            e.stopPropagation();
            var page = this.page;
            var time = new _moment2.default(new Date(page.year, page.month, 1)).add(1, 'month');
            page.year = time.year();
            page.month = time.month();
            this.render();
        },
        render: function render() {
            var year = this.page.year;
            var month = this.page.month;
            this.page.showMonth = this.page.month + 1;

            var firstDate = new Date(year, month, 1);

            var m = new _moment2.default(firstDate);

            var firstDayOfMonth = firstDate.getDay();
            var lastDateOfMonth = m.daysInMonth();

            var lastDayOfLastMonth = m.subtract(-1, 'month').daysInMonth();

            var i = 0;
            var line = 0;
            var temp = [];

            for (i = 1; i <= lastDateOfMonth; i++) {
                var dow = new Date(year, month, i).getDay();

                if (dow == 0) {
                    temp[line] = [];
                } else if (i == 1) {
                    temp[line] = [];
                    var k = lastDayOfLastMonth - firstDayOfMonth + 1;

                    for (var j = 0; j < firstDayOfMonth; j++) {
                        var _col = temp[line].length;
                        temp[line].push({ row: line, col: _col, day: k, disabled: true });
                        k++;
                    }
                }

                var col = temp[line].length;
                var options = { row: line, col: col, day: i };
                var thisTime = new _moment2.default(new Date(year, month, i));

                if (this.validate(thisTime)) {
                    options.valid = true;

                    if (this.inSelection(thisTime)) {
                        options.selected = true;
                    }
                } else {
                    options.disabled = true;
                    options.outed = true;
                }

                temp[line].push(options);

                if (dow == 6) {
                    line++;
                    temp[line] = [];
                } else if (i == lastDateOfMonth) {
                    var k = 1;
                    for (dow; dow < 6; dow++) {
                        var _col2 = temp[line].length;
                        temp[line].push({ row: line, col: _col2, day: k, disabled: true });
                        k++;
                    }
                }
            }
            this.days = temp;
        },
        toast: function toast(message) {
            var _this = this;

            this.message = message;
            setTimeout(function () {
                _this.message = '';
            }, 1500);
        },
        select: function select(k1, k2, e) {
            if (e !== undefined) {
                e.stopPropagation();
            }

            var time = new _moment2.default(new Date(this.page.year, this.page.month, this.days[k1][k2].day));

            if (this.maxDate && this.area) {
                if (!this.isBetween(time, [this.area[0], this.maxDate])) {
                    this.toast('不能大于结束时间');
                    return;
                }
            }
            if (this.minDate && this.area) {
                if (!this.isBetween(time, [this.minDate, this.area[1]])) {
                    this.toast('不能小于开始时间');
                    return;
                }
            }
            if (this.limitDates) {

                if (this.maxDate && -time.diff(this.maxDate, 'days') > this.limitDates || this.minDate && time.diff(this.minDate, 'days') > this.limitDates) {
                    this.toast('时间跨度不能大于' + this.limitDates + '天');
                    return;
                }
            }

            this.changeValue(time);
        },
        validate: function validate(value) {
            if (this.area && !value.isBetween(this.area[0], this.area[1])) {
                return false;
            }
            return true;
        },
        isSelectable: function isSelectable(time) {
            if (this.maxDate && this.area && this.isBetween(time, [this.area[0], this.maxDate])) {
                return true;
            }
            if (this.minDate && this.area && this.isBetween(time, [this.minDate, this.area[1]])) {
                return true;
            }
            return false;
        },
        inSelection: function inSelection(time) {
            if (this.maxDate && this.isBetween(time, [this.value, this.maxDate])) {
                return true;
            }
            if (this.minDate && this.isBetween(time, [this.minDate, this.value])) {
                return true;
            }
            return false;
        },
        isBetween: function isBetween(time, area) {
            return (time.isAfter(area[0]) || time.isSame(area[0], 'days')) && (time.isBefore(area[1]) || time.isSame(area[1], 'days'));
        },
        changeValue: function changeValue(target) {
            if (!this.validate(target)) {
                return false;
            }

            if (this.type === 'datetime') {
                target.hour(this.hour);
                target.minute(this.minute);
                target.second(this.second);
            }

            this.value = target.format(this.format);
            this.render();
            this.emit('value-change', { value: this.value });
        },
        changeTime: function changeTime() {
            this.changeValue(new _moment2.default(this.value));
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div @click.stop=\"\" @touchstart.stop=\"\" class=calendar v-show=show :style=style transition=calendar transition-mode=out-in><div class=calendar-tools><i class=\"sm-arrow-left float ileft\" :class=\"{disabled: !canPrev}\" @click=prev :disabled=!canPrev @touchstart=prev></i> <i class=\"sm-arrow-right float iright\" :class=\"{disabled: !canNext}\" @click=next :disabled=!canNext @touchstart=next></i><div class=\"text center\"><input type=number v-model=page.year :value=page.year @change=changeYear() :min=minYear :max=maxYear class=year-input> / <input type=number v-model=page.showMonth :value=page.showMonth @change=changeMonth() min=1 max=12 class=month-input></div><div v-if=message class=\"toast warn\">{{message}}</div></div><table cellpadding=5><thead><tr><td v-for=\"week in weeks\" class=week>{{week}}<tbody><tr v-for=\"row in days\"><td v-for=\"child in row\" :class=\"{'valid': child.valid, 'disabled':child.disabled, selected: child.selected}\" @click=\"select(child.row, child.col, $event)\" @touchstart=\"select(child.row, child.col, $event)\">{{child.day}}</table><div class=calendar-time v-show=\"type=='datetime'||type=='time'\"><div class=timer><input type=number v-model=hour @change=changeTime :value=hour min=0 max=23 maxlength=2>时 <input type=number v-model=minute @change=changeTime :value=minute min=0 max=59 maxlength=2>分 <input type=number v-model=second @change=changeTime :value=second min=0 max=59 maxlength=2>秒</div></div></div>"
