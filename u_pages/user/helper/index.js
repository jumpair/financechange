var g, app = getApp(), page = app.page, route = app.route, request = app.util.request;

page({
    data: {},
    onLoad: function(t) {
        g = this, request({
            url: "HelpList",
            success: function(t) {
                g.setData({
                    list: t
                });
            }
        });
    },
    toInfo: function(t) {
        app.item = t.currentTarget.dataset.item, route({
            url: "helper_info"
        });
    }
});