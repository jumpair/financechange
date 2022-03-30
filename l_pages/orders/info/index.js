var g, order_id, type, _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];
        for (var r in o) Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r]);
    }
    return e;
}, _tools = require("../../../utils/tools"), app = getApp(), page = app.page, request = app.util.request, route = app.route;

function getInfo() {
    request({
        url: "LawOrderInfo",
        data: {
            order_id: order_id
        },
        showLoading: !1,
        success: function(e) {
            wx.stopPullDownRefresh(), g.setData(_extends({}, e));
        }
    });
}

page({
    data: {},
    onLoad: function(e) {
        g = this;
        var t = wx.getStorageSync("system");
        wx.setNavigationBarColor({
            backgroundColor: t.foot_color2,
            frontColor: t.text_color
        }), order_id = e.order_id, getInfo();
    },
    onPullDownRefresh: function() {
        getInfo();
    },
    viewImg: function(e) {
        (0, _tools.subscribe)("LAWYER"), wx.previewImage({
            current: e.currentTarget.dataset.src,
            urls: g.data.imglist
        });
    },
    callOk: function(e) {
        (0, _tools.subscribe)("LAWYER"), request({
            url: "MLawOrderPhoneOk",
            data: {
                order_id: g.data.id
            },
            showLoading: !1,
            success: function(e) {
                var t = e ? "提交成功" : "错误:" + e;
                wx.showToast({
                    icon: "none",
                    title: t
                }), getInfo();
            }
        });
    },
    callPhone: function(e) {
        (0, _tools.subscribe)("LAWYER"), wx.makePhoneCall({
            phoneNumber: g.data.phone
        });
    },
    service_log: function(e) {
        (0, _tools.subscribe)("LAWYER"), route({
            type: "navigate",
            url: "service_log",
            params: {
                order_id: g.data.id,
                user_type: 1,
                state: g.data.order_state
            }
        });
    },
    orderOk: function(e) {
        (0, _tools.subscribe)("LAWYER"), request({
            url: "LawOrderAachieve",
            data: {
                order_id: g.data.id
            },
            showLoading: !1,
            success: function(e) {
                var t = e ? "已完成" : "错误:" + e;
                wx.showToast({
                    icon: "none",
                    title: t
                }), e && getInfo();
            }
        });
    },
    toChat: function(e) {
        (0, _tools.subscribe)("LAWYER"), route({
            type: "navigate",
            url: "chat_info",
            params: {
                toid: e.currentTarget.dataset.toid
            }
        });
    }
});