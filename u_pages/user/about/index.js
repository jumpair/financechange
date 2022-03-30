var g, app = getApp(), page = app.page, request = app.util.request;

page({
    data: {},
    onLoad: function(t) {
        g = this, request({
            url: "About",
            success: function(t) {
                g.setData({
                    content: t
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {}
});