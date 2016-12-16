function insertCSS(require, exports, module) {
    var inserted = {};
    exports.cache = {}
    exports.insert = function (css, id) {
        id = id || css;
        if (inserted[id]) {
            return;
        }
        inserted[id] = true;

        var elem = document.createElement('style');
        elem.setAttribute('type', 'text/css');

        if ('textContent' in elem) {
            elem.textContent = css;
        } else {
            elem.styleSheet.cssText = css;
        }
        document.getElementsByTagName('head')[0].appendChild(elem);
        return elem;
    };
};

function insertTpl(require, exports, module) {
    var inserted = exports.cache = {};
    exports.insert = function (tpl, uid) {
        uid = uid || tpl;
        if (inserted[uid]) {
            return;
        }
        inserted[uid] = tpl;

        var elem = document.createElement('template');
        elem.setAttribute('type', 'text/template');
        if ('textContent' in elem) {
            elem.textContent = tpl;
        }
        else {
            elem.innerText = tpl;
        }
        document.getElementsByTagName('body')[0].appendChild(elem);
        return elem;
    };
};

define('vueify-insert-css', insertCSS);
// define('vueify-insert-tpl', insertTpl);


import Vue from 'vue'
import App from './App.vue'

let dataList = new Array(100).fill(1).map(
    (item, idx) => {
        return {
            title: 'user' + idx,
            author: Math.ceil(Math.random() * 1000).toString(32),
            visitor: idx + 5
        }
    }
);

let treeData = [
    {
        name: '前端',
        link: '#front',
        children: [
            {name: 'JS', link:'#js'},
            {name: 'HTML', link:'#html'},
            {name: 'CSS', link:'#css'}
        ]
    },
    {
        name: 'Java',
        link: '#front',
        children: [
            {name: 'Java', link:'#js'},
            {name: 'J2EE', link:'#html'},
            {name: 'J2ME', link:'#css'}
        ]
    },
    {
        name: 'PHP',
        link: '#front',
        children: [
            {name: 'php', link:'#js'},
            {name: 'smarty', link:'#html'},
            {name: 'fuel', link:'#css'}
        ]
    }
]

let tabList = [
    {name: '表格', tab: 'table'},
    {name: '表单', tab: 'form'},
    {
        name: '消息',
        tab: 'dialog',
        subTab: 'message',
        children: [
            {name: '消息', tab: 'message'},
            {name: '弹窗', tab: 'dialog'}
        ]
    }
]

let scrumList = [
    {text: '计划', name: 'plan'},
    {text: '单元', name: 'unit'},
    {text: '关键词', name: 'keyword'}
]

let searchTitle = ''


let app = new Vue({
    el: '#main',
    extends: App,
    data() {
        return {
            params: {
                searchTitle,
                scrumList,
                tabList,
                dataList,
                treeData
            }
        }
    }
})