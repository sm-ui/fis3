<template>
<div class="smui-table simple-table">
    <table @click="click">
        <thead v-for="hd in headRow" :class="hd">
            <tr>
                <td v-if="selected" data-col="select">
                    <div class="select-flip" :class="{expand: checkAll}">
                    <label>
                        <input type="checkbox" class="select-all" 
                            v-model="checkAll" :checked="checkAll"
                            @click="selectAll">
                        <span v-if="checkAll">选择本页</span>
                    </label>
                    <label v-if="checkAll">
                        <input type="checkbox" v-model="checkAllPages"
                            :checked="checkAll && checkAllPages"
                            @click="checkAllPages == true">选全部
                    </label>
                    </div>
                </td>
                <td v-for="field in fields" :data-col="field">
                    <div v-html="headFilter(field)" 
                        :style="{width: fieldWidth[field] || '100px'}"></div>
                    <div class="plugin-items" v-html="headPlugin(field)"></div>
                </td>
            </tr>
        </thead>
        <tbody>
        {{items.length}}
        <tr v-for="item in items">
            <td v-for="field in fields">{{item[field]}}</td>
        </tr>
        
        </tbody>
    </table>
</div>
</template>

<script type="text/javascript">

import Vue from 'vue'
var params = {
    cellTextMap: {},
    headTextMap: {},
    selected: [],
    fields: [],
    items: [],
    fieldWidth: {},
    selectHover: false,
    checkAllPages: false,
    headRow: ['fixed', 'origin'],
    indeterminate: false,
    checkAll: false
}

export default {
    params,
    computed: {
        checkAll () {
            if (this.selected.length === 0) {
                this.indeterminate = 0
                return false
            }
            else if (this.selected.length === this.items.length) {
                this.indeterminate = 2
                return true
            }
            else if (this.selected.length < this.items.length) {
                this.indeterminate = 1
                return false
            }
        }
    },
    watch: {
        selected (value) {
            window.vm = this
            this.emit('selected-changed', value)
        },
        indeterminate (value) {
            var $all = this.$el.querySelectorAll('.select-all')
            for (let item of $all) {
                item.checked = value === 2
                item.indeterminate = value === 1
            }
        }
    },
    methods: {
        click (event) {
            var option = event.target.dataset;
            var target = event.target.closest('td');
            this.emit('td-click', target);
            if (this.action && option.action 
                && this.action.hasOwnProperty(option.action)) {
                var row = target.dataset.row;
                event.data = this.items[+row];
                event.field = target.dataset.col;
                event.option = option;
                this.action[option.action].call(this, event);
            }
        },
        selectAll (e) {
            if (e.target.checked) {
                this.selected = this.items.map((item, idx) => {return idx})
            }
            else {
                this.selected = [];
            }
        },
        setFields (fields) {
            this.fields = fields;
        },
        setItems (items) {
            this.items = items;
        },
        getSelected () {
            return this.selected || [];
        },
        setSelected (value) {
            this.selected = value;
        },
        headFilter (field) {
            if (this.headTextMap) {
                return this.headTextMap[field] || field;
            }
            else {
                return field;
            }
        },
        cellFilter (key, item) {
            var value = item[key];
            var cellTextMap = this.cellTextMap;
            if (cellTextMap && typeof cellTextMap[key] === 'function') {
                return item && cellTextMap[key].call(this, item[key], item, key);
            } else if (cellTextMap && cellTextMap.fieldFilter) {
                // 如果没有对应字段处理函数，使用默认通用字段解析函数（fieldFilter）
                return item && cellTextMap.fieldFilter.call(this, item[key], item, key);
            }
            else {
                return value === null ? (this.emptyText || '-') : item[key];
            }
        },
        headPlugin (field) {

        },
        cellPlugin (field, item) {

        }
    }
};

</script>

<style type="text/css" lang="less">
.simple-table {
    border: 1px solid #e4e4e4;
    border-top: none;
    border-right: none;
    .select-flip {
        position: absolute;
        padding: 0;
        z-index: 9;
        width: 18px;
        height: 25px;
        overflow: hidden;
        label {
            width: auto!important;
        }
    }
    .select-flip.expand:hover {
        background: #FFF;
        border: 1px solid #f5f5f5;
        width: 130px;
    }
    .plugin-items {
        display: inline-block;
        position: absolute;
        right: 5px;
        top: 10px;
    }
    thead.fixed {
        width: 100%;
        position: absolute;
        display: none;
    }
    table {
        border-spacing: 0;
        width: 100%;
    }
    thead {
        background-color: #f5f5f5;
        tr td {
            line-height: 2em;
            vertical-align: baseline;
            background: #EEE;
        }
    }

    td[data-col="select"] {
        width: 50px;
    }
    td {
        color: #333;
        font-size: 12px;
        line-height: 1.5em;
        border-top: 1px solid #e4e4e4;
        border-right: 1px solid #e4e4e4;
        padding: 8px 5px;
        position: relative;
        vertical-align: middle;
    }
}
</style>