var app = getApp(), page = app.page, request = app.util.request, route = app.route;

Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        show: {
            type: Boolean,
            value: !0
        }
    },
    data: {},
    created: function() {
        (app.tabbar = this).setData({
            cur_index: app.cur_index || 0
        });
    },
    observers: {
        dataNav: function() {
            this.setData({
                chat_route: require("../../utils/page_urls.js").chat
            });
        }
    },
    methods: {
        toPage: function(e) {
            var t = e.currentTarget.dataset.item, a = e.currentTarget.dataset.index;
            app.cur_index = a, app.pages = t.url, route({
                type: "redirect",
                url: "/" + t.url
            });
        }
    }
});