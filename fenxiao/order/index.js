var g, app = getApp(), page = app.page, request = app.util.request, route = app.route, toast = app.toast;

function getList() {
    request({
        url: "MyDisOrderList",
        data: {
            user_id: app.userInfo.id || wx.getStorageSync("userInfo").id
        },
        success: function(t) {
            for (var e = [ t ], s = 0; s < t.length; s++) e[t[s].type] || (e[t[s].type] = []), 
            e[t[s].type].push(t[s]);
            g.setData({
                list: e
            }), wx.stopPullDownRefresh();
        }
    });
}

page({
    data: {
        cur: 0,
        no_orders: app.srcRoot + "no_order.png",
        items: [ "全部", "商城", "服务", "入驻" ]
    },
    onLoad: function(t) {
        g = this, getList();
    },
    onPullDownRefresh: function() {
        getList();
    },
    tabSelect: function(t) {
        this.setData({
            cur: t.currentTarget.dataset.index
        });
    }
});