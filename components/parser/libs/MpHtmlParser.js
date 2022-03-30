function _classCallCheck(t, s) {
    if (!(t instanceof s)) throw new TypeError("Cannot call a class as a function");
}

var _createClass = function() {
    function e(t, s) {
        for (var i = 0; i < s.length; i++) {
            var e = s[i];
            e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), 
            Object.defineProperty(t, e.key, e);
        }
    }
    return function(t, s, i) {
        return s && e(t.prototype, s), i && e(t, i), t;
    };
}(), cfg = require("./config.js"), blankChar = cfg.blankChar, CssHandler = require("./CssHandler.js"), _wx$getSystemInfoSync = wx.getSystemInfoSync(), screenWidth = _wx$getSystemInfoSync.screenWidth, system = _wx$getSystemInfoSync.system;

try {
    var emoji = require("./emoji.js");
} catch (t) {}

var MpHtmlParser = function() {
    function e(t) {
        var s = this, i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
        _classCallCheck(this, e), this.isClose = function() {
            return ">" == s.data[s.i] || "/" == s.data[s.i] && ">" == s.data[s.i + 1];
        }, this.section = function() {
            return s.data.substring(s.start, s.i);
        }, this.siblings = function() {
            return s.STACK.length ? s.STACK[s.STACK.length - 1].children : s.DOM;
        }, this.attrs = {}, this.compress = i.compress, this.CssHandler = new CssHandler(i.tagStyle, screenWidth), 
        this.data = t, this.domain = i.domain, this.DOM = [], this.i = 0, this.protocol = this.domain && this.domain.includes("://") ? this.domain.split("://")[0] : "http", 
        this.start = 0, this.state = this.Text, this.STACK = [], this.audioNum = 0, this.imgNum = 0, 
        this.videoNum = 0, this.useAnchor = i.useAnchor;
    }
    return _createClass(e, [ {
        key: "parse",
        value: function() {
            emoji && (this.data = emoji.parseEmoji(this.data));
            for (var t; t = this.data[this.i]; this.i++) this.state(t);
            for (this.state == this.Text && this.setText(); this.STACK.length; ) this.popNode(this.STACK.pop());
            return this.DOM.length && (this.DOM[0].PoweredBy = "Parser", this.title && (this.DOM[0].title = this.title)), 
            this.DOM;
        }
    }, {
        key: "setAttr",
        value: function() {
            var t = this.attrName.toLowerCase();
            for (cfg.trustAttrs[t] && (this.attrVal ? this.attrs[t] = "src" == t ? this.getUrl(this.attrVal) : this.attrVal : cfg.boolAttrs[t] && (this.attrs[t] = "T")), 
            this.attrVal = ""; blankChar[this.data[this.i]]; ) this.i++;
            this.isClose() ? this.setNode() : (this.start = this.i, this.state = this.AttrName);
        }
    }, {
        key: "setText",
        value: function() {
            var t, s = this.section();
            if (s) if (s = cfg.onText && cfg.onText(s, function() {
                return t = !0;
            }) || s, t) {
                this.data = this.data.substr(0, this.start) + s + this.data.substr(this.i);
                var i = this.start + s.length;
                for (this.i = this.start; this.i < i; this.i++) this.state(this.data[this.i]);
            } else {
                if (!this.pre) {
                    for (var e, a = [], r = s.length; e = s[--r]; ) blankChar[e] && (blankChar[a[0]] || !(e = " ")) || a.unshift(e);
                    if (" " == (s = a.join(""))) return;
                }
                for (var h, n, l = {
                    type: "text"
                }, o = -1; -1 != (o = s.indexOf("&", o + 1)) && -1 != (h = s.indexOf(";", o + 2)); ) "#" == s[o + 1] ? (n = parseInt(("x" == s[o + 2] ? "0" : "") + s.substring(o + 2, h)), 
                isNaN(n) || (s = s.substr(0, o) + String.fromCharCode(n) + s.substr(h + 1))) : "nbsp" == (n = s.substring(o + 1, h)) ? s = s.substr(0, o) + " " + s.substr(h + 1) : "lt" != n && "gt" != n && "amp" != n && "ensp" != n && "emsp" != n && "quot" != n && "apos" != n && (l.decode = 1);
                l.text = s, this.siblings().push(l);
            }
        }
    }, {
        key: "setNode",
        value: function() {
            var t, s, i, e, a = {
                name: this.tagName.toLowerCase(),
                attrs: this.attrs
            };
            this.attrs = {}, cfg.ignoreTags[a.name] ? cfg.selfClosingTags[a.name] ? "source" == a.name ? (t = this.STACK[this.STACK.length - 1], 
            s = a.attrs, t && s.src && ("video" == t.name || "audio" == t.name ? t.attrs.source.push(s.src) : (e = s.media, 
            "picture" != t.name || t.attrs.src || s.src.indexOf(".webp") && system.includes("iOS") || !(!e || e.includes("px") && (-1 != (i = e.indexOf("min-width")) && -1 != (i = e.indexOf(":", i + 8)) && screenWidth > parseInt(e.substr(i + 1)) || -1 != (i = e.indexOf("max-width")) && -1 != (i = e.indexOf(":", i + 8)) && screenWidth < parseInt(e.substr(i + 1)))) || (t.attrs.src = s.src)))) : "base" != a.name || this.domain || (this.domain = a.attrs.href) : this.remove(a) : (this.matchAttr(a), 
            cfg.selfClosingTags[a.name] ? cfg.filter && 0 == cfg.filter(a, this) || this.siblings().push(a) : (a.children = [], 
            "pre" == a.name && cfg.highlight && (this.remove(a), this.pre = a.pre = !0), this.siblings().push(a), 
            this.STACK.push(a))), "/" == this.data[this.i] && this.i++, this.start = this.i + 1, 
            this.state = this.Text;
        }
    }, {
        key: "remove",
        value: function(t) {
            for (var s = this.i; this.i < this.data.length; ) {
                for (-1 == (this.i = this.data.indexOf("</", this.i + 1)) && (this.i = this.data.length), 
                this.start = this.i += 2; !blankChar[this.data[this.i]] && !this.isClose(); ) this.i++;
                if (this.section().toLowerCase() == t.name) {
                    if ("pre" == t.name) return this.data = this.data.substr(0, s + 1) + cfg.highlight(this.data.substring(s + 1, this.i - 5), t.attrs) + this.data.substr(this.i - 5), 
                    this.i = s;
                    if ("style" == t.name ? this.CssHandler.getStyle(this.data.substring(s + 1, this.i - 7)) : "title" == t.name && (this.title = this.data.substring(s + 1, this.i - 7)), 
                    -1 == (this.i = this.data.indexOf(">", this.i)) && (this.i = this.data.length), 
                    "svg" == t.name) {
                        var i = this.data.substring(s, this.i + 1);
                        t.attrs.xmlns || (i = ' xmlns="http://www.w3.org/2000/svg"' + i);
                        for (var e = s; "<" != this.data[s]; ) s--;
                        i = this.data.substring(s, e) + i, this.siblings().push({
                            name: "img",
                            attrs: {
                                src: "data:image/svg+xml;utf8," + i.replace(/#/g, "%23"),
                                ignore: "T"
                            }
                        });
                    }
                    return;
                }
            }
        }
    }, {
        key: "matchAttr",
        value: function(t) {
            var s, i = t.attrs, e = this.CssHandler.match(t.name, i, t) + (i.style || "");
            switch (t.name) {
              case "div":
              case "p":
                i.align && (e = "text-align:" + i.align + ";" + e, i.align = void 0);
                break;

              case "img":
                i["data-src"] && (i.src = i.src || i["data-src"], i["data-src"] = void 0), i.src && !i.ignore && (this.bubble() ? i.i = (this.imgNum++).toString() : i.ignore = "T");
                break;

              case "a":
              case "ad":
                this.bubble();
                break;

              case "font":
                i.color && (e = "color:" + i.color + ";" + e, i.color = void 0), i.face && (e = "font-family:" + i.face + ";" + e, 
                i.face = void 0), i.size && ((s = parseInt(i.size)) < 1 ? s = 1 : 7 < s && (s = 7), 
                e = "font-size:" + [ "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large" ][s - 1] + ";" + e, 
                i.size = void 0);
                break;

              case "video":
              case "audio":
                i.id ? this[t.name + "Num"]++ : i.id = t.name + ++this[t.name + "Num"], "video" == t.name && (i.width && (e = "width:" + (parseFloat(i.width) + i.width.includes("%") ? "%" : "px") + ";" + e, 
                i.width = void 0), i.height && (e = "height:" + (parseFloat(i.height) + i.height.includes("%") ? "%" : "px") + ";" + e, 
                i.height = void 0), 3 < this.videoNum && (t.lazyLoad = !0)), i.source = [], i.src && i.source.push(i.src), 
                i.controls || i.autoplay || console.warn("存在没有 controls 属性的 " + t.name + " 标签，可能导致无法播放", t), 
                this.bubble();
            }
            for (var a = e.split(";"), r = {}, h = 0, n = a.length, e = ""; h < n; h++) {
                var l, o, c = a[h].split(":");
                c.length < 2 || (l = c[0].trim().toLowerCase(), (o = c.slice(1).join(":").trim()).includes("-webkit") || o.includes("-moz") || o.includes("-ms") || o.includes("-o") || o.includes("safe") ? e += ";" + l + ":" + o : r[l] && !o.includes("import") && r[l].includes("import") || (r[l] = o));
            }
            for (l in "img" == t.name && parseInt(r.width || i.width) > screenWidth && (r.height = "auto"), 
            r) {
                if ((o = r[l]).includes("url")) {
                    var d = o.indexOf("(");
                    if (-1 != d++) {
                        for (;'"' == o[d] || "'" == o[d] || blankChar[o[d]]; ) d++;
                        o = o.substr(0, d) + this.getUrl(o.substr(d, 2)) + o.substr(d + 2);
                    }
                } else o.includes("rpx") ? o = o.replace(/[0-9.\s]*rpx/g, function(t) {
                    return parseFloat(t) * screenWidth / 750 + "px";
                }) : "white-space" == l && o.includes("pre") && (this.pre = t.pre = !0);
                e += ";" + l + ":" + o;
            }
            (e = e.substr(1)) && (i.style = e), i.id && (1 & this.compress ? i.id = void 0 : this.useAnchor && this.bubble()), 
            2 & this.compress && i.class && (i.class = void 0);
        }
    }, {
        key: "popNode",
        value: function(a) {
            if (a.pre) {
                a.pre = this.pre = void 0;
                for (var t = this.STACK.length; t--; ) this.STACK[t].pre && (this.pre = !0);
            }
            if ("head" == a.name || cfg.filter && 0 == cfg.filter(a, this)) return this.siblings().pop();
            if ("picture" == a.name) return a.name = "img", !a.attrs.src && a.children.length && "img" == a.children[0].name && (a.attrs.src = a.children[0].attrs.src), 
            a.attrs.src && !a.attrs.ignore && (a.attrs.i = (this.imgNum++).toString()), a.children = void 0;
            if (cfg.blockTags[a.name] ? a.name = "div" : cfg.trustTags[a.name] || (a.name = "span"), 
            a.c) if ("ul" == a.name) {
                for (var s = 1, i = this.STACK.length; i--; ) "ul" == this.STACK[i].name && s++;
                if (1 != s) for (var e = a.children.length; e--; ) a.children[e].floor = s;
            } else if ("ol" == a.name) for (var r, h = 0, n = 1; r = a.children[h++]; ) "li" == r.name && (r.type = "ol", 
            r.num = function(t, s) {
                if ("a" == s) return String.fromCharCode(97 + (t - 1) % 26);
                if ("A" == s) return String.fromCharCode(65 + (t - 1) % 26);
                if ("i" != s && "I" != s) return t;
                t = (t - 1) % 99 + 1;
                t = ([ "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC" ][Math.floor(t / 10) - 1] || "") + ([ "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX" ][t % 10 - 1] || "");
                return "i" == s ? t.toLowerCase() : t;
            }(n++, a.attrs.type) + ".");
            var l;
            "table" == a.name && (a.attrs.border && (a.attrs.style = "border:" + a.attrs.border + "px solid gray;" + (a.attrs.style || "")), 
            a.attrs.cellspacing && (a.attrs.style = "border-spacing:" + a.attrs.cellspacing + "px;" + (a.attrs.style || "")), 
            (a.attrs.border || a.attrs.cellpadding) && function t(s) {
                for (var i, e = 0; i = s[e]; e++) "th" == i.name || "td" == i.name ? (a.attrs.border && (i.attrs.style = "border:" + a.attrs.border + "px solid gray;" + (i.attrs.style || "")), 
                a.attrs.cellpadding && (i.attrs.style = "padding:" + a.attrs.cellpadding + "px;" + (i.attrs.style || ""))) : t(i.children || []);
            }(a.children)), this.CssHandler.pop && this.CssHandler.pop(a), "div" != a.name || Object.keys(a.attrs).length || (l = this.siblings(), 
            (a.children || []).length ? 1 == a.children.length && "div" == a.children[0].name && (l[l.length - 1] = a.children[0]) : l.pop());
        }
    }, {
        key: "bubble",
        value: function() {
            for (var t = this.STACK.length; t-- && !cfg.richOnlyTags[this.STACK[t].name]; ) this.STACK[t].c = 1;
            return -1 == t;
        }
    }, {
        key: "getUrl",
        value: function(t) {
            return this.domain && ("/" == t[0] ? t = "/" == t[1] ? this.protocol + ":" + t : this.domain + t : t.includes("://") || (t = this.domain + "/" + t)), 
            t;
        }
    }, {
        key: "Text",
        value: function(t) {
            var s;
            "<" == t && ((s = function(t) {
                return "a" <= t && t <= "z" || "A" <= t && t <= "Z";
            })(t = this.data[this.i + 1]) ? (this.setText(), this.start = this.i + 1, this.state = this.TagName) : "/" == t ? (this.setText(), 
            s(this.data[++this.i + 1]) ? (this.start = this.i + 1, this.state = this.EndTag) : this.Comment()) : "!" == t && (this.setText(), 
            this.Comment()));
        }
    }, {
        key: "Comment",
        value: function() {
            var t = "--" == this.data.substring(this.i + 2, this.i + 4) ? "--\x3e" : "[CDATA[" == this.data.substring(this.i + 2, this.i + 9) ? "]]>" : ">";
            -1 == (this.i = this.data.indexOf(t, this.i + 2)) ? this.i = this.data.length : this.i += t.length - 1, 
            this.start = this.i + 1, this.state = this.Text;
        }
    }, {
        key: "TagName",
        value: function(t) {
            if (blankChar[t]) {
                for (this.tagName = this.section(); blankChar[this.data[this.i]]; ) this.i++;
                this.isClose() ? this.setNode() : (this.start = this.i, this.state = this.AttrName);
            } else this.isClose() && (this.tagName = this.section(), this.setNode());
        }
    }, {
        key: "AttrName",
        value: function(t) {
            var s = blankChar[t];
            if (s && (this.attrName = this.section(), t = this.data[this.i]), "=" == t) {
                for (s || (this.attrName = this.section()); blankChar[this.data[++this.i]]; ) ;
                this.start = this.i--, this.state = this.AttrValue;
            } else s ? this.setAttr() : this.isClose() && (this.attrName = this.section(), this.setAttr());
        }
    }, {
        key: "AttrValue",
        value: function(t) {
            if ('"' == t || "'" == t) {
                if (this.start++, -1 == (this.i = this.data.indexOf(t, this.i + 1))) return this.i = this.data.length;
                this.attrVal = this.section(), this.i++;
            } else {
                for (;!blankChar[this.data[this.i]] && !this.isClose(); this.i++) ;
                this.attrVal = this.section();
            }
            for (;this.attrVal.includes("&quot;"); ) this.attrVal = this.attrVal.replace("&quot;", '"');
            this.setAttr();
        }
    }, {
        key: "EndTag",
        value: function(t) {
            if (blankChar[t] || ">" == t || "/" == t) {
                for (var s, i = this.section().toLowerCase(), e = this.STACK.length; e-- && this.STACK[e].name != i; ) ;
                if (-1 != e) {
                    for (;(s = this.STACK.pop()).name != i; ) ;
                    this.popNode(s);
                } else "p" != i && "br" != i || this.siblings().push({
                    name: i,
                    attrs: {}
                });
                this.i = this.data.indexOf(">", this.i), this.start = this.i + 1, -1 == this.i ? this.i = this.data.length : this.state = this.Text;
            }
        }
    } ]), e;
}();

module.exports = MpHtmlParser;