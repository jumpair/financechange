var _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

function _defineProperty(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

function hash(t) {
    for (var e = t.length, i = 5381; e--; ) i += (i << 5) + t.charCodeAt(e);
    return i;
}

var _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : _typeof2(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : _typeof2(t);
}, cache = {}, Parser = require("./libs/MpHtmlParser.js"), fs = wx.getFileSystemManager && wx.getFileSystemManager();

try {
    var dom = require("./libs/document.js");
} catch (t) {}

Component({
    properties: {
        html: {
            type: null,
            observer: function(t) {
                this._refresh ? this._refresh = !1 : this.setContent(t, !1, !0);
            }
        },
        autosetTitle: {
            type: Boolean,
            value: !0
        },
        autopause: {
            type: Boolean,
            value: !0
        },
        compress: Number,
        domain: String,
        gestureZoom: Boolean,
        lazyLoad: Boolean,
        selectable: Boolean,
        tagStyle: Object,
        showWithAnimation: Boolean,
        useAnchor: Boolean,
        useCache: Boolean
    },
    relations: {
        "../parser-group/parser-group": {
            type: "ancestor"
        }
    },
    created: function() {
        this.imgList = [], this.imgList.setItem = function(t, e) {
            var i, s, a = this;
            if (t && e) {
                if (0 == e.indexOf("http") && this.includes(e)) {
                    for (var o, n = "", r = 0; (o = e[r]) && ("/" != o || "/" == e[r - 1] || "/" == e[r + 1]); r++) n += .5 < Math.random() ? o.toUpperCase() : o;
                    return n += e.substr(r), this[t] = n;
                }
                (this[t] = e).includes("data:image") && (i = e.match(/data:image\/(\S+?);(\S+?),(.+)/)) && (s = wx.env.USER_DATA_PATH + "/" + Date.now() + "." + i[1], 
                fs && fs.writeFile({
                    filePath: s,
                    data: i[3],
                    encoding: i[2],
                    success: function() {
                        return a[t] = s;
                    }
                }));
            }
        }, this.imgList.each = function(t) {
            for (var e = 0, i = this.length; e < i; e++) this.setItem(e, t(this[e], e, this));
        };
    },
    detached: function() {
        this.imgList.each(function(t) {
            t && t.includes(wx.env.USER_DATA_PATH) && fs && fs.unlink({
                filePath: t
            });
        }), clearInterval(this._timer);
    },
    methods: {
        navigateTo: function(e) {
            var i = this;
            if (!this.data.useAnchor) return e.fail && e.fail({
                errMsg: "Anchor is disabled"
            });
            this.createSelectorQuery().select(".top" + (e.id ? ">>>#" + e.id : "")).boundingClientRect().selectViewport().scrollOffset().exec(function(t) {
                return t[0] ? (e.scrollTop = t[1].scrollTop + t[0].top, void wx.pageScrollTo(e)) : i.group ? i.group.navigateTo(i.i, e) : e.fail && e.fail({
                    errMsg: "Label not found"
                });
            });
        },
        getText: function() {
            for (var t, e, i = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.data.html, s = "", a = 0; t = i[a++]; ) "text" == t.type ? s += t.text.replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&") : "br" == t.type ? s += "\n" : ((e = "p" == t.name || "div" == t.name || "tr" == t.name || "li" == t.name || "h" == t.name[0] && "0" < t.name[1] && t.name[1] < "7") && s && "\n" != s[s.length - 1] && (s += "\n"), 
            t.children && (s += this.getText(t.children)), e && "\n" != s[s.length - 1] ? s += "\n" : "td" != t.name && "th" != t.name || (s += "\t"));
            return s;
        },
        getVideoContext: function(t) {
            if (!t) return this.videoContexts;
            for (var e = this.videoContexts.length; e--; ) if (this.videoContexts[e].id == t) return this.videoContexts[e];
        },
        setContent: function(t, e, i) {
            var s = this, a = {};
            if (t) if ("string" == typeof t) {
                var o, n = new Parser(t, this.data);
                this.data.useCache ? (o = hash(t), cache[o] ? a.html = cache[o] : (a.html = n.parse(), 
                cache[o] = a.html)) : a.html = n.parse(), this._refresh = !0, this.triggerEvent("parse", a.html);
            } else if (t.constructor == Array) t.length && "Parser" != t[0].PoweredBy && (n = new Parser("", this.data), 
            function t(e) {
                for (var i, s = 0; i = e[s]; s++) if ("text" != i.type) {
                    for (var a in i.attrs = i.attrs || {}, i.attrs) "string" != typeof i.attrs[a] && (i.attrs[a] = i.attrs[a].toString());
                    n.matchAttr(i), i.children && (n.STACK.push(i), t(i.children), n.popNode(n.STACK.pop()));
                }
            }(t), a.html = t), i || (a.html = t); else {
                if ("object" != (void 0 === t ? "undefined" : _typeof(t)) || !t.nodes) return console.warn("错误的 html 类型：" + (void 0 === t ? "undefined" : _typeof(t)));
                a.html = t.nodes, console.warn("错误的 html 类型：object 类型已废弃");
            } else {
                if (i || e) return;
                a.html = "";
            }
            e ? (this._refresh = !0, a.html = (this.data.html || []).concat(a.html)) : this.data.showWithAnimation && (a.showAm = "animation: show .5s"), 
            (a.html || a.showAm) && this.setData(a), this.data.html.length && this.data.html[0].title && this.data.autosetTitle && wx.setNavigationBarTitle({
                title: this.data.html[0].title
            }), this.imgList.length = 0, this.videoContexts = [], dom && (this.document = new dom(this.data.html, "html", this));
            for (var r, h, l, c, m, u = this.selectAllComponents(".top,.top>>>._node"), d = 0; r = u[d++]; ) !function(t) {
                for (t.top = s, h = 0; l = t.data.nodes[h++]; ) l.c || ("img" == l.name ? (s.imgList.setItem(l.attrs.i, l.attrs.src), 
                t.observer || t.data.imgLoad || "0" == l.attrs.i || (s.data.lazyLoad && t.createIntersectionObserver ? (t.observer = t.createIntersectionObserver(), 
                (wx.nextTick || setTimeout)(function() {
                    t.observer.relativeToViewport({
                        top: 900,
                        bottom: 900
                    }).observe("._img", function() {
                        t.setData({
                            imgLoad: !0
                        }), t.observer.disconnect();
                    });
                }, 50)) : t.setData({
                    imgLoad: !0
                }))) : "video" == l.name ? ((c = wx.createVideoContext(l.attrs.id, t)).id = l.attrs.id, 
                s.videoContexts.push(c)) : "audio" == l.name && l.attrs.autoplay && wx.createAudioContext(l.attrs.id, t).play());
            }(r);
            (wx.nextTick || setTimeout)(function() {
                return s.triggerEvent("load");
            }, 50), clearInterval(this._timer), this._timer = setInterval(function() {
                s.createSelectorQuery().select(".top").boundingClientRect(function(t) {
                    (s.rect = t).height == m && (s.triggerEvent("ready", t), clearInterval(s._timer)), 
                    m = t.height;
                }).exec();
            }, 350);
        },
        preLoad: function(t, e) {
            var i;
            "string" == typeof t && (i = hash(t), t = new Parser(t, this.data).parse(), cache[i] = t);
            var s, a = [];
            !function t(e) {
                for (var i, s = 0; i = e[s++]; ) "img" == i.name && i.attrs.src && !a.includes(i.attrs.src) && a.push(i.attrs.src), 
                t(i.children || []);
            }(t), e && (a = a.slice(0, e)), this._wait = (this._wait || []).concat(a), this.data.imgs ? this.data.imgs.length < 15 && (s = this.data.imgs.concat(this._wait.splice(0, 15 - this.data.imgs.length))) : s = this._wait.splice(0, 15), 
            s && this.setData({
                imgs: s
            });
        },
        _load: function(t) {
            this._wait.length && this.setData(_defineProperty({}, "imgs[" + t.target.id + "]", this._wait.shift()));
        },
        _tap: function(t) {
            var e, i;
            this.data.gestureZoom && t.timeStamp - this._lastT < 300 && (e = t.detail.y - t.currentTarget.offsetTop, 
            this._zoom ? (this._scaleAm.translateX(0).scale(1).step(), wx.pageScrollTo({
                scrollTop: (e + this._initY) / 2 - t.touches[0].clientY,
                duration: 400
            })) : (i = t.detail.x - t.currentTarget.offsetLeft, this._initY = e, this._scaleAm = wx.createAnimation({
                transformOrigin: i + "px " + this._initY + "px 0",
                timingFunction: "ease-in-out"
            }), this._scaleAm.scale(2).step(), this._tMax = i / 2, this._tMin = (i - this.rect.width) / 2, 
            this._tX = 0), this._zoom = !this._zoom, this.setData({
                scaleAm: this._scaleAm.export()
            })), this._lastT = t.timeStamp;
        },
        _touchstart: function(t) {
            1 == t.touches.length && (this._initX = this._lastX = t.touches[0].pageX);
        },
        _touchmove: function(t) {
            var e = t.touches[0].pageX - this._lastX;
            this._zoom && 1 == t.touches.length && 20 < Math.abs(e) && (this._lastX = t.touches[0].pageX, 
            this._tX <= this._tMin && e < 0 || this._tX >= this._tMax && 0 < e || (this._tX += e * Math.abs(this._lastX - this._initX) * .05, 
            this._tX < this._tMin && (this._tX = this._tMin), this._tX > this._tMax && (this._tX = this._tMax), 
            this._scaleAm.translateX(this._tX).step(), this.setData({
                scaleAm: this._scaleAm.export()
            })));
        }
    }
});