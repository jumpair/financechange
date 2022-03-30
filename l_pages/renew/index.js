var g, _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (e[o] = a[o]);
    }
    return e;
}, _tools = require("../../utils/tools"), app = getApp(), page = app.page, request = app.util.request, route = app.route;

function lawPay(t, e, a) {
    request({
        url: "LawInPay",
        data: {
            user_id: e,
            order_id: t
        },
        success: function(e) {
            g.setData({
                order_id: t
            }), e.appId ? (0, _tools.wxPay)({
                data: e,
                success: function(e) {
                    mLawRenew(a);
                }
            }) : wx.showToast({
                icon: "none",
                title: "错误:" + e
            });
        }
    });
}

function mLawRenew(e) {
    var t = parseInt(g.data.daoqi_time1);
    request({
        url: "MLawRenew",
        data: {
            user_id: app.userInfo.id || wx.getStorageSync("userInfo").id,
            daoqi_time: t + e
        },
        success: function(e) {
            var t;
            t = 1 == e ? "续费成功" : "错误:" + e, wx.showToast({
                icon: "none",
                title: t
            }), g.onShow();
        }
    });
}

page({
    data: {
        bg: app.srcRoot + "renew_bg.jpg"
    },
    onLoad: function(e) {
        g = this, request({
            url: "GetInTerm",
            showLoading: !1,
            success: function(e) {
                g.setData({
                    getinTerm: e
                });
            }
        });
    },
    onPullDownRefresh: function() {},
    onShow: function() {
        request({
            url: "MLawUser",
            showLoading: !1,
            data: {
                user_id: app.userInfo.id || wx.getStorageSync("userInfo").id
            },
            success: function(e) {
                var t = e.daoqi_time1, a = e.tongguo_time, o = t - a, n = (0, _tools.getTimestamp)((0, 
                _tools.getDate)(), (0, _tools.getTime)()), s = e.time, r = parseInt((t - n) / 86400);
                o = (o = Math.round((n - a) / o * 100)) || 1, e.tongguo_time = (0, _tools.formatTime)(e.tongguo_time).split(" ")[0], 
                g.setData(_extends({}, e, {
                    percent: o,
                    in_day: parseInt((n - s) / 86400),
                    day: r,
                    order_id: ""
                }));
            }
        });
    },
    renew: function(e) {
        (0, _tools.subscribe)("LAWYER"), e = e.currentTarget.dataset.item;
        var t = app.userInfo.id || wx.getStorageSync("userInfo").id, a = 86400 * parseInt(e.in_day);
        1 == e.is_pay ? g.data.day > e.in_day ? wx.showToast({
            icon: "none",
            title: "免费入驻不能续费太多哦,过一段时间再来吧",
            duration: 2e3
        }) : mLawRenew(a) : g.data.order_id ? lawPay(g.data.order_id, t, a) : request({
            url: "LawInOrder",
            data: {
                user_id: t,
                money: e.in_money,
                rz_time: e.in_day
            },
            success: function(e) {
                e.id ? lawPay(e.id, t, a) : wx.showToast({
                    icon: "none",
                    title: "错误:" + e
                });
            }
        });
    }
});