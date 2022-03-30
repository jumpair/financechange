var app = getApp(), page = app.page, request = app.util.request, route = app.route;

Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        bg_tag: {
            type: String,
            value: "#212121"
        },
        title: {
            type: String
        },
        title_color: {
            type: String,
            value: "#2d3142"
        },
        more_text: {
            type: String,
            value: "更多"
        },
        more_text_color: {
            type: String,
            value: "#999999"
        },
        more_url: {
            type: String
        },
        mClass: {
            type: String
        },
        type: {
            type: Number,
            value: 1
        }
    },
    data: {},
    created: function() {},
    methods: {
        toPage: function(t) {
            route({
                url: this.data.more_url
            });
        }
    }
});