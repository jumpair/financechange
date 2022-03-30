var g, order_id, type, _tools = require("../../../utils/tools.js"), app = getApp(), page = app.page, request = app.util.request, route = app.route;

function getService() {
    request({
        url: "ServiceLog",
        data: {
            order_id: order_id
        },
        showLoading: !1,
        success: function(e) {
            g.setData({
                logs: e
            }), wx.stopPullDownRefresh();
        }
    });
}

page({
    data: {},
    onLoad: function(e) {
        g = this, order_id = e.order_id, type = e.user_type || 0, g.setData({
            type: type,
            state: e.state
        });
    },
    onPullDownRefresh: function() {
        getService();
    },
    onShow: function() {
        getService();
    },
    toEdit: function() {
        (0, _tools.subscribe)("USER"), route({
            type: "navigate",
            url: "service_edit",
            params: {
                order_id: order_id,
                type: type
            }
        });
    },
    viewImg: function(e) {
        (0, _tools.subscribe)("USER");
        var t = e.currentTarget.dataset.i, r = e.currentTarget.dataset.index, o = g.data.logs[r].imglist;
        wx.previewImage({
            current: o[t],
            urls: o
        });
    }
});