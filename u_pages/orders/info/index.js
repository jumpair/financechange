var g, order_id, type, _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (t[o] = a[o]);
    }
    return t;
}, _tools = require("../../../utils/tools"), app = getApp(), page = app.page, request = app.util.request, route = app.route;

function getInfo() {
    request({
        url: 0 == type ? "LawOrderInfo" : "ShopOrderInfo",
        data: {
            order_id: order_id
        },
        showLoading: !1,
        success: function(t) {
            wx.stopPullDownRefresh(), g.setData(_extends({}, t));
        }
    });
}

page({
    data: {},
    onLoad: function(t) {
        g = this;
        var e = wx.getStorageSync("system");
        wx.setNavigationBarColor({
            backgroundColor: e.foot_color2,
            frontColor: e.text_color
        }), order_id = t.order_id, type = t.type, g.setData({
            type: type
        }), getInfo();
    },
    onPullDownRefresh: function() {
        getInfo();
    },
    viewImg: function(t) {
        wx.previewImage({
            current: t.currentTarget.dataset.src,
            urls: g.data.imglist
        });
    },
    cancelOrder: function(t) {
        (0, _tools.ubscribe)("USER"), request({
            url: 0 == type ? "LawCancelOrder" : "ShopCancelOrder",
            data: {
                order_id: g.data.id
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
        var e = g.data.id, a = g.data.price;
        request({
            url: 0 == type ? "LawOrderPay" : "ShopOrderPay",
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
                                params: {
                                    order_id: e,
                                    type: type
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
        (0, _tools.ubscribe)("USER"), wx.makePhoneCall({
            phoneNumber: g.data.law.phone
        });
    },
    copy: function() {
        wx.setClipboardData({
            data: g.data.fh_link,
            success: function(t) {
                wx.showToast({
                    icon: "none",
                    title: "复制成功"
                });
            }
        });
    },
    service_log: function(t) {
        (0, _tools.ubscribe)("USER"), route({
            type: "navigate",
            url: "service_log",
            params: {
                order_id: g.data.id,
                state: g.data.order_state
            }
        });
    },
    evaluate: function(t) {
        route({
            type: "navigate",
            url: "evaluate",
            params: {
                order_id: g.data.id,
                type: 0 == type ? 0 : 1,
                id: 0 == type ? g.data.law.id : g.data.good.id
            }
        });
    },
    orderOk: function(t) {
        (0, _tools.ubscribe)("USER"), request({
            url: 0 == type ? "LawOrderAachieve" : "ShopConfirmOrder",
            data: {
                order_id: g.data.id
            },
            showLoading: !1,
            success: function(t) {
                var e = t ? "已完成" : "错误:" + t;
                wx.showToast({
                    icon: "none",
                    title: e
                }), t && setTimeout(function() {
                    g.setData({
                        order_state: 4
                    }), route({
                        type: "navigate",
                        url: "evaluate",
                        params: {
                            order_id: g.data.id,
                            type: 0 == type ? 0 : 1,
                            id: 0 == type ? g.data.law.id : g.data.good.id
                        }
                    });
                }, 1500);
            }
        });
    },
    toLogistics: function() {
        route({
            type: "navigate",
            url: "orders_logistics",
            params: {
                order_id: g.data.id
            }
        });
    },
    toChat: function(t) {
        (0, _tools.ubscribe)("USER"), route({
            type: "navigate",
            url: "chat_info",
            params: {
                toid: t.currentTarget.dataset.toid
            }
        });
    }
});