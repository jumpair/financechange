var g, app = getApp(), page = app.page, request = app.util.request, route = app.route, toast = app.toast;

page({
    data: {
        url: ""
    },
    onLoad: function(t) {
        (g = this).setData({
            url: decodeURIComponent(t.url)
        });
    },
    onPullDownRefresh: function() {}
});