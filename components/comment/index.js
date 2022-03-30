var that, g, value, _tools = require("../../utils/tools.js"), app = getApp();

Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        color: {
            type: String,
            value: "#1155cc"
        },
        title: {
            type: String,
            value: "评论"
        },
        send: {
            type: String,
            value: "立即评论"
        },
        hint: {
            type: String,
            value: "快输入您的评论吧..."
        },
        data: {
            type: Object
        }
    },
    data: {},
    observers: {
        color: function(t) {
            this.setData({
                textColor: (0, _tools.isDark)(t)
            });
        }
    },
    methods: {
        isShow: function() {
            value = "", app.currentPage.setData({
                input_focus: !app.currentPage.data.input_focus
            });
        },
        comment: function() {
            value ? (this.triggerEvent("comment", {
                value: value
            }), this.isShow()) : wx.showToast({
                icon: "none",
                title: "请输入" + (this.data.data ? "回复" : this.data.title) + "内容"
            });
        },
        input: function(t) {
            value = t.detail.value;
        }
    }
});