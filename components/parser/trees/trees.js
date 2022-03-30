function _defineProperty(t, e, r) {
    return e in t ? Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = r, t;
}

Component({
    data: {
        controls: {}
    },
    properties: {
        nodes: Array,
        lazyLoad: Boolean
    },
    detached: function() {
        this.observer && this.observer.disconnect();
    },
    methods: {
        play: function(t) {
            if (this.top.group && this.top.group.pause(this.top.i), 1 < this.top.videoContexts.length && this.top.data.autopause) for (var e = this.top.videoContexts.length; e--; ) this.top.videoContexts[e].id != t.currentTarget.id && this.top.videoContexts[e].pause();
        },
        imgtap: function(t) {
            var e = t.target.dataset.attrs;
            if (!e.ignore) {
                var r = !0;
                if (this.top.triggerEvent("imgtap", {
                    id: t.target.id,
                    src: e.src,
                    ignore: function() {
                        return r = !1;
                    }
                }), r) {
                    if (this.top.group) return this.top.group.preview(this.top.i, e.i);
                    t = this.top.imgList, e = t[e.i] || (t = [ e.src ], e.src);
                    wx.previewImage({
                        current: e,
                        urls: t
                    });
                }
            }
        },
        imglongtap: function(t) {
            var e = t.target.dataset.attrs;
            e.ignore || this.top.triggerEvent("imglongtap", {
                id: t.target.id,
                src: e.src
            });
        },
        linkpress: function(t) {
            var e = !0, t = t.currentTarget.dataset.attrs;
            t.ignore = function() {
                return e = !1;
            }, this.top.triggerEvent("linkpress", t), e && (t["app-id"] ? wx.navigateToMiniProgram({
                appId: t["app-id"],
                path: t.path
            }) : t.href && ("#" == t.href[0] ? this.top.navigateTo({
                id: t.href.substring(1)
            }) : 0 == t.href.indexOf("http") || 0 == t.href.indexOf("//") ? wx.setClipboardData({
                data: t.href,
                success: function() {
                    return wx.showToast({
                        title: "链接已复制"
                    });
                }
            }) : wx.navigateTo({
                url: t.href
            })));
        },
        error: function(t) {
            if ("Video" == t.target.dataset.from || "Audio" == t.target.dataset.from) {
                var e = this.data.controls[t.target.id] ? this.data.controls[t.target.id] + 1 : 1;
                if (e < t.target.dataset.source.length) return this.setData(_defineProperty({}, "controls." + t.target.id, e));
                e = wx["create" + t.target.dataset.from + "Context"](t.target.id, this);
            }
            this.top && this.top.triggerEvent("error", {
                source: t.target.dataset.from.toLowerCase(),
                target: t.target,
                errMsg: t.detail.errMsg,
                errCode: t.detail.errCode,
                context: e
            });
        },
        loadVideo: function(t) {
            for (var e, r = this.data.nodes.length; r--; ) if (this.data.nodes[r].attrs.id == t.currentTarget.id) return this.setData((_defineProperty(e = {}, "nodes[" + r + "].lazyLoad", !1), 
            _defineProperty(e, "nodes[" + r + "].attrs.autoplay", !0), e));
        }
    }
});