'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.extend = function (target, source) {
    Object.assign(target, source);
    return target;
};

exports.isEqual = function (obj, target) {
    return Object.is(obj, target);
};

exports.byteLength = function (str) {
    return str.replace(/[^\x00-\xff]/g, 'xx').length;
};

exports.wrapper = function (Comp) {
    if (_vue2.default.version.charAt(0) > 1) {
        return function (option) {
            option.extends = Comp;
            return new _vue2.default(option);
        };
    } else if (_vue2.default.extend) {
        return _vue2.default.extend({
            mixins: [Comp],
            el: function el() {
                var dom = document.createElement('div');
                dom.class = 'dialog-instance';
                document.body.appendChild(dom);
                return dom;
            }
        });
    }
};