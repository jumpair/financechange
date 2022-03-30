var app = getApp(), page = app.page, request = app.util.request, route = app.route;

Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        img: {
            type: String,
            value: "blacklist.jpg"
        },
        content: {
            type: String,
            value: "您已被拉入黑名单哦! 快联系解决吧"
        },
        mStyle: {
            type: String,
            value: ""
        },
        button: {
            type: Object,
            value: [ {
                title: "联系客服",
                class: "",
                style: "",
                type: "",
                open_type: "contact"
            } ]
        },
        isShow: {
            type: Boolean
        }
    },
    data: {
        src: app.srcRoot
    },
    created: function() {},
    methods: {
        buttonDo: function(t) {
            switch ((t = t.currentTarget.dataset.item).type) {
              case "call":
                wx.makePhoneCall({
                    phoneNumber: t.data
                });
                break;

              case "route":
                route({
                    type: "navigate",
                    url: t.data
                });
            }
        },
        preventTouchMove: function() {}
    }
});