var g, app = getApp(), page = app.page, request = app.util.request, route = app.route;

page({
    data: {},
    onLoad: function(t) {
        g = this, wx.setNavigationBarTitle({
            title: t.title
        }), g.setData({
            content: app.centent
        }, function() {
            app.centent = "";
        });
    },
    onPullDownRefresh: function() {}
});