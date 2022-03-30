var g, _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a, n = arguments[e];
        for (a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
}, app = getApp(), page = app.page, request = app.util.request, route = app.route, toast = app.toast, subscribe = function() {};

function getFxSet() {
    request({
        url: "FxSet",
        data: {
            user_id: wx.getStorageSync("userInfo").id
        },
        success: function(t) {
            g.setData(_extends({}, t.fxset, {
                wallet: t.wallet
            })), wx.stopPullDownRefresh();
        }
    });
}

page({
    data: {
        tx_bg: app.srcRoot + "tx_bg.png",
        checked: 1
    },
    onLoad: function(t) {
        g = this;
    },
    onShow: function() {
        getFxSet();
    },
    check: function(t) {
        subscribe("USER");
        t = t.currentTarget.dataset.type;
        g.setData({
            checked: t
        });
    },
    allMoney: function(t) {
        subscribe("USER"), g.setData({
            money: g.data.wallet.ktx_money
        });
    },
    onPullDownRefresh: function() {
        getFxSet();
    },
    submit: function(t) {
        subscribe("USER");
        var e = t.detail.value.name || "", a = t.detail.value.account || "", n = parseFloat(t.detail.value.money), o = parseInt(g.data.checked), t = parseFloat(g.data.wallet.ktx_money);
        n ? t < n ? toast("提现金额不能大于可提现金额") : n < parseFloat(g.data.tx_set.min_money) ? toast("提现金额不能小于" + parseFloat(g.data.tx_set.min_money) + "元") : e && a || 1 == o ? request({
            url: "DisTx",
            data: {
                tx_name: e,
                tx_zhanghao: a,
                tx_type: o,
                money: n,
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
                        title: "返回上级",
                        type: "navigateBack",
                        delta: 1
                    } ]
                }, route({
                    type: "redirect",
                    url: "result"
                })) : toast("错误:" + t);
            }
        }) : toast("请填写账户信息") : toast("提现金额不能为空");
    }
});