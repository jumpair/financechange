var g, _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (t[o] = a[o]);
    }
    return t;
}, _tools = require("../../utils/tools.js"), app = getApp(), page = app.page, request = app.util.request, route = app.route;

function getData() {
    request({
        url: "MLawWallet",
        data: {
            user_id: app.userInfo.id || wx.getStorageSync("userInfo").id
        },
        success: function(t) {
            g.setData(_extends({}, t));
        }
    });
}

page({
    data: {
        no_detail: app.srcRoot + "no_record.png",
        wallet_bg: app.srcRoot + "wallet_bg.png"
    },
    onLoad: function(t) {
        g = this, getData();
    },
    onPullDownRefresh: function() {},
    toWithdraw: function() {
        (0, _tools.subscribe)("LAWYER"), app.m = g.data.wallet.ktx_money, route({
            type: "navigate",
            url: "l_withdraw"
        });
    }
});