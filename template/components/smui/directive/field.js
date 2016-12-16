'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Helper = require('./helper');

function Field(el, option) {
    var field = this;
    this.el = el;
    this.name = option.name;
    this.text = option.text;
    var helpInfo = Field.helpInfo[this.name];
    if (helpInfo) {
        this.maxLen = helpInfo.maxByteLength;
    }
    this.maxLen = this.maxLen || el.getAttribute('maxlength');
    this.wildcard = !!option.wildcard;

    this.helper = new Helper({
        name: this.name,
        maxLen: this.maxLen,
        wildcard: this.wildcard,
        el: el
    });

    if (!el.name) {
        el.name = this.name;
    }
    this.option = option;

    this.state = {
        valid: true,
        error: '',
        message: ''
    };

    this.__defineGetter__('value', function () {
        return this.el.value;
    });

    this.el.validate = function () {
        return field.validate();
    };

    // 为了解决后置填充内容校验问题
    // setTimeout(function () {
    //     field.validate();
    // }, 500);
    // field.validate();
    this.init();
}

Field.prototype.state = {};

Field.prototype.events = {
    change: function change(e) {
        this.validate();
        var vm = (this.el.__v_model || {}).vm;
        if (vm) {
            var e = {
                data: {},
                target: this
            };
            e.data[this.name] = this.value;
            vm.$emit('change', e);
        }
    },
    keyup: function keyup(e) {
        this.validate();
    }
};

// es6 强制转换Object.keys等函数
function firstValue(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            return obj[key];
        }
    }
}

function isNumber(code) {
    if (48 <= code && code <= 57) {
        return true;
    }
    if (96 <= code && code <= 105) {
        return true;
    }
    if (38 <= code && code <= 40) {
        return true;
    }
    if (code === 190 || code === 8) {
        return true;
    }
    return false;
}

// check 函数需要定制
Field.check = function (name, value, text) {
    return true;
};

Field.helpInfo = {};

Field.prototype.validate = function () {
    var info = Field.check(this.name, this.value, this.text);
    if (info !== true) {
        var msg = firstValue(info);
        this.el.setCustomValidity(msg);
    } else {
        this.el.setCustomValidity('');
    }
    if (this.el.showMessage) {
        this.el.showMessage();
    }
    return this.el.valid;
};

Field.prototype.showMessage = function () {
    return vaidator.check(this.name, this.value);
};

Field.prototype.init = function () {
    this.el.classList.add('field');
    this.addEvents();
};

Field.prototype.addEvents = function () {
    var el = this.el;
    for (var e in this.events) {
        el.addEventListener(e, this.events[e].bind(this));
    }
    if (el && el.type === 'number') {
        el.onkeydown = function (e) {
            if (!isNumber(e.keyCode)) {
                return false;
            }
            return true;
        };
    }
};

Field.prototype.removeEvents = function () {
    var el = this.el;
    for (var e in this.events) {
        el.removeEventListener(e, this.events[e]);
    }
};

_vue2.default.directive('field', {
    update: function update(option) {
        if (!this.field) {
            this.field = new Field(this.el, option);
        }
    },
    unbind: function unbind() {
        this.field.removeEvents();
    }
});

module.exports = Field;