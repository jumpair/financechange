var app = getApp(), page = app.page;

page({
    data: {},
    onLoad: function(t) {
        var a = app.indexData.notice[t.i];
        wx.setNavigationBarTitle({
            title: a.title
        }), this.setData({
            content: a.content
        });
    }
});