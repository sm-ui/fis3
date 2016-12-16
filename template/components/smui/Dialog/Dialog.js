'use strict';

var _util = require('../base/util');

var _util2 = _interopRequireDefault(_util);

var _index = require('../DialogPanel/index');

var _index2 = _interopRequireDefault(_index);

var _Prompt = require('./Prompt');

var _Prompt2 = _interopRequireDefault(_Prompt);

var _Toast = require('./Toast');

var _Toast2 = _interopRequireDefault(_Toast);

var _InlineDialog = require('./InlineDialog');

var _InlineDialog2 = _interopRequireDefault(_InlineDialog);

var _Loading = require('./Loading');

var _Loading2 = _interopRequireDefault(_Loading);

var _Popup = require('./Popup');

var _Popup2 = _interopRequireDefault(_Popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dialog = _util2.default.wrapper(_index2.default);
Dialog.InlineDialog = _InlineDialog2.default;
Dialog.DialogPanel = _index2.default;
Dialog.Toast = _Toast2.default;

Dialog.toast = function (option) {
    var Factor = _util2.default.wrapper(_Toast2.default);
    var toast = new Factor();
    toast.show(option);
    return toast;
};

Dialog.popup = function (option) {
    var Factor = _util2.default.wrapper(_Popup2.default);
    var pop = new Factor();
    pop.show(option);
    return pop;
};

Dialog.loading = function (option) {
    var Factor = _util2.default.wrapper(_Loading2.default);
    var loading = new Factor();
    loading.show(option);
    return loading;
};

Dialog.alert = function (message, ensure) {
    var dialog = new Dialog({
        data: {
            width: '200'
        }
    });

    if ('string' === typeof message) {
        message = {
            content: message,
            needClose: false,
            needCancel: false
        };
    }

    dialog.showModal(message);
    dialog.$on('ensure', function () {
        ensure && ensure.call(dialog);
        dialog.close();
    });
    return dialog;
};

Dialog.confirm = function (message, ensure, cancel) {
    var dialog = new Dialog({
        data: {
            width: 200,
            needClose: false,
            needCancel: true
        }
    });

    if ('string' === typeof message) {
        message = {
            content: message
        };
    }

    dialog.showModal(message);
    dialog.$on('ensure', function () {
        ensure && ensure.call(dialog);
        dialog.close();
    });

    dialog.$on('closed', function () {
        cancel && cancel.call(dialog);
    });
    return dialog;
};

Dialog.prompt = function (option, ensure, cancel) {
    if (typeof option === 'string') {
        option = {
            title: option,
            type: 'text'
        };
    }

    if (option.options) {
        option.type = 'select';
    }
    if (!option.type) {
        option.type = 'text';
    }
    if (!option.error) {
        option.error = '';
    }
    option.needClose = false;

    var c = option.container;

    var dialog = new Dialog({
        container: c,
        data: option,
        content: _Prompt2.default
    });

    if (option.container) {
        dialog.show(option);
    } else {
        dialog.showModal();
    }

    dialog.$on('finished', function (e) {
        ensure && ensure.call(dialog, e.value);
        dialog.close();
    });

    dialog.$on('cancel', function () {
        cancel && cancel.call(dialog);
        dialog.close();
    });
    return dialog;
};

exports.inlineEdit = function (option, ensure, cancel) {
    option = Object.assign(option, { inline: true, needClose: true, needFooter: true });
    return exports.prompt(option, ensure, cancel);
};

Object.assign(Dialog, exports);

module.exports = Dialog;