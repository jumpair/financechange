var g, app = getApp(), page = app.page, request = app.util.request, route = app.route;

Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        list: {
            type: Object
        }
    },
    data: {
        no_goods: app.srcRoot + "no_shop.png"
    },
    methods: {
        toInfo: function(t) {
            route({
                url: "shop_info",
                params: {
                    id: t.currentTarget.dataset.id
                }
            });
        }
    }
});