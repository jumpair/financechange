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

function isEmpty(t) {
    if (Array.isArray(t)) return 0 === t.length;
    if ("object" !== _typeof(t)) return !t;
    if (t) for (var o in t) return !1;
    return !0;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _default = isEmpty;

exports.default = _default;