var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, _tools = require("../../utils/tools");

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
        url: "MLawOrder",
        data: {
            order_state: t || g.data.TabCur,
            user_id: app.userInfo.id || wx.getStorageSync("userInfo").id,
            page: o,
            number: app.config.orders_number
        },
        showLoading: !1,
        success: function(t) {
            var e = g.data.data;
            if (t && "object" == (void 0 === t ? "undefined" : _typeof(t))) {
                for (var a = 0; a < t.length; a++) 6 == t[a].order_state && t.splice(a, 1);
                for (a = 0; a < t.length; a++) {
                    var r = (0, _tools.formatTime)(t[a].submit_time);
                    r = r.slice(0, r.length - 3), t[a].submit_time = r;
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
        (0, _tools.subscribe)("LAWYER"), g.setData({
            TabCur: parseInt(t.currentTarget.dataset.id),
            scrollLeft: 60 * (t.currentTarget.dataset.id - 1),
            isLoad: !1
        }, function() {
            pages = 1, getOrderList();
        });
    },
    callPhone: function(t) {
        (0, _tools.subscribe)("LAWYER"), t = t.currentTarget.dataset.item.phone, wx.makePhoneCall({
            phoneNumber: t
        });
    },
    service_log: function(t) {
        (0, _tools.subscribe)("LAWYER"), t = t.currentTarget.dataset.item, route({
            type: "navigate",
            url: "service_log",
            params: {
                order_id: t.id,
                user_type: 1,
                state: t.order_state
            }
        });
    },
    callOk: function(t) {
        (0, _tools.subscribe)("LAWYER"), t = t.currentTarget.dataset.item.id, request({
            url: "MLawOrderPhoneOk",
            data: {
                order_id: t
            },
            showLoading: !1,
            success: function(t) {
                var e = t ? "提交成功" : "错误:" + t;
                wx.showToast({
                    icon: "none",
                    title: e
                }), g.setData({
                    isLoad: !1
                }), pages = 1, getOrderList();
            }
        });
    },
    orderOk: function(t) {
        (0, _tools.subscribe)("LAWYER");
        var a = (t = t.currentTarget.dataset).index;
        t = t.item, request({
            url: "LawOrderAachieve",
            data: {
                order_id: t.id
            },
            showLoading: !1,
            success: function(t) {
                var e = t ? "已完成" : "错误:" + t;
                wx.showToast({
                    icon: "none",
                    title: e
                }), t && (g.data.data.splice(a, 1), g.setData({
                    data: g.data.data
                }));
            }
        });
    },
    onShow: function() {
        getOrderList(g.data.TabCur);
    },
    toInfo: function(t) {
        (0, _tools.subscribe)("LAWYER"), route({
            type: "navigate",
            url: "l_orders_info",
            params: {
                order_id: t.currentTarget.dataset.item.id
            }
        });
    },
    onReachBottom: function() {
        !g.data.isLoad && pages++ && getOrderList(g.data.TabCur, pages);
    },
    toChat: function(t) {
        (0, _tools.subscribe)("LAWYER"), route({
            url: "chat_info",
            params: {
                toid: t.currentTarget.dataset.toid
            }
        });
    }
});