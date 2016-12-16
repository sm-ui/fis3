var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert(".pager{text-align:center;vertical-align:middle;margin:10px 0;position:relative}.pager a{cursor:pointer}.pager .setter{display:inline-block;vertical-align:middle;line-height:1.5em;float:left}.pager .select-wrapper{line-height:30px}.pager .select-wrapper .select{z-index:5;line-height:30px;height:32px}.pager .go{float:right;display:inline-block;margin-right:20px;position:absolute;top:0;right:0}.pager .go input{line-height:30px;border-radius:2px;width:40px;border:1px solid #ddd;text-align:center}.pagination-wrapper{width:400px;margin:0 auto}.pagination{margin:0;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;vertical-align:middle}.pagination i{color:#333}.pagination .item:first-child{border-radius:.28571429rem 0 0 .28571429rem}.pagination .item:last-child{border-radius:0 .28571429rem .28571429rem 0}.pagination .item:last-child:before{display:none}.pagination .item{min-width:3em;text-align:center;line-height:30px;border:1px solid #ccc;margin-left:-1px}.pagination .active.item{background-color:rgba(0,0,0,.05);color:rgba(0,0,0,.95);box-shadow:none}.pagination .item.disabled,.pagination .item.disabled:hover{cursor:default;background-color:transparent!important;color:rgba(40,40,40,.3)}")
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _SelectList = require('../SelectList');

var _SelectList2 = _interopRequireDefault(_SelectList);

var _ui = require('../base/ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pageInfo = {
    sizeOptions: [20, 50, 100],
    currentPage: 1,
    pageSize: 20,
    totalSize: 100,
    displayNum: 6,
    items: false
};

exports.default = {
    replace: true,
    inherit: false,
    params: pageInfo,
    private: {
        pages: [],
        sizeList: [],
        edgeNum: 2
    },
    mixins: [_ui2.default],
    components: { SelectList: _SelectList2.default },
    ready: function ready() {
        if (this.items) {
            this.totalSize = this.items.length;
            this.totalPage = Math.ceil(this.totalSize / this.pageSize);
        }

        this.updatePages();

        this.sizeList = this.sizeOptions.map(function (x) {
            return { name: x, value: x };
        });

        this.selectPage(this.currentPage);
    },

    watch: {
        currentPage: function currentPage() {
            this.updatePages();
        },
        'params.pageSize': function paramsPageSize() {
            this.updatePages();
        },
        'params.totalSize': function paramsTotalSize() {
            (0, _assign2.default)(this, this.params);
            this.updatePages();
        },
        'params.totalPage': function paramsTotalPage() {
            (0, _assign2.default)(this, this.params);
            this.updatePages();
        },
        sizeOptions: function sizeOptions(value) {
            var sizer = this.$refs.sizer;

            sizer = sizer || this.$children[0];

            sizer.options = value;
            sizer.value = this.pageSize;
        }
    },
    computed: {
        noPrevious: function noPrevious() {
            return this.currentPage === 1;
        },
        noNext: function noNext() {
            return this.currentPage === this.totalPage;
        },
        totalPage: function totalPage() {
            return getTotalPage(this.pageSize, this.totalSize);
        }
    },
    methods: {
        updatePages: function updatePages() {
            this.pages = getPages(this.currentPage, this.totalPage, this.edgeNum, this.displayNum);
        },
        selectPage: function selectPage(num) {
            if (this.currentPage != num && num > 0 && num <= this.totalPage) {
                this.currentPage = num;
                this.emit('page-change', { currentPage: num });
            }
            if (this.items) {
                var start = this.pageSize * (this.currentPage - 1);
                var end = start + this.pageSize;
                var list = this.items.slice(start, end);
                this.emit('list-change', { list: list });
            }
        },
        pageTo: function pageTo(event) {
            var target = event.target;
            if (target.value > 0) {
                this.selectPage(target.value);
            }
        },
        selectSize: function selectSize(event) {
            var size = event.data.value;
            if (this.pageSize != size && size > 0) {
                this.pageSize = size;

                this.totalPage = Math.ceil(this.totalSize / this.pageSize);
                this.updatePages();

                if (this.currentPage > this.totalPage) {
                    this.selectPage(this.totalPage);
                } else {
                    this.selectPage(this.currentPage);
                }

                this.emit('size-change', {
                    totalPage: this.totalPage,
                    pageSize: this.pageSize
                });
            }
        }
    }
};


function getTotalPage(pageSize, totalSize) {
    var totalPage = pageSize < 1 ? 1 : Math.ceil(totalSize / pageSize);
    return Math.max(totalPage || 0, 1);
}

function makePage(number, text, isActive) {
    return {
        number: number,
        text: text,
        disabled: number === -1
    };
}

function getInterval(currentPage, pageCount, displayCount) {
    var half = Math.ceil(displayCount / 2);
    var np = pageCount;
    var upperLimit = np - displayCount;
    var start = currentPage > half ? Math.max(Math.min(currentPage - half, upperLimit), 0) : 0;
    var end = currentPage > half ? Math.min(currentPage + half, np) : Math.min(displayCount, np);
    return [start, end];
}

function getPages(currentPage, totalPage, edgeCount, displayCount) {
    var ret = [];
    var skipText = '...';
    var np = totalPage;
    var interval = getInterval(currentPage - 1, totalPage, displayCount);

    if (interval[0] > 0 && edgeCount > 0) {
        var end = Math.min(edgeCount, interval[0]);
        for (var i = 0; i < end; i++) {
            var page = makePage(i + 1, i + 1);
            ret.push(page);
        }
        if (edgeCount < interval[0]) {
            var page = makePage(-1, skipText);
            ret.push(page);
        }
    }

    for (var i = interval[0]; i < interval[1]; i++) {
        var page = makePage(i + 1, i + 1);
        ret.push(page);
    }

    if (interval[1] < np && edgeCount > 0) {
        if (np - edgeCount > interval[1]) {
            var page = makePage(-1, skipText);
            ret.push(page);
        }
        var begin = Math.max(np - edgeCount, interval[1]);
        for (var i = begin; i < np; i++) {
            var page = makePage(i + 1, i + 1);
            ret.push(page);
        }
    }

    return ret;
}
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=\"pager menu\" v-show=\"totalPage > 0\"><div class=setter v-if=\"sizeOptions.length > 1\">每页显示：<select-list :params=\"{items: sizeList, value: pageSize}\" @value-change=selectSize ref:sizer=\"\"></select-list></div><div class=pagination-wrapper><div class=pagination><a class=\"icon item\" v-bind:class=\"{ 'disabled': noPrevious }\" v-on:click=\"selectPage(currentPage - 1)\"><i class=sm-arrow-left></i> </a><a class=item v-for=\"page in pages\" track-by=$index v-bind:class=\"{ 'active': page.number == currentPage, 'disabled': page.disabled }\" v-on:click=selectPage(page.number)>{{page.text}} </a><a class=\"icon item\" v-bind:class=\"{ 'disabled': noNext }\" v-on:click=\"selectPage(currentPage + 1)\"><i class=sm-arrow-right></i></a></div></div><div class=go v-if=\"totalPage > 3\">跳转到： <input type=number :value=currentPage @change.prevent=pageTo size=4 min=1 :max=totalPage></div></div>"
