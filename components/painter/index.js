var _pen = require("./lib/pen"), _pen2 = _interopRequireDefault(_pen), _downloader = require("./lib/downloader"), _downloader2 = _interopRequireDefault(_downloader);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var util = require("./lib/util"), downloader = new _downloader2.default(), MAX_PAINT_COUNT = 5;

function setStringPrototype(o, a) {
    String.prototype.toPx = function(t) {
        var e = (t ? /^-?[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g : /^[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g).exec(this);
        if (!this || !e) return console.error("The size: " + this + " is illegal"), 0;
        var n = e[2], i = parseFloat(this), r = 0;
        return "rpx" === n ? r = Math.round(i * o * (a || 1)) : "px" === n && (r = Math.round(i * (a || 1))), 
        r;
    };
}

Component({
    canvasWidthInPx: 0,
    canvasHeightInPx: 0,
    paintCount: 0,
    options: {
        addGlobalClass: !0
    },
    properties: {
        customStyle: {
            type: String
        },
        palette: {
            type: Object,
            observer: function(t, e) {
                this.isNeedRefresh(t, e) && (this.paintCount = 0, this.startPaint());
            }
        },
        widthPixels: {
            type: Number,
            value: 0
        },
        dirty: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        picURL: "",
        showCanvas: !0,
        painterStyle: "",
        poster: ""
    },
    methods: {
        isEmpty: function(t) {
            for (var e in t) return !1;
            return !0;
        },
        isNeedRefresh: function(t, e) {
            return !(!t || this.isEmpty(t) || this.data.dirty && util.equal(t, e));
        },
        save: function() {
            var t = this.data.poster;
            t ? wx.saveImageToPhotosAlbum({
                filePath: t,
                success: function(t) {
                    wx.showToast({
                        icon: "none",
                        title: "保存成功"
                    });
                },
                fail: function(t) {
                    console.log(t), wx.showToast({
                        icon: "none",
                        title: "保存失败"
                    });
                }
            }) : wx.showToast({
                icon: "none",
                title: "海报初始化中"
            });
        },
        startPaint: function() {
            var r = this;
            if (!this.isEmpty(this.properties.palette)) {
                if (!getApp().systemInfo || !getApp().systemInfo.screenWidth) try {
                    getApp().systemInfo = wx.getSystemInfoSync();
                } catch (t) {
                    var e = "Painter get system info failed, " + JSON.stringify(t);
                    return that.triggerEvent("imgErr", {
                        error: e
                    }), void console.error(e);
                }
                var o = getApp().systemInfo.screenWidth / 750;
                setStringPrototype(o, 1), this.downloadImages().then(function(t) {
                    var e = t.width, n = t.height;
                    if (e && n) {
                        r.canvasWidthInPx = e.toPx(), r.properties.widthPixels && (setStringPrototype(o, r.properties.widthPixels / r.canvasWidthInPx), 
                        r.canvasWidthInPx = r.properties.widthPixels), r.canvasHeightInPx = n.toPx(), r.setData({
                            painterStyle: "width:" + r.canvasWidthInPx + "px;height:" + r.canvasHeightInPx + "px;"
                        });
                        var i = wx.createCanvasContext("k-canvas", r);
                        new _pen2.default(i, t).paint(function() {
                            r.saveImgToLocal();
                        });
                    } else console.error("You should set width and height correctly for painter, width: " + e + ", height: " + n);
                });
            }
        },
        downloadImages: function() {
            var h = this;
            return new Promise(function(n, t) {
                var i = 0, r = 0, o = JSON.parse(JSON.stringify(h.properties.palette));
                if (o.background && (i++, downloader.download(o.background).then(function(t) {
                    o.background = t, i === ++r && n(o);
                }, function() {
                    i === ++r && n(o);
                })), o.views) {
                    var e = !0, a = !1, s = void 0;
                    try {
                        for (var l, u = function() {
                            
                            var e = l.value;
                            e && "image" === e.type && e.url && (i++, downloader.download(e.url).then(function(t) {
                                
                                e.url = t, wx.getImageInfo({
                                    src: e.url,
                                    success: function(t) {
                                        e.sWidth = t.width, e.sHeight = t.height;
                                    },
                                    fail: function(t) {
                                        e.url = "", console.error("getImageInfo " + e.url + " failed, " + JSON.stringify(t));
                                    },
                                    complete: function() {
                                        i === ++r && n(o);
                                    }
                                });
                            }, function() {
                                i === ++r && n(o);
                            }));
                        }, c = o.views[Symbol.iterator](); !(e = (l = c.next()).done); e = !0) u();
                    } catch (t) {
                        a = !0, s = t;
                    } finally {
                        try {
                            !e && c.return && c.return();
                        } finally {
                            if (a) throw s;
                        }
                    }
                }
                0 === i && n(o);
            });
        },
        saveImgToLocal: function() {
            var t = this, e = this;
            setTimeout(function() {
                wx.canvasToTempFilePath({
                    canvasId: "k-canvas",
                    success: function(t) {
                        e.getImageInfo(t.tempFilePath);
                    },
                    fail: function(t) {
                        console.error("canvasToTempFilePath failed, " + JSON.stringify(t)), e.triggerEvent("imgErr", {
                            error: t
                        });
                    }
                }, t);
            }, 300);
        },
        getImageInfo: function(n) {
            var i = this;
            wx.getImageInfo({
                src: n,
                success: function(t) {
                    if (i.paintCount > MAX_PAINT_COUNT) {
                        var e = "The result is always fault, even we tried " + MAX_PAINT_COUNT + " times";
                        return console.error(e), void i.triggerEvent("imgErr", {
                            error: e
                        });
                    }
                    Math.abs((t.width * i.canvasHeightInPx - i.canvasWidthInPx * t.height) / (t.height * i.canvasHeightInPx)) < .01 ? (i.setData({
                        poster: n
                    }), i.triggerEvent("imgOK", {
                        path: n
                    })) : i.startPaint(), i.paintCount++;
                },
                fail: function(t) {
                    console.error("getImageInfo failed, " + JSON.stringify(t)), i.triggerEvent("imgErr", {
                        error: t
                    });
                }
            });
        }
    }
});