var _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
};

function _typeof(o) {
    return (_typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function(o) {
        return void 0 === o ? "undefined" : _typeof2(o);
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : void 0 === o ? "undefined" : _typeof2(o);
    })(o);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var hasOwn = {}.hasOwnProperty;

function classNames() {
    for (var o = [], t = 0; t < arguments.length; t++) {
        var e = arguments[t];
        if (e) {
            var r = _typeof(e);
            if ("string" === r || "number" === r) o.push(e); else if (Array.isArray(e) && e.length) {
                var n = classNames.apply(null, e);
                n && o.push(n);
            } else if ("object" === r) for (var f in e) hasOwn.call(e, f) && e[f] && o.push(f);
        }
    }
    return o.join(" ");
}

var _default = classNames;

exports.default = _default;