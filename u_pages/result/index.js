var g, _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var p in a) Object.prototype.hasOwnProperty.call(a, p) && (t[p] = a[p]);
    }
    return t;
}, app = getApp(), page = app.page, request = app.util.request, route = app.route;

page({
    data: {},
    onLoad: function(t) {
        console.log(app.item)
        g = this, wx.setNavigationBarTitle({
            title: app.item.title
        }), app.item.img = app.srcRoot + app.item.img + ".png", g.setData(_extends({}, app.item), function() {
            app.item = "";
        });
    },
    onPullDownRefresh: function() {},
    toPage: function(t) {

        t = t.currentTarget.dataset.item,
        console.log(t);
        route({
            url: t.url,
            type: t.type || "redirect",
            params: t.a || t.params || "",
            delta: t.delta || ""
        });
    }
});