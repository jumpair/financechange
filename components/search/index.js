var app = getApp(), route = app.route;

Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        mClass: {
            type: String
        },
        mStyle: {
            type: String
        },
        icon: {
            type: String,
            value: "cuIcon-search"
        },
        text: {
            type: String,
            value: "搜索"
        },
        url: {
            type: String
        },
        data: {
            type: Object
        }
    },
    data: {},
    methods: {
        toPage: function(t) {
            route({
                url: this.data.url,
                params: this.data.data
            });
        }
    }
});