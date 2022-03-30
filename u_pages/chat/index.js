var g, _tools = require("../../utils/tools"), app = getApp(), page = app.page, request = app.util.request, route = app.route;

page({
    data: {
        no_chat: app.srcRoot + "no_chat.png"
    },
    onLoad: function(t) {
        app.chatListThat = g = this;
    },
    onReady: function() {
        (0, _tools.getChatList)();
    },
    ListTouchStart: function(t) {
        this.setData({
            ListTouchStart: t.touches[0].pageX
        });
    },
    ListTouchMove: function(t) {
        this.setData({
            ListTouchDirection: 0 < t.touches[0].pageX - this.data.ListTouchStart ? "right" : "left"
        });
    },
    ListTouchEnd: function(t) {
        "left" == this.data.ListTouchDirection ? this.setData({
            modalName: t.currentTarget.dataset.target
        }) : this.setData({
            modalName: null
        }), this.setData({
            ListTouchDirection: null
        });
    },
    toInfo: function(t) {
        (0, _tools.subscribe)("USER"), route({
            url: "chat_info",
            params: {
                toid: t.currentTarget.dataset.toid
            }
        });
    }
});