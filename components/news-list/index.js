var app = getApp(), route = app.route;

Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        photo: {
            type: String,
            value: "/static/images/lawyer_photo.png"
        },
        mClass: {
            type: String
        },
        sClass: {
            type: String
        },
        mStyle: {
            type: String
        },
        data: {
            type: Object
        }
    },
    data: {
        no_news: app.srcRoot + "no_new.png"
    },
    methods: {
        submitFromId: function(t) {
            app.currentPage.submitFromId(t);
        },
        toInfo: function(t) {
            route({
                url: "news_info",
                params: {
                    index: t.currentTarget.dataset.d[1],
                    id: t.currentTarget.dataset.d[0]
                }
            });
        }
    }
});