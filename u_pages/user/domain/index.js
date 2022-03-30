var g, list, index, app = getApp(), page = app.page, request = app.util.request, route = app.route;

page({
    data: {},
    onLoad: function(e) {
        g = this, list = [];
    },
    onShow: function() {
        app.item ? g.setData({
            goodareas: app.item
        }) : request({
            url: "LawType",
            showLoading: !1,
            success: function(e) {
                g.setData({
                    goodareas: e
                });
            }
        });
    },
    checkbox: function(e) {
        var t = g.data.goodareas;
        e = e.detail.value;
        for (var a = index = 0; a < t.length; a++) t[a].checked = !1;
        for (a = 0; a < e.length; a++) t[e[a]].checked = !0, index++;
        list = t;
    },
    submit: function() {
        list.length ? 4 < index ? wx.showToast({
            icon: "none",
            title: "最多只能选择4项"
        }) : (app.item = list, route({
            type: "navigateBack",
            delta: 1
        })) : wx.showToast({
            icon: "none",
            title: "最少选择1项哦"
        });
    }
});