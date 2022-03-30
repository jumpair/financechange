var _tools = require("../../../utils/tools");

function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var g, order_id, id, app = getApp(), page = app.page, request = app.util.request, route = app.route;

page({
    data: {
        imgList: [],
        rater: 4
    },
    onLoad: function(e) {
        (g = this).setData({
            type: e.type,
            placeholder: 0 == e.type ? "服务满足你的期待吗?说说你的使用心得,分享给其他人吧" : "商品达到你的期待吗?说说你的使用心得,分享给其他人吧"
        }), order_id = e.order_id, id = e.id;
    },
    ChooseImage: function() {
        wx.chooseImage({
            count: 4,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album" ],
            success: function(e) {
                0 != g.data.imgList.length ? g.setData({
                    imgList: g.data.imgList.concat(e.tempFilePaths)
                }) : g.setData({
                    imgList: e.tempFilePaths
                });
            }
        });
    },
    ViewImage: function(e) {
        wx.previewImage({
            urls: g.data.imgList,
            current: e.currentTarget.dataset.url
        });
    },
    DelImg: function(e) {
        g.data.imgList.splice(e.currentTarget.dataset.index, 1), g.setData({
            imgList: g.data.imgList
        });
    },
    raterChange: function(e) {
        g.setData({
            rater: e.detail.value
        });
    },
    input: function(e) {
        g.setData({
            value: e.detail.value
        });
    },
    submit: function() {
        g.data.value ? (wx.showLoading({
            mask: !0,
            title: "图片上传中..."
        }), (0, _tools.uploadImg)(g.data.imgList, function(e) {
            var t;
            wx.showLoading({
                mask: !0,
                title: "正在提交"
            });
            var a = 0 == g.data.type ? "law_id" : "good_id";
            request({
                url: 0 == g.data.type ? "LawOrderComment" : "ShopOrderComment",
                data: (t = {
                    order_id: order_id,
                    user_id: app.userInfo.id || wx.getStorageSync("userInfo").id
                }, _defineProperty(t, a, id), _defineProperty(t, "comment", g.data.value), _defineProperty(t, "score", g.data.rater), 
                _defineProperty(t, "imglist", e), t),
                showLoading: !1,
                success: function(e) {
                    wx.hideLoading();
                    var t = e ? "评价成功" : "错误:" + e;
                    wx.showToast({
                        icon: "none",
                        title: t
                    }), e && setTimeout(function() {
                        app.item = {
                            title: "评价成功",
                            content: "感谢你的评价,如果遇到任何问题请联系客服",
                            img: "pay_ok",
                            button: [ {
                                title: "查看订单",
                                url: 0 == g.data.type ? "lawyer_orders" : "orders"
                            }, {
                                title: "返回首页",
                                url: "loading",
                                type: "reLaunch"
                            } ]
                        }, route({
                            type: "redirect",
                            url: "result"
                        });
                    }, 1500);
                }
            });
        })) : wx.showToast({
            icon: "none",
            title: "请输入评价内容"
        });
    }
});