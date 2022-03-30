function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function matchClass(e, t) {
    if (!(e && e.length && t && t.length)) return !1;
    if (1 == e.length && 1 == t.length) return e[0] == t[0];
    if (e.length < t.length) return !1;
    for (var n = t; n--; ) {
        for (var r = !1, i = e.length; i--; ) e[i] == t[n] && (r = !0);
        if (!r) return !1;
    }
    return !0;
}

function matchStyle(e, t, n, r) {
    if ("*" == r) return 0;
    var i = r.match(/^[^\.#\s]+/), s = r.match(/\.[^\.#\s]+/g), r = r.match(/#[^\.#\s]+/);
    return r ? n != r || s && !matchClass(t, s) || i && e != i[0] ? -1 : 2 : s ? !matchClass(t, s) || i && e != i[0] ? -1 : 1 : i && e == i[0] ? 0 : -1;
}

function parseCss(n, e, t) {
    function r() {
        for (var e = 1, t = i + 1; t < n.length; t++) if ("{" == n[t]) e++; else if ("}" == n[t] && 0 == --e) break;
        s = t + 1;
    }
    var i, s = 0;
    for (n = n.replace(/\/\*[\s\S]*?\*\//g, ""); s < n.length && -1 != (i = n.indexOf("{", s)); ) {
        var a = n.substring(s, i);
        if ("@" != a[0]) if ("}" == (a = a.trim())[0] && (a = a.substring(1)), "." == a[0] || "#" == a[0] || "[" == a[0] || "*" == a[0] || "a" <= a && a <= "z" || "A" <= a && a <= "Z") {
            var l = a.split(","), s = i + 1;
            if (-1 == (i = n.indexOf("}", s))) break;
            var u = n.substring(s, i);
            s = i + 1;
            for (var o = 0; o < l.length; o++) {
                var c, h = {
                    key: l[o].trim(),
                    content: u
                };
                if (h.key.includes(":")) {
                    var f = h.key.split(":");
                    if (h.key = f[0].trim(), h.pseudo = f.pop(), "before" != h.pseudo && "after" != h.pseudo) continue;
                }
                h.key.includes("[") && (h.attr = [], h.key = h.key.replace(/\[(.+?)\]/g, function(e, t) {
                    var n, r;
                    return t.includes("=") ? (('"' == (r = (n = t.split("="))[1].trim())[0] && '"' == r[r.length - 1] || "'" == r[0] && "'" == r[r.length - 1]) && (r = r.substring(1, r.length - 1)), 
                    h.attr.push({
                        name: n[0].trim(),
                        value: r
                    })) : h.attr.push({
                        name: t.trim()
                    }), "";
                }).trim(), h.key || (h.key = "*")), (h.key.includes(" ") || h.key.includes(">")) && (c = h.key.replace(/\s*>\s*/g, " >").split(/\s+/), 
                h.list = c, h.key = c[0], h.index = 0), e.push(h);
            }
        } else r(); else "@media" == a.substring(0, 6) ? (f = a.match(/\((.+?):(.+?)\)/)) && f[2].includes("px") && (a = parseInt(f[2]), 
        "min-width" == f[1] && a < t || "max-width" == f[1] && t < a ? s = i + 1 : r()) : r();
    }
}

var _createClass = function() {
    function r(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(e, t, n) {
        return t && r(e.prototype, t), n && r(e, n), e;
    };
}(), cfg = require("./config.js"), CssHandler = function() {
    function a() {
        var t = this, e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments[1];
        _classCallCheck(this, a), this.getStyle = function(e) {
            return parseCss(e, t.styles, t.screenWidth);
        }, this.screenWidth = n, this.styles = [];
        var r, i, s = Object.assign({}, cfg.userAgentStyles);
        for (r in e) s[r] = (s[r] ? s[r] + ";" : "") + e[r];
        for (i in s) this.styles.push({
            key: i,
            content: s[i]
        });
    }
    return _createClass(a, [ {
        key: "match",
        value: function(e, t, n) {
            var r = [];
            if (t.class) for (var i = t.class.split(/\s+/), s = i.length; s--; ) r.unshift("." + i[s]);
            var a, l = "", u = "", o = "", c = !1;
            n.i = [], n.index = [], n.pseudo = [];
            for (var h, s = 0; h = this.styles[s]; s++) {
                c = ">" == h.key[0] ? (a = h.key.substring(1), !0) : (a = h.key, !1);
                var f = matchStyle(e, r, t.id ? "#" + t.id : "", a);
                if (-1 != f) if (h.hasOwnProperty("index") && h.index != h.list.length - 1) n.i.push(s), 
                n.index.push(h.index), h.index++, h.key = h.list[h.index]; else {
                    var d = !0;
                    if (h.attr) for (var p = 0; p < h.attr.length; p++) h.attr[p].hasOwnProperty("value") ? t[h.attr[p].name] != h.attr[p].value && (d = !1) : t.hasOwnProperty(h.attr[p].name) || (d = !1);
                    d && (h.pseudo ? n.pseudo.push(h) : 0 == f ? l += ";" + h.content : 1 == f ? u += ";" + h.content : o += ";" + h.content);
                }
                c && (n.i.push(s), n.index.push(h.index), h.index--, h.key = h.list[h.index]);
            }
            return n.i.length || (n.i = void 0, n.index = void 0), n.pseudo.length || (n.pseudo = void 0), 
            l + ";" + u + ";" + o + ";";
        }
    }, {
        key: "pop",
        value: function(n) {
            if (n.i) {
                for (var e = 0; e < n.i.length; e++) {
                    var t = n.i[e];
                    this.styles[t].key = this.styles[t].list[n.index[e]], this.styles[t].index = n.index[e];
                }
                n.i = void 0, n.index = void 0;
            }
            if (n.pseudo) {
                var r = !0, i = !1, s = void 0;
                try {
                    for (var a = n.pseudo[Symbol.iterator](); !(r = (o = a.next()).done); r = !0) {
                        var l, u = o.value, o = {
                            name: "span",
                            attrs: {
                                style: u.content.replace(/content:([^;\n]*)/, function(e, t) {
                                    return l = t.replace(/attr\((.+?)\)/, function(e, t) {
                                        return n.attrs[t.trim()] || "";
                                    }).replace(/\s*['"](.*?)['"]\s*/g, "$1").replace(/\\(\w{4})/, function(e, t) {
                                        return String.fromCharCode(parseInt(t, 16));
                                    }), "";
                                })
                            },
                            children: [ {
                                type: "text",
                                text: l
                            } ]
                        };
                        "before" == u.pseudo ? n.children.unshift(o) : n.children.push(o);
                    }
                } catch (n) {
                    i = !0, s = n;
                } finally {
                    try {
                        !r && a.return && a.return();
                    } finally {
                        if (i) throw s;
                    }
                }
            }
        }
    } ]), a;
}();

module.exports = CssHandler;