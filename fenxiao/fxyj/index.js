var g, _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a, o = arguments[e];
        for (a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
    }
    return t;
}, app = getApp(), page = app.page, request = app.util.request, route = app.route, toast = app.toast;

function getFxSet() {
    request({
        url: "FxSet",
        data: {
            user_id: wx.getStorageSync("userInfo").id
        },
        showLoading: !1,
        success: function(t) {
            (t = t.wallet).z_money = parseFloat(t.ktx_money) + parseFloat(t.ytx_money) + parseFloat(t.bktx_money), 
            t.z_money = t.z_money.toFixed(2), g.setData(_extends({}, t)), wx.stopPullDownRefresh();
        }
    });
}

page({
    data: {},
    onLoad: function(t) {
        g = this, getFxSet();
    },
    onPullDownRefresh: function() {
        getFxSet();
    },
    toPage: function(t) {
        t = t.currentTarget.dataset.url;
        route({
            type: "navigate",
            url: t
        });
    }
});