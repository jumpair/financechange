var that, g, _tools = require("../../utils/tools.js"), _util = require("../../utils/util.js"), app = getApp();

Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        isShow: {
            type: Boolean
        },
        mainColor: {
            type: String,
            value: "#1155cc"
        }
    },
    data: {
        image: app.srcRoot + "login-bg.png"
    },
    attached: function() {
        g = this, that = getCurrentPages()[getCurrentPages().length - 1];
    },
    observers: {
        mainColor: function(t) {
            this.setData({
                textColor: (0, _tools.isDark)(t)
            });
        }
    },
    methods: {
        isShow: function(t) {
            this.data.isShow && that.setData({
                isLogin: !1
            }), t && t.currentTarget.dataset.type && g.triggerEvent("cancel");
        },
        getUserInfo: function(t) {
            "getUserInfo:ok" == t.detail.errMsg ? (0, _tools.updeta)(t.detail.userInfo) : (that.setData({
                updeta: !1
            }), console.log("用户取消授权"), g.triggerEvent("cancel"));
        },
        getUserProfile: function() {
            wx.getUserProfile({
                desc: "用于完善用户的基础信息",
                success: function(t) {
                    "getUserProfile:ok" == t.errMsg && (0, _tools.updeta)(t.userInfo);
                },
                fail: function(t) {
                    console.log("用户取消授权"), that.setData({
                        updeta: !1
                    }), g.triggerEvent("cancel");
                },
                complete: function() {
                    g.isShow();
                }
            });
        },
        touchmove: function() {}
    }
});