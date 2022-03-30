var _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

function _typeof(t) {
    return (_typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function(t) {
        return void 0 === t ? "undefined" : _typeof2(t);
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : _typeof2(t);
    })(t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var hasOwnProperty = Object.prototype.hasOwnProperty;

function is(t, o) {
    return t === o ? 0 !== t || 0 !== o || 1 / t == 1 / o : t != t && o != o;
}

function shallowEqual(t, o) {
    if (is(t, o)) return !0;
    if ("object" !== _typeof(t) || null === t || "object" !== _typeof(o) || null === o) return !1;
    var e = Object.keys(t), r = Object.keys(o);
    if (e.length !== r.length) return !1;
    for (var n = 0; n < e.length; n++) if (!hasOwnProperty.call(o, e[n]) || !is(t[e[n]], o[e[n]])) return !1;
    return !0;
}

var _default = shallowEqual;

exports.default = _default;