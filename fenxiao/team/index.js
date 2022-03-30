function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var g, pages, app = getApp(), page = app.page, request = app.util.request, route = app.route, toast = app.toast;

function getList() {
    request({
        url: "MyTeamList",
        data: {
            user_id: app.userInfo.id || wx.getStorageSync("userInfo").id,
            page: pages,
            number: app.config.fx_number,
            type: parseInt(g.data.cur) + 1
        },
        success: function(t) {
            var e = g.data.list, a = t.list;
            e && 1 != pages && (a = [].concat(_toConsumableArray(e), _toConsumableArray(a))), 
            g.setData({
                list: a,
                one_num: t.one_num,
                two_num: t.two_num
            }), g.data.fxset || g.setData({
                fxset: wx.getStorageSync("fxset")
            }), a.length && pages * app.config.fx_number >= t.num && g.setData({
                isLoad: !0
            }), wx.stopPullDownRefresh();
        }
    });
}

page({
    data: {
        cur: 0,
        scrollLeft: 0,
        items: [ "一级", "二级" ],
        no_laws: app.srcRoot + "no_law.png",
        isLoad: !1
    },
    onLoad: function(t) {
        g = this, pages = 1, getList();
    },
    onPullDownRefresh: function() {
        pages = 1, getList();
    },
    tabSelect: function(t) {
        t = t.currentTarget.dataset, g.setData({
            cur: t.index,
            scrollLeft: 60 * (t.index - 1)
        }), pages = 1, getList();
    },
    onReachBottom: function() {
        !g.data.isLoad && pages++ && getList();
    }
});