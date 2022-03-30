function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

var g, pages, app = getApp(), page = app.page, request = app.util.request, route = app.route;

function getCollectList() {
    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0, e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1;
    request({
        url: "MyCollectList",
        showLoading: !1,
        data: {
            type: ++t,
            page: e,
            number: app.config.collect_number,
            user_id: app.userInfo.id || wx.getStorageSync("userInfo").id
        },
        success: function(t) {
            console.log(e, t);
            var a = g.data.data;
            a && 1 != e && (t = [].concat(_toConsumableArray(a), _toConsumableArray(t))), g.setData({
                data: t
            }), wx.stopPullDownRefresh(), t.length && e * app.config.collect_number >= t[0].num && g.setData({
                isLoad: !0
            });
        }
    });
}

page({
    data: {
        tabCur: 0,
        scrollLeft: 0,
        no_goods: app.srcRoot + "no_shop.png",
        isLoad: !1
    },
    onLoad: function(t) {
        pages = 1, (g = this).setData({
            nav: [ "新闻", app.system.law_custom, "商品" ]
        });
    },
    onPullDownRefresh: function() {
        g.setData({
            isLoad: !1
        }), pages = 1, getCollectList(g.data.tabCur, pages);
    },
    onShow: function() {
        getCollectList(g.data.tabCur);
    },
    tabSelect: function(t) {
        var a = t.currentTarget.dataset.index;
        this.setData({
            tabCur: a,
            scrollLeft: 60 * (a - 1),
            data: "",
            isLoad: !1
        }), getCollectList(a, pages = 1);
    },
    toInfo: function(t) {
        route({
            url: "shop_info",
            params: {
                id: t.currentTarget.dataset.id
            }
        });
    },
    onReachBottom: function() {
        !g.data.isLoad && pages++ && getCollectList(g.data.tabCur, pages);
    }
});