var g, app = getApp(), page = app.page, request = app.util.request, route = app.route;

Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        data: {
            type: Object
        },
        params: {
            type: Object,
            value: {
                borderRadius: 10,
                color: "#FFFFFF",
                height: 130,
                interval: 2e3,
                paddingLeft: 5,
                paddingTop: 5
            }
        }
    },
    data: {},
    methods: {
        toPage: function(e) {
            var t = e.currentTarget.dataset.item;
            route({
                url: t.url || t.linkUrl
            });
        }
    }
});