var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, _tools = require("../../../utils/tools");

function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var g, tab, pages, app = getApp(), page = app.page, request = app.util.request, route = app.route;

function getOrderList(t) {
    var o = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1;
    1 == o && g.setData({
        data: []
    }), request({
        url: "MyLawOrder",
        data: {
            order_state: t || g.data.TabCur,
            user_id: app.userInfo.id || wx.getStorageSync("userInfo").id,
            page: o,
            number: app.config.orders_number
        },
        showLoading: !1,
        success: function(t) {
            var e = g.data.data;
            if (t && "object" == (void 0 === t ? "undefined" : _typeof(t))) for (var a = 0; a < t.length; a++) {
                6 == t[a].order_state && t.splice(a, 1);
                var r = (0, _tools.formatTime)(t[a].submit_time);
                r = r.slice(0, r.length - 3), t[a].submit_time = r;
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
        TabItem: [ "全部", "待付款", "待服务", "待确认", "待评价", "已完成" ],
        no_orders: app.srcRoot + "no_order.png",
        isLoad: !1
    },
    onLoad: function(t) {
        g = this, pages = 1, tab = t && t.index ? t.index : 0, g.setData({
            TabCur: tab
        });
    },
    onPullDownRefresh: function() {
        g.setData({
            isLoad: !1
        }), pages = 1, getOrderList();
    },
    tabSelect: function(t) {
        g.setData({
            TabCur: parseInt(t.currentTarget.dataset.id),
            scrollLeft: 60 * (t.currentTarget.dataset.id - 1),
            isLoad: !1
        }, function() {
            pages = 1, getOrderList();
        });
    },
    cancelOrder: function(t) {
        (0, _tools.subscribe)("USER"), t = t.currentTarget.dataset.item.id, request({
            url: "LawCancelOrder",
            data: {
                order_id: t
            },
            showLoading: !1,
            success: function(t) {
                var e = t ? "取消成功" : "错误:" + t;
                wx.showToast({
                    icon: "none",
                    title: e
                }), g.setData({
                    isLoad: !1
                }), pages = 1, getOrderList();
            }
        });
    },
    payOrder: function(t) {
        var e = (t = t.currentTarget.dataset.item).id, a = t.price;
        request({
            url: "LawOrderPay",
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
                            content: "订单支付成功 ￥" + a,
                            img: "pay_ok",
                            button: [ {
                                title: "查看订单",
                                url: "orders_info",
                                a: {
                                    order_id: e,
                                    type: 0
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
    callPhone: function(t) {
        (0, _tools.subscribe)("USER"), t = t.currentTarget.dataset.item.law_phone, wx.makePhoneCall({
            phoneNumber: t
        });
    },
    service_log: function(t) {
        (0, _tools.subscribe)("USER"), t = t.currentTarget.dataset.item, route({
            type: "navigate",
            url: "service_log",
            params: {
                order_id: t.id,
                state: t.order_state
            }
        });
    },
    evaluate: function(t) {
        (0, _tools.subscribe)("USER"), t = t.currentTarget.dataset.item, route({
            type: "navigate",
            url: "evaluate",
            params: {
                order_id: t.id,
                type: 0,
                id: t.law_id
            }
        });
    },
    orderOk: function(a) {
        (0, _tools.subscribe)("USER");
        var r = (a = a.currentTarget.dataset).index;
        a = a.item, request({
            url: "LawOrderAachieve",
            data: {
                order_id: a.id
            },
            showLoading: !1,
            success: function(t) {
                var e = t ? "已完成" : "错误:" + t;
                wx.showToast({
                    icon: "none",
                    title: e
                }), t && setTimeout(function() {
                    g.data.data.splice(r, 1), g.setData({
                        data: g.data.data
                    }), route({
                        type: "navigate",
                        url: "evaluate",
                        params: {
                            order_id: a.id,
                            type: 0,
                            id: a.law_id
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
        (0, _tools.subscribe)("USER"), route({
            type: "navigate",
            url: "orders_info",
            params: {
                order_id: t.currentTarget.dataset.item.id,
                type: 0
            }
        });
    },
    chat: function(t) {
        (0, _tools.subscribe)("USER"), route({
            type: "navigate",
            url: "chat_info",
            params: {
                toid: t.currentTarget.dataset.item
            }
        });
    },
    onReachBottom: function() {
        !g.data.isLoad && pages++ && getOrderList(g.data.TabCur, pages);
    }
});