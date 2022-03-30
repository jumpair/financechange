var g, order_id, _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (e[a] = r[a]);
    }
    return e;
}, app = getApp(), page = app.page, request = app.util.request, route = app.route;

function getKuaiDi() {
    request({
        url: "KuaidiCha",
        data: {
            order_id: order_id
        },
        showLoading: !1,
        success: function(e) {
            g.setData(_extends({}, e)), wx.stopPullDownRefresh();
        }
    });
}

page({
    data: {
        log_state: [ "无状态", "已揽件", "在途中", "已签收", "问题件" ]
    },
    onLoad: function(e) {
        g = this, order_id = e.order_id;
    },
    onPullDownRefresh: function() {
        getKuaiDi();
    },
    onShow: function() {
        getKuaiDi();
    },
    toEdit: function() {
        route({
            type: "navigate",
            url: "service_edit",
            params: {
                order_id: order_id
            }
        });
    },
    viewImg: function(e) {
        var t = e.currentTarget.dataset.i, r = e.currentTarget.dataset.index, a = g.data.logs[r].imglist;
        wx.previewImage({
            current: a[t],
            urls: a
        });
    }
});