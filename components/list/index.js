var g, _tools = require("../../utils/tools"), app = getApp(), page = app.page, request = app.util.request, route = app.route;

Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        data: null,
        isme: null,
        islaw: null,
        is_diy: null
    },
    data: {},
    observers: {
        data: function(t) {
            this.setData({
                no_data: app.srcRoot + "no_data.png",
                user: app.srcRoot + "user.png"
            });
        }
    },
    methods: {
        toInfo: function(t) {
            route({
                url: "wenda_info",
                params: {
                    id: t.currentTarget.dataset.item.id
                }
            });
        }
    }
});