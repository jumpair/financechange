var g, _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a, r = arguments[e];
        for (a in r) Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a]);
    }
    return t;
}, _tools = require("../../utils/tools"), app = getApp(), page = app.page, request = app.util.request, route = app.route, toast = app.toast;

function getFxSet() {
    request({
        url: "FxSet",
        data: {
            user_id: wx.getStorageSync("userInfo").id
        },
        showLoading: !1,
        success: function(t) {
            g.setData(_extends({}, t, {
                swiper_items: [ {
                    key: "可提现 (元)",
                    value: t.wallet.ktx_money
                }, {
                    key: "已提现 (元)",
                    value: t.wallet.ytx_money
                }, {
                    key: "未结算 (元)",
                    value: t.wallet.bktx_money
                } ]
            })), app.fxset = t.fxset, wx.setStorageSync("fxset", t.fxset), wx.setStorageSync("wallet", t.wallet), 
            wx.stopPullDownRefresh();
        }
    });
}

page({
    data: {
        cur: 0,
        swiper_margin: 220 / 750 * wx.getSystemInfoSync().screenWidth
    },
    onLoad: function(t) {
        g = this;
    },
    onReady: function() {
        var t = wx.getSystemInfoSync().screenWidth, e = .04 * t, t = (e * e + t * t / 4) / (2 * e);

        g.setData({
            style: "background: radial-gradient(circle at 50% " + (e - t) + "px, " + wx.getStorageSync("system").foot_color2 + " " + t + "px, rgba(0,0,0,0) " + t / 2 + "px);"
        }), (0, _tools.getNodeInfo)({
            id: "#top",
            success: function(t) {
                return g.setData({
                    top: t.bottom
                });
            }
        });
    },
    onShow: function() {
        getFxSet();
    },
    onPullDownRefresh: function() {
        getFxSet();
    },
    cardSwiper: function(t) {
        g.setData({
            cur: t.detail.current
        });
    },
    toPage: function(t) {
        var e = t.currentTarget.dataset.url;
        console.log(e)
        switch (e) {
          case "poster":
            route({
                url: "poster",
                params: {
                    id: app.userInfo.id || wx.getStorageSync("userInfo").id,
                    type: "disposter"
                }
            });
            break;

          case "html_page":
            app.centent = g.data.fxset.agreement, route({
                type: "navigate",
                url: "html_page",
                params: {
                    title: (g.data.system.fx_title2 || "分销商") + "申请协议"
                }
            });
            break;

          default:
            route({
                type: "navigate",
                url: e
            });
        }
    }
});