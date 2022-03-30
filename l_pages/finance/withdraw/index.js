var g, _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (t[o] = a[o]);
    }
    return t;
}, _tools = require("../../../utils/tools.js"), app = getApp(), page = app.page, request = app.util.request, route = app.route;

function getTxSet() {
    request({
        url: "MLawTxSet",
        success: function(t) {
            g.setData(_extends({}, t));
        }
    });
}

function toast(t) {
    wx.showToast({
        icon: "none",
        title: t
    });
}

page({
    data: {
        tx_bg: app.srcRoot + "tx_bg.png",
        checked: 1,
        value: "0.0"
    },
    onLoad: function(t) {
        (g = this).setData({
            value: app.m || 0
        }, function() {
            app.m = "";
        }), getTxSet();
    },
    check: function(t) {
        (0, _tools.subscribe)("LAWYER");
        var e = t.currentTarget.dataset.type;
        g.setData({
            checked: e
        });
    },
    allMoney: function(t) {
        (0, _tools.subscribe)("LAWYER"), g.setData({
            money: g.data.value
        });
    },
    submit: function(t) {
        (0, _tools.subscribe)("LAWYER");
        var e = t.detail.value.name || "", a = t.detail.value.account || "", o = parseFloat(t.detail.value.money), n = parseInt(g.data.checked), s = parseFloat(g.data.value);
        !o || s < o ? toast("提现金额错误") : e && a || 1 == n ? request({
            url: "MLawTx",
            data: {
                tx_name: e,
                tx_zhanghao: a,
                tx_type: n,
                money: o,
                user_id: app.userInfo.id || wx.getStorageSync("userInfo").id
            },
            success: function(t) {
                1 == t ? (app.item = {
                    title: "提交成功",
                    content: "请耐心等待平台审核",
                    img: "pay_ok",
                    button: [ {
                        title: "返回首页",
                        url: "loading",
                        type: "reLaunch"
                    }, {
                        title: "返回钱包",
                        type: "navigateBack",
                        delta: 1
                    } ]
                }, route({
                    type: "redirect",
                    url: "result"
                })) : toast("错误:" + t);
            }
        }) : toast("请填写账户信息");
    }
});