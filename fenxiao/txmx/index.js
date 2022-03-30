var g, app = getApp(), page = app.page, request = app.util.request, route = app.route, toast = app.toast;

function getList() {
    request({
        url: "FxTxMx",
        data: {
            user_id: app.userInfo.id || wx.getStorageSync("userInfo").id
        },
        success: function(t) {
            for (var e = [ t ], a = 0; a < t.length; a++) e[t[a].state] || (e[t[a].state] = []), 
            e[t[a].state].push(t[a]);
            g.setData({
                list: e
            }), wx.stopPullDownRefresh();
        }
    });
}

page({
    data: {
        cur: 0,
        items: [ "全部", "提现中", "已打款", "驳回" ],
        no_detail: app.srcRoot + "no_record.png"
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