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
            var t, r = 1, e = "", p = "";
            a.params && (p = "padding:" + ((t = a.params).paddingTb || 0) + "rpx " + (t.paddingLr || 0) + "rpx;", 
            p += "margin:" + (t.paddingTbOut || 0) + "rpx " + (t.paddingLrOut || 0) + "rpx;", 
            p += "border-radius:" + (t.borderRadius || 0) + "rpx;", e = t.leftTitle || "", r = t.style || 1), 
            g.setData({
                system: app.system,
                leftTitle: e,
                params: p,
                style: r,
                count: a.data.count || [],
                avatarUrlList: a.data.avatarUrlList || []
            });
        }
    },
    methods: {}
});