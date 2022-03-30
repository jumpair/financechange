var g, app = getApp(), page = app.page, request = app.util.request, route = app.route;

Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        data: {
            type: Object
        },
        isShow: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        hideModal: function(t) {
            var a = this;
            a.setData({
                isShow: !a.data.isShow
            }, function() {
                a.triggerEvent("tap", {});
            });
        }
    }
});