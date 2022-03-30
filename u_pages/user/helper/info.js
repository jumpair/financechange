var g, _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
}, app = getApp(), page = app.page, request = app.util.request;

page({
    onLoad: function(t) {
        (g = this).setData(_extends({}, app.item), function() {
            app.item = "";
        });
    },
    onReady: function() {},
    onShow: function() {}
});