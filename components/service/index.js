var g, app = getApp();

Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        data: {
            type: Object,
            value: {}
        }
    },
    data: {},
    created: function() {
        g = this;
    },
    observers: {
        data: function(a) {
            var t, s = 1, p = "", d = "";
            a.params && (d = "padding:" + ((t = a.params).paddingTb || 0) + "rpx " + (t.paddingLr || 0) + "rpx;", 
            d += "margin:" + (t.paddingTbOut || 0) + "rpx " + (t.paddingLrOut || 0) + "rpx;", 
            d += "border-radius:" + (t.borderRadius || 0) + "rpx;", p = t.topTitle || "", s = t.style || 1), 
            g.setData({
                system: app.system,
                topTitle: p,
                params: d,
                style: s,
                zzxs: a.data.zzxs || 0,
                byzxs: a.data.byzxs || 0,
                zlss: a.data.zlss || 0
            });
        }
    },
    methods: {}
});