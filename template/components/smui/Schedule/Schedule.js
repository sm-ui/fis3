var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert(".select-timer-control{font-size:13px;width:720px;padding:10px;margin:0 auto}.select-timer-control .tip-bar{height:18px;line-height:18px;padding:10px 0}.select-timer-control .tip-bar .action{display:inline-block}.select-timer-control .tip-bar .action span{display:inline-block;padding:0 5px;cursor:pointer}.select-timer-control .tip-bar .tip{display:inline-block;float:right;margin-left:20px}.select-timer-control .tip-bar .tip span{display:inline-block;height:13px;margin-top:2px;width:13px;vertical-align:top;margin-right:5px}.select-timer-control .tip-bar .tip .selected-tip{background-color:#f7873d}.select-timer-control .tip-bar .tip .unselected-tip{background-color:#ccc}.select-timer-control .week-container .day-line{display:block}.select-timer-control .week-container .day-th-line{margin-top:16px}.select-timer-control .week-container .day-container li{display:inline-block;width:25px;height:16px;font-size:0}.select-timer-control .week-container .day-container .week-th{width:88px;font-size:13px;background-color:#fff;box-sizing:border-box;height:25px;line-height:25px}.select-timer-control .week-container .day-container .week-th label{cursor:pointer}.select-timer-control .week-container .day-container .hour-td,.select-timer-control .week-container .day-container .hour-th{width:25px;height:25px;vertical-align:bottom;overflow:hidden;border:1px solid #fff;border-width:1px 1px 0 0;box-sizing:border-box}.select-timer-control .week-container .day-container .hour-td{color:#fff;text-align:center;line-height:25px;font-size:12px;cursor:pointer}.select-timer-control .week-container .day-container .selected-0{background-color:#ccc}.select-timer-control .week-container .day-container .selected-1{background-color:#f7873d}.select-timer-control .week-container .day-container .selected-1:hover{background-color:#fbd4ba}.select-timer-control .week-container .day-container .hour-th{font-size:14px;text-align:center;line-height:30px;cursor:pointer;color:#ccc}.select-timer-control .week-container .day-container .hour-th.selected,.select-timer-control .week-container .day-container .hour-th:hover{color:#f7873d}")
'use strict';

var pd = 'd';

var ph = 'h';

var map = function () {
    var map = {};
    for (var i = 0; i < 7; i++) {
        map[pd + i] = {};
        for (var j = 0; j < 24; j++) {
            map[pd + i][ph + j] = 0;
        }
    }
    return map;
}();

var toolbarCheckTimer = null;
module.exports = {
    props: ['params'],
    methods: {
        getSelectedString: function getSelectedString() {
            var map = this.valueMap;
            var valueArr = [];
            var startStr = '',
                endStr = '';
            function joinStr(day, hour, value) {
                if (value) {
                    var vStr = (day + 1) * 100 + hour;
                    !startStr && (startStr = vStr);
                    endStr = vStr + 1;
                }

                if ((!value || hour == 23) && startStr) {
                    valueArr.push(startStr + '-' + endStr);
                    startStr = endStr = '';
                };
            };

            for (var i = 0; i < 7; i++) {
                for (var j = 0; j < 24; j++) {
                    joinStr(i, j, map[pd + i][ph + j]);
                }
            }
            return valueArr.join(';');
        },

        checkeToolBarStatus: function checkeToolBarStatus() {
            var me = this;

            function doCheck() {
                var map = me.valueMap;
                var af = me.actionFlags;
                af.hLine = {};
                af.sLine = {};
                for (var i = 0; i < 7; i++) {
                    for (var j = 0; j < 24; j++) {
                        var tvalue = map[pd + i][ph + j];
                        if (!(af.hLine['h' + i] === 0)) {
                            af.hLine['h' + i] = tvalue;
                        };
                        if (!(af.sLine['s' + j] === 0)) {
                            af.sLine['s' + j] = tvalue;
                        };
                    }
                }
            }
            clearTimeout(toolbarCheckTimer);
            toolbarCheckTimer = setTimeout(doCheck, 200);
        },

        setValueMap: function setValueMap(valueObj) {
            var me = this;
            var map = me.valueMap;
            var af = me.actionFlags;
            af.hLine = {};
            af.sLine = {};
            for (var i = 0; i < 7; i++) {
                valueObj[pd + i] = valueObj[pd + i] || {};
                for (var j = 0; j < 24; j++) {
                    var tvalue = valueObj[pd + i][ph + j];
                    tvalue = tvalue ? tvalue : 0;
                    map[pd + i][ph + j] = tvalue;

                    if (!(af.hLine['h' + i] === 0)) {
                        af.hLine['h' + i] = tvalue;
                    };
                    if (!(af.sLine['s' + j] === 0)) {
                        af.hLine['s' + j] = tvalue;
                    };
                }
            }
        },
        resetValue: function resetValue() {
            var me = this;
            var ov = me.params && me.params.period || '';
            var valueObj = me.setStrToValueObj(ov);
            me.setValueMap(valueObj);
        },
        setActionArea: function setActionArea(flag) {
            var tagObj = {
                workday: 1,
                weekend: 0,
                all: 2
            };
            var tag = +tagObj[flag];
            for (var i = 0; i < 7; i++) {
                this.setDayLine(i, i < 5 && tag || i >= 5 && !tag || tag == 2);
            }
        },
        setDayLine: function setDayLine(day, value) {
            var me = this;
            var tvalue = +!me.actionFlags.hLine['h' + day];
            if (!util.isUndefined(value)) {
                tvalue = +!!value;
            };
            for (var i = 0; i < 24; i++) {
                me.valueMap[pd + day][ph + i] = tvalue;
            }
            me.checkeToolBarStatus();
        },
        setHourLine: function setHourLine(hour) {
            var me = this;
            var tvalue = +!me.actionFlags.sLine['s' + hour];
            for (var i = 0; i < 7; i++) {
                me.valueMap[pd + i][ph + hour] = tvalue;
            }
            me.checkeToolBarStatus();
        },
        setSingleActionFlag: function setSingleActionFlag(day, hour) {
            var me = this;
            var map = me.valueMap;
            var svalue = 1,
                hvalue = 1;
            if (!map[pd + day][ph + hour]) {
                svalue = 0;
                hvalue = 0;
            } else {
                for (var i = 0; i < 7; i++) {
                    if (!map[pd + i][ph + hour]) {
                        svalue = 0;
                        break;
                    };
                }
                for (i = 0; i < 24; i++) {
                    if (!map[pd + day][ph + i]) {
                        hvalue = 0;
                        break;
                    };
                }
            };
            me.actionFlags.sLine['s' + hour] = svalue;
            me.actionFlags.hLine['h' + day] = hvalue;
        },
        setSingleHour: function setSingleHour(day, hour) {
            var cValue = this.valueMap[pd + day][ph + hour];
            this.valueMap[pd + day][ph + hour] = +!cValue;
            this.setSingleActionFlag(day, hour);
        },

        setStrToValueObj: function setStrToValueObj(valueStr) {
            var valueObj = {};
            if (valueStr) {
                valueStr.split(';').map(function (item) {
                    var cstr = item.split('-');
                    var d = item[0] - 1;
                    valueObj[pd + d] = valueObj[pd + d] || {};
                    var start = +cstr[0].substr(1, 2);
                    var end = +cstr[1].substr(1, 2);
                    for (var i = start, j = end; i < j; i++) {
                        valueObj[pd + d][ph + i] = 1;
                    }
                });
            };
            return valueObj;
        }
    },
    ready: function ready() {
        this.resetValue();
    },
    data: function data() {
        var data = {
            actionFlags: {
                sLine: {},
                hLine: {}
            },
            valueMap: map,
            weekName: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
        };
        var af = data.actionFlags;
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 24; j++) {
                af.hLine['h' + i] = 0;
                af.sLine['s' + j] = 0;
            }
        }
        return data;
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=select-timer-control><div class=tip-bar><p class=action><span @click=\"setActionArea('workday')\">工作日</span>| <span @click=\"setActionArea('weekend')\">周末</span>| <span @click=\"setActionArea('all')\">全部</span>| <span @click=resetValue()>重置</span><p class=tip><span class=unselected-tip></span>暂停时间段<p class=tip><span class=selected-tip></span>投放时间段</div><div><ul class=week-container><li class=\"day-line day-th-line\"><ul class=day-container><li class=week-th><li v-for=\"hour in 24\" :class=\"{'hour-th':1,'selected':actionFlags.sLine['s'+hour]}\" @click=setHourLine(hour)><span class=sm-download></span></ul><li v-for=\"(day, $index) in 7\" class=day-line><ul class=day-container><li class=week-th :data-value=$index><label><input type=checkbox :checked=\"!!actionFlags.hLine['h'+day]\" @click=setDayLine(day) name=week-day> {{weekName[day]}}</label><li v-for=\"hour in 24\" @click=\"setSingleHour(day, hour)\">{{hour}}</ul></ul></div></div>"
