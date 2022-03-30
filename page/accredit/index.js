var g, _tools = require("../../utils/tools"), app = getApp(), page = app.page, request = app.util.request, route = app.route, toast = app.toast;

page({
    data: {},
    onLoad: function(e) {
        g = this;
    },
    onPullDownRefresh: function() {},
    getUserInfo: function(e) {
        "getUserInfo:ok" == e.detail.errMsg && (0, _tools.updeta)(e.detail.userInfo, function(e) {
            "游客" == e.nickName || "1" == g.data.system.is_force_getphone && !g.data.userInfo.phone || route({
                type: "redirect",
                url: app.force_before_path,
                params: app.force_before_data
            });
        });
    },
    getUserProfile: function() {
        wx.getUserProfile({
            desc: "用于完善用户的基础信息",
            success: function(e) {
                "getUserProfile:ok" == e.errMsg && (0, _tools.updeta)(e.userInfo, function(e) {
                    "游客" == e.nickName || "1" == g.data.system.is_force_getphone && !g.data.userInfo.phone || route({
                        type: "redirect",
                        url: app.force_before_path,
                        params: app.force_before_data
                    });
                });
            },
            fail: function(e) {
                console.log("用户取消授权"), that.setData({
                    updeta: !1
                }), g.triggerEvent("cancel");
            },
            complete: function() {
                g.isShow();
            }
        });
    },
    getPhoneNumber: function(e) {
        (0, _tools.getPhoneNumber)(e, function(e) {
            !e || "1" == g.data.system.is_force_login && "游客" == g.data.userInfo.nickName || route({
                type: "redirect",
                url: app.force_before_path,
                params: app.force_before_data
            });
        });
    }
});