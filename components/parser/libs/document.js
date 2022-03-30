function _defineProperty(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var _createClass = function() {
    function s(t, e) {
        for (var n = 0; n < e.length; n++) {
            var s = e[n];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(t, s.key, s);
        }
    }
    return function(t, e, n) {
        return e && s(t.prototype, e), n && s(t, n), t;
    };
}(), MpHtmlParser = require("./MpHtmlParser.js"), element = function() {
    function h(t, e, n) {
        _classCallCheck(this, h), t.attrs = t.attrs || {}, t.children = t.children || [], 
        this.nodeName = t.name, this.id = t.attrs.id, this._node = t, this.childNodes = [];
        for (var s = 0; s < t.children.length; s++) t.children[s].name && this.childNodes.push(new h(t.children[s], e + ".children[" + s + "]", this._context));
        this.attributes = this._node.attrs, this.style = {};
        for (var i, r = (t.attrs.style || "").split(";"), s = 0; s < r.length; s++) r[s].includes(":") && (i = r[s].split(":"), 
        this.style[i[0]] = i[1]);
        this._path = e, this._context = n, this._dirty = !1;
    }
    return _createClass(h, [ {
        key: "appendChild",
        value: function(t) {
            return t.constructor == h && (this.childNodes.push(t), this._node.children.push(t._node), 
            t.path = this._path + ".children[" + (this._node.children.length - 1) + "]", this._setData(), 
            !0);
        }
    }, {
        key: "removeChild",
        value: function(t) {
            if (t.constructor != h) return !1;
            t = this.childNodes.indexOf(t);
            return -1 != t && (this.childNodes.splice(t, 1), this._node.children.splice(t, 1), 
            this._setData(), !0);
        }
    }, {
        key: "replaceChild",
        value: function(t, e) {
            if (t.constructor != h) return !1;
            if (e.constructor != h) return !1;
            t = this.childNodes.indexOf(child);
            return -1 != t && (this.childNodes[t] = e, this._node.children[t] = e._node, e.path = this._path + ".children[" + t + "]", 
            !0);
        }
    }, {
        key: "getAttribute",
        value: function(t) {
            return this._node.attrs.hasOwnProperty(t) ? this._node.attrs[t] : null;
        }
    }, {
        key: "setAttribute",
        value: function(t, e) {
            return this._node.attrs[t] = e, this._setData(), !0;
        }
    }, {
        key: "getStyle",
        value: function(t) {
            return t = t.replace(/(A-Z)/g, "-$1").toLowerCase(), this.style.hasOwnProperty(t) ? this.style[t] : null;
        }
    }, {
        key: "setStyle",
        value: function(t, e) {
            if (t = t.replace(/(A-Z)/g, "-$1").toLowerCase(), this.style.hasOwnProperty(t)) {
                this.style[t] = e;
                var n, s = "";
                for (n in this.style) s += n + ":" + this.style[n] + ";";
                this._node.attrs.style = s;
            } else this._node.attrs.style = (this._node.attrs.style || "") + ";" + t + ":" + e;
            return this._setData(), !0;
        }
    }, {
        key: "_search",
        value: function(t, e, n, s) {
            if ("text" != t.type) {
                if ("id" == s && t.attrs && t.attrs.id == n) return this._nodeList.push(new h(t, e, this._context));
                if (("name" == s && t.name == n || "class" == s && t.attrs && t.attrs.class == n) && this._nodeList.push(new h(t, e, this._context)), 
                t.children && t.children.length) for (var i = t.children.length; i--; ) this._search(t.children[i], e + ".children[" + i + "]", n, s);
            }
        }
    }, {
        key: "getElementById",
        value: function(t) {
            return this._nodeList = [], this._search(this._node, this._path, t, "id"), this._nodeList[0];
        }
    }, {
        key: "getElementsByClassName",
        value: function(t) {
            return this._nodeList = [], this._search(this._node, this._path, t, "class"), this._nodeList;
        }
    }, {
        key: "getElementsByTagName",
        value: function(t) {
            return this._nodeList = [], this._search(this._node, this._path, t, "name"), this._nodeList;
        }
    }, {
        key: "_setData",
        value: function() {
            var t = this;
            this._dirty = !0, setTimeout(function() {
                t._dirty && (t._context._refresh = !0, t._context.setData(_defineProperty({}, t._path, t._node)), 
                t._dirty = !1);
            }, 0);
        }
    }, {
        key: "innerText",
        get: function() {
            return this._context.getText([ this._node ]);
        },
        set: function(t) {
            this._node.children = [ {
                type: "text",
                text: t
            } ], this.childNodes = [], this._setData();
        }
    }, {
        key: "innerHtml",
        get: function() {
            return function t(e) {
                var n = "";
                if ("text" == e.type) n += e.text; else {
                    for (var s in n += "<" + e.name, e.attrs) e.attrs[s] && (n += " " + s + '="' + e.attrs[s] + '"');
                    if (e.children && e.children.length) {
                        n += ">";
                        for (var i = 0; i < e.children.length; i++) n += t(e.children[i]);
                        n += "</" + e.name + ">";
                    } else n += "/>";
                }
                return n;
            }(this._node);
        },
        set: function(t) {
            this._node.children = new MpHtmlParser(t, this._context.data).parse();
            for (var e = 0; e < this._node.children.length; e++) this._node.children[e].name && this.childNodes.push(new h(this._node.children[e], path + ".children[" + e + "]", this._context));
        }
    } ]), h;
}(), dom = function() {
    function s(t, e, n) {
        _classCallCheck(this, s), this._nodes = t, this._path = e, this._context = n;
    }
    return _createClass(s, [ {
        key: "_search",
        value: function(t, e, n, s) {
            for (var i, r = 0; i = (t || [])[r]; r++) if ("text" != i.type) {
                if ("id" == s && i.attrs && i.attrs.id == n) return this._nodeList.push(new element(i, e + "[" + r + "]", this._context));
                ("name" == s && i.name == n || "class" == s && i.attrs && i.attrs.class == n) && this._nodeList.push(new element(i, e + "[" + r + "]", this._context)), 
                this._search(i.children, e + "[" + r + "].children", n, s);
            }
        }
    }, {
        key: "getElementById",
        value: function(t) {
            return this._nodeList = [], this._search(this._nodes, this._path, t, "id"), this._nodeList[0];
        }
    }, {
        key: "getElementsByClassName",
        value: function(t) {
            return this._nodeList = [], this._search(this._nodes, this._path, t, "class"), this._nodeList;
        }
    }, {
        key: "getElementsByTagName",
        value: function(t) {
            return this._nodeList = [], this._search(this._nodes, this._path, t, "name"), this._nodeList;
        }
    }, {
        key: "createElement",
        value: function(t) {
            return new element({
                name: t
            }, "", this._context);
        }
    }, {
        key: "write",
        value: function(t) {
            return this._context.setData(_defineProperty({}, this._path, t.constructor == Array ? t : new MpHtmlParser(t, this._context.data).parse())), 
            !0;
        }
    } ]), s;
}();

module.exports = dom;