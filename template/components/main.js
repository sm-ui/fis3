
function insertCss(require, exports, module) {
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
}

define('vueify-insert-css', insertCss)


define('vueify/lib/insert-css', insertCss)

define('vue', function () {
    return Vue
})