var g, app = getApp();

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
        data: {
            type: Object
        },
        mStyle: {
            type: String
        }
    },
    data: {
        no_laws: app.srcRoot + "no_law.png"
    },
    created: function() {
        g = this;
    },
    observers: {
        data: function() {
            g.setData({
                btn_color: app.system.foot_color2 || "",
                zhiye: app.system.zhiye || ""
            });
        }
    },
    methods: {
        submitFromId: function(t) {
            app.currentPage.submitFromId(t);
        },
        toInfo: function(t) {
            var a = t.currentTarget.dataset.id;
            app.route({
                type: "navigate",
                url: "lawyer_info",
                params: {
                    id: a
                }
            });
        }
    }
});