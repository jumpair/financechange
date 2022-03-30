var g, options, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, app = getApp(), page = app.page, request = app.util.request, route = app.route;

function getPoster() {
    request({
        url: "poster",
        data: {
            id: options.id,
            type: options.type,
            pid: app.userInfo.id || wx.getStorageSync("userInfo").id
        },
        success: function(o) {
            for (var t in o.views) {
                var e = o.views[t];
                if ("object" == (void 0 === e ? "undefined" : _typeof(e))) for (var n in e) if ("object" == _typeof(e[n])) for (var s in e[n]) "number" == typeof e[n][s] && "maxLines" != s && (o.views[t][n][s] += "rpx");
            }
            console.log(o);
            g.setData({
                json: o
            }), wx.stopPullDownRefresh();
        }
    });
}

page({
    data: {
        json: {},
        poster: ""
    },
    onLoad: function(o) {
        console.log(o)
        g = this, options = o;
    },
    onPullDownRefresh: function() {
        getPoster();
    },
    onReady: function() {
        getPoster();
    },
    onImgOK: function(o) {
        console.log(o.detail.path)
        g.setData({
            poster: o.detail.path
        });
    },
    save: function() {
        var o = g.data.poster;
        o ? wx.saveImageToPhotosAlbum({
            filePath: o,
            success: function(o) {
                wx.showToast({
                    icon: "none",
                    title: "保存成功"
                });
            },
            fail: function(o) {
                console.log(o), wx.showToast({
                    icon: "none",
                    title: "保存失败"
                });
            }
        }) : wx.showToast({
            icon: "none",
            title: "海报初始化中"
        });
    }
});