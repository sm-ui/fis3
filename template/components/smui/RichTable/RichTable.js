var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert(".simple-table{border:1px solid #e4e4e4;border-top:none;border-right:none}.simple-table .select-flip{position:absolute;z-index:9;width:80px;height:75px;padding:6px;line-height:2rem;border:1px solid #ddd;top:-1px;left:-1px;border-radius:2px;box-shadow:2px 2px #ccc;background-color:#eee}.simple-table .select-flip label{width:auto!important;display:block}.simple-table .plugin-items{display:inline-block;position:absolute;right:5px;top:10px}.simple-table thead.fixed{width:100%;position:absolute;display:none}.simple-table table{border-spacing:0;width:100%}.simple-table thead{background-color:#f5f5f5}.simple-table thead tr td{line-height:2em;vertical-align:baseline;background:#eee}.simple-table td[data-col=select]{width:50px}.simple-table td{color:#333;font-size:12px;line-height:1.5em;border-top:1px solid #e4e4e4;border-right:1px solid #e4e4e4;padding:8px 5px;position:relative;vertical-align:middle}")
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _ui = require('../base/ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var params = {
    cellTextMap: {},
    headTextMap: {},
    selected: [],
    fields: [],
    items: [],
    fieldWidth: {},
    headRow: ['fixed', 'origin']
};

var states = {
    selectHover: false,
    checkAllPages: false,
    needCheckAllPages: true,
    canCheckAllPages: false,
    indeterminate: false,
    checkAll: false
};

exports.default = {
    params: params,
    private: states,
    mixins: [_ui2.default],
    computed: {
        checkAll: function checkAll() {
            if (this.selected.length === 0) {
                this.indeterminate = 0;
                return false;
            } else if (this.selected.length === this.items.length) {
                this.indeterminate = 2;
                return true;
            } else if (this.selected.length < this.items.length) {
                this.indeterminate = 1;
                return false;
            }
        }
    },
    watch: {
        selected: function selected(value) {
            this.emit('selected-changed', value);
        },
        indeterminate: function indeterminate(value) {
            var $all = this.$el.querySelectorAll('.select-all');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)($all), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    item.checked = value === 2;
                    item.indeterminate = value === 1;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    },
    methods: {
        click: function click(event) {
            var option = event.target.dataset;
            var target = event.target.closest('td');
            this.emit('td-click', target);
            if (this.action && option.action && this.action.hasOwnProperty(option.action)) {
                var row = target.dataset.row;
                event.data = this.items[+row];
                event.field = target.dataset.col;
                event.option = option;
                this.action[option.action].call(this, event);
            }
        },
        selectAll: function selectAll(e) {
            if (e.target.checked) {
                this.selected = this.items.map(function (item, idx) {
                    return idx;
                });
            } else {
                this.selected = [];
            }
        },
        setFields: function setFields(fields) {
            this.fields = fields;
        },
        setItems: function setItems(items) {
            this.items = items;
        },
        getSelected: function getSelected() {
            return this.selected || [];
        },
        setSelected: function setSelected(value) {
            this.selected = value;
        },
        headFilter: function headFilter(field) {
            if (this.headTextMap) {
                return this.headTextMap[field] || field;
            } else {
                return field;
            }
        },
        cellFilter: function cellFilter(key, item) {
            var value = item[key];
            var cellTextMap = this.cellTextMap;
            if (cellTextMap && typeof cellTextMap[key] === 'function') {
                return item && cellTextMap[key].call(this, item[key], item, key);
            } else if (cellTextMap && cellTextMap.fieldFilter) {
                return item && cellTextMap.fieldFilter.call(this, item[key], item, key);
            } else {
                return value === null ? this.emptyText || '-' : item[key];
            }
        },
        headPlugin: function headPlugin(field) {},
        cellPlugin: function cellPlugin(field, item) {}
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=\"smui-table simple-table\"><table @click=click><thead v-for=\"hd in headRow\" :class=hd><tr><td v-if=selected data-col=select @mouseover=\"selectHover = true\"><input type=checkbox class=select-all v-model=checkAll :checked=checkAll @click=selectAll :id=\"hd + 'checkall-ipt'\"><div v-if=\"checkAll &amp;&amp; needCheckAllPages\" class=select-flip v-show=selectHover @mouseout=\"selectHover = false\"><label :for=\"hd + 'checkall-ipt'\"><input type=checkbox class=select-all v-model=checkAll :checked=checkAll @click=selectAll> 选择本页</label><label><input type=checkbox v-model=checkAllPages :checked=\"checkAll &amp;&amp; checkAllPages\" @click=\"checkAllPages == true\">选全部</label></div><td v-for=\"field in fields\" :data-col=field><div v-html=headFilter(field) :style=\"{width: fieldWidth[field] || '100px'}\"></div><div class=plugin-items v-html=headPlugin(field)></div><tbody><tr v-for=\"(row, item) in items\"><td v-if=selected :data-col=select><input type=checkbox v-model=selected :value=row><td v-for=\"field in fields\" :data-col=field :data-row=row><div v-html=\"cellFilter(field, item)\"></div><div class=plugin-items v-html=\"cellPlugin(field, item)\"></div></table></div>"
