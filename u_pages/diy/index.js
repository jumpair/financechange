var g, page_id, _extends = Object.assign || function(a) {
    for (var t = 1; t < arguments.length; t++) {
        var e = arguments[t];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (a[o] = e[o]);
    }
    return a;
}, _tools = require("../../utils/tools"), app = getApp(), page = app.page, request = app.util.request, route = app.route;

function getPgae() {
    var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : page_id;
    request({
        url: "DiyInfo",
        data: {
            id: a
        },
        success: function(a) {
            g.setData(_extends({}, a));
            var t = a.page_data.head.params;
            wx.setNavigationBarColor({
                frontColor: t.titleTextColor ? "#ffffff" : "#000000",
                backgroundColor: t.backgroundColor,
                animation: {
                    duration: 400,
                    timingFunc: "easeIn"
                }
            }), wx.stopPullDownRefresh();
        }
    });
}

page({
    data: {
        isShow: !1
    },
    audioAction: {
        method: "pause"
    },
    onLoad: function(a) {
        g = this, page_id = a.id;
        var t = wx.getStorageSync("showAddxcx");
        g.setData({
            showAddxcx: "boolean" != typeof t || t
        }), getPgae();
    },
    onPullDownRefresh: function() {
        getPgae();
    },
    toPage: function(a) {
        var t = a.currentTarget.dataset.item;
        route({
            url: t.linkUrl
        });
    },
    showNotice: function(a) {
        a = a.currentTarget.dataset, console.log(a), a.data && (g.setData({
            notice: {
                data: a.data,
                params: a.params
            }
        }), g.setData({
            isShow: !g.data.isShow
        }));
    },
    onShareAppMessage: function(a) {
        var t = g.data.page_data.head.params;
        return {
            title: g.data.system.xcx_name,
            imageUrl: t.page_img ? t.page_img_url : "",
            path: (0, _tools.getParam)(g)
        };
    },
    close: function() {
        wx.setStorageSync("showAddxcx", !1), g.setData({
            showAddxcx: !1
        });
    }
});