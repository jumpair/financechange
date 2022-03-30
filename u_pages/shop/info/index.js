var g, _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
    }
    return t;
}, _tools = require("../../../utils/tools"), app = getApp(), page = app.page, request = app.util.request, route = app.route;

page({
    data: {
        current: 0
    },
    onLoad: function(t) {
        g = this, request({
            url: "ShopInfo",
            data: {
                good_id: t.scene || t.id,
                user_id: app.userInfo.id || wx.getStorageSync("userInfo").id
            },
            success: function(t) {
                g.setData(_extends({}, t)), wx.stopPullDownRefresh();
            }
        });
    },
    onPullDownRefresh: function() {
        this.onLoad({
            id: g.data.id
        });
    },
    swiperChange: function(t) {
        g.setData({
            current: t.detail.current
        });
    },
    showImage: function(t) {
        wx.previewImage({
            urls: g.data.imglist,
            count: t.currentTarget.dataset.index
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: g.data.title,
            path: g.route + "?id=" + g.data.id,
            imageUrl: g.data.imglist[g.data.current] || ""
        };
    },
    collect: function(t) {
        var e = g.data.is_collect;
        e = 1 == e ? 2 : 1, (0, _tools.verifyLogin)({
            success: function() {
                request({
                    url: "GoodCollect",
                    data: {
                        good_id: g.data.id,
                        type: e,
                        user_id: app.userInfo.id || wx.getStorageSync("userInfo").id
                    },
                    showLoading: !1,
                    success: function(t) {
                        t ? g.setData({
                            is_collect: e
                        }) : wx.showToast({
                            icon: "none",
                            title: "错误:" + t
                        });
                    }
                });
            }
        });
    },
    toHome: function() {
        route({
            url: "loading",
            type: "reLaunch"
        });
    },
    toOrder: function() {
        (0, _tools.subscribe)("USER"), (0, _tools.verifyLogin)({
            success: function() {
                2 == g.data.attribute && g.data.stock < 1 ? wx.showToast({
                    icon: "none",
                    title: "已售罄"
                }) : request({
                    url: "ChekStock",
                    data: {
                        good_id: g.data.id
                    },
                    showLoading: !1,
                    success: function(t) {
                        if (1 == t.is_submit) return wx.showToast({
                            icon: "none",
                            title: "已售罄"
                        }), void g.setData({
                            stock: 0
                        });
                        app.item = {
                            good_id: g.data.id,
                            title: g.data.title,
                            price: g.data.price,
                            img: g.data.img,
                            attribute: g.data.attribute
                        }, route({
                            type: "navigate",
                            url: "shop_order_details"
                        });
                    }
                });
            }
        });
    },
    shareModal: function() {
        g.setData({
            isShow: !g.data.isShow
        });
    },
    poster: function() {
        g.shareModal(), route({
            url: "poster",
            params: {
                id: g.data.id,
                type: "goodposter"
            }
        });
    }
});