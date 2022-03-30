var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, _tools = require("../../utils/tools");

function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var e = 0, r = Array(t.length); e < t.length; e++) r[e] = t[e];
        return r;
    }
    return Array.from(t);
}

var g, tab, pages, app = getApp(), page = app.page, request = app.util.request, route = app.route;

function getOrderList(t) {
    var o = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1;
    1 == o && g.setData({
        data: []
    }), request({
        url: "MyShopOrder",
        data: {
            state: t || g.data.TabCur,
            user_id: app.userInfo.id || wx.getStorageSync("userInfo").id,
            page: o,
            number: app.config.orders_number
        },
        showLoading: !1,
        success: function(t) {
            var e = g.data.data;
            if (t && "object" == (void 0 === t ? "undefined" : _typeof(t))) {
                for (var r = 0; r < t.length; r++) 6 == t[r].state && t.splice(r, 1);
                for (r = 0; r < t.length; r++) {
                    var a = (0, _tools.formatTime)(t[r].tjdd_time);
                    a = a.slice(0, a.length - 3), t[r].tjdd_time = a;
                }
            }
            e && 1 != o && (t = [].concat(_toConsumableArray(e), _toConsumableArray(t))), g.setData({
                data: t
            }), wx.stopPullDownRefresh(), t.length && o * app.config.orders_number >= t[0].num && g.setData({
                isLoad: !0
            });
        }
    });
}

page({
    data: {
        TabCur: 0,
        scrollLeft: 0,
        TabItem: [ "全部", "待付款", "待发货", "待收货", "待评价", "已完成" ],
        no_orders: app.srcRoot + "no_order.png"
    },
    onLoad: function(t) {
        g = this, pages = 1, tab = t && t.index ? t.index : 0, g.setData({
            TabCur: tab
        });
    },
    onPullDownRefresh: function() {
        g.setData({
            isLoad: !1
        }), pages = 1, getOrderList(g.data.TabCur, pages);
    },
    tabSelect: function(t) {
        g.setData({
            TabCur: parseInt(t.currentTarget.dataset.id),
            scrollLeft: 60 * (t.currentTarget.dataset.id - 1),
            isLoad: !1
        }, function() {
            pages = 1, getOrderList(g.data.TabCur, pages);
        });
    },
    cancelOrder: function(t) {
        (0, _tools.ubscribe)("USER"), t = t.currentTarget.dataset.item.id, request({
            url: "ShopCancelOrder",
            data: {
                order_id: t
            },
            showLoading: !1,
            success: function(t) {
                var e = t ? "取消成功" : "错误:" + t;
                wx.showToast({
                    icon: "none",
                    title: e
                }), getOrderList();
            }
        });
    },
    payOrder: function(t) {
        var e = (t = t.currentTarget.dataset.item).id, r = t.price;
        request({
            url: "ShopOrderPay",
            data: {
                user_id: app.userInfo.id || wx.getStorageSync("userInfo").id,
                order_id: e
            },
            success: function(t) {
                console.log("回调支付信息：", t), (0, _tools.wxPay)({
                    data: t,
                    success: function(t) {
                        app.item = {
                            title: "支付成功",
                            content: "订单支付成功 ￥" + r,
                            img: "pay_ok",
                            button: [ {
                                title: "查看订单",
                                url: "orders_info",
                                params: {
                                    order_id: e,
                                    type: 1
                                }
                            }, {
                                title: "返回首页",
                                url: "loading",
                                type: "reLaunch"
                            } ]
                        }, route({
                            type: "redirect",
                            url: "result"
                        });
                    }
                });
            }
        });
    },
    evaluate: function(t) {
        (0, _tools.ubscribe)("USER"), t = t.currentTarget.dataset.item, route({
            type: "navigate",
            url: "evaluate",
            params: {
                order_id: t.id,
                type: 1,
                id: t.good_id
            }
        });
    },
    orderOk: function(r) {
        (0, _tools.ubscribe)("USER");
        var a = (r = r.currentTarget.dataset).index;
        r = r.item, request({
            url: "ShopConfirmOrder",
            data: {
                order_id: r.id
            },
            showLoading: !1,
            success: function(t) {
                var e = t ? "已完成" : "错误:" + t;
                wx.showToast({
                    icon: "none",
                    title: e
                }), t && setTimeout(function() {
                    g.data.data.splice(a, 1), g.setData({
                        data: g.data.data
                    }), route({
                        type: "navigate",
                        url: "evaluate",
                        params: {
                            order_id: r.id,
                            type: 1,
                            id: r.good_id
                        }
                    });
                }, 1500);
            }
        });
    },
    onShow: function() {
        getOrderList(g.data.TabCur);
    },
    toInfo: function(t) {
        (0, _tools.ubscribe)("USER"), route({
            type: "navigate",
            url: "orders_info",
            params: {
                order_id: t.currentTarget.dataset.item.id,
                type: 1
            }
        });
    },
    toLogistics: function(t) {
        (0, _tools.ubscribe)("USER"), route({
            type: "navigate",
            url: "orders_logistics",
            params: {
                order_id: t.currentTarget.dataset.item.id
            }
        });
    },
    onReachBottom: function() {
        !g.data.isLoad && pages++ && getOrderList(g.data.TabCur, pages);
    }
});