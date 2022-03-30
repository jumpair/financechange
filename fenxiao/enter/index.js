var g, _tools = require("../../utils/tools"), app = getApp(), page = app.page, request = app.util.request, route = app.route, toast = app.toast, subscribe = function() {};

page({
    data: {
        radio: !1
    },
    onLoad: function(t) {
        g = this, request({
            url: "FxSet",
            data: {
                user_id: wx.getStorageSync("userInfo").id
            },
            success: function(t) {
                return g.setData(t);
            }
        }), (0, _tools.verifyLogin)({});
    },
    onPullDownRefresh: function() {},
    radio: function(t) {
        g.setData({
            radio: !g.data.radio
        });
    },
    html_page: function() {
        app.centent = g.data.fxset.agreement, route({
            type: "navigate",
            url: "html_page",
            params: {
                title: (g.data.system.fx_title2 || "分销商") + "申请协议"
            }
        });
    },
    shxx: function(t) {
        return subscribe("USER");
    },
    submit: function(t) {
        return (t = t.detail.value).name ? t.phone ? 11 != t.phone.length ? toast("请输入正确的手机号码") : g.data.radio ? void request({
            url: "BecomeFx",
            data: {
                name: t.name,
                phone: t.phone,
                user_id: wx.getStorageSync("userInfo").id
            },
            success: function(t) {
                t ? ("2" == g.data.fxset.verify ? (app.userInfo.is_distributor = 3,app.item = {
                    title: "提交",
                    content: "提交成功请重新载入小程序",
                    img: "pay_ok",
                    button: [ {
                        title: "返回首页",
                        url: "loading",
                        type: "reLaunch"
                    } ]
                    }, route({
                    type: "redirect",
                    url: "result"
                })) : "1" == g.data.fxset.verify && (app.userInfo.is_distributor = 2, app.item = {
                    title: "审核中",
                    content: "您的申请已提交,请耐心等待审核",
                    img: "pay_ok",
                    button: [ {
                        title: "返回首页",
                        url: "loading",
                        type: "reLaunch"
                    } ]
                }, route({
                    type: "redirect",
                    url: "result"
                })), wx.setStorageSync("userInfo", app.userInfo)) : toast("错误:" + t);
            }
        }) : toast("请阅读并勾选申请协议") : toast("请输入手机号") : toast("请输入姓名");
    },
    loginCancel: function() {
        route({
            type: "reLaunch",
            url: "loading"
        });
    }
});