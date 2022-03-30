var g, content, order_id, type, _tools = require("../../../../utils/tools"), app = getApp(), page = app.page, request = app.util.request, route = app.route;

page({
    data: {
        imgList: []
    },
    onLoad: function(t) {
        g = this, content = "", order_id = t.order_id, type = parseInt(t.type), wx.setNavigationBarTitle({
            title: type ? "回复" : "咨询"
        }), g.setData({
            type: type
        });
    },
    onPullDownRefresh: function() {},
    ChooseImage: function() {
        wx.chooseImage({
            count: 9,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album" ],
            success: function(t) {
                0 != g.data.imgList.length ? g.setData({
                    imgList: g.data.imgList.concat(t.tempFilePaths)
                }) : g.setData({
                    imgList: t.tempFilePaths
                });
            }
        });
    },
    ViewImage: function(t) {
        wx.previewImage({
            urls: g.data.imgList,
            current: t.currentTarget.dataset.url
        });
    },
    DelImg: function(t) {
        g.data.imgList.splice(t.currentTarget.dataset.index, 1), g.setData({
            imgList: g.data.imgList
        });
    },
    input: function(t) {
        content = t.detail.value;
    },
    submit: function() {
        (0, _tools.subscribe)("USER"), content ? (wx.showLoading({
            mask: !0,
            title: "图片上传中..."
        }), (0, _tools.uploadImg)(g.data.imgList, function(t) {
            wx.showLoading({
                mask: !0,
                title: "正在提交"
            }), request({
                url: "ServiceLogSubmit",
                data: {
                    order_id: order_id,
                    imglist: t,
                    content: content,
                    role: type ? 2 : 1
                },
                showLoading: !1,
                success: function(t) {
                    wx.hideLoading();
                    var e = t ? "提交成功" : "错误:" + t;
                    wx.showToast({
                        icon: "none",
                        title: e
                    }), t && setTimeout(function() {
                        route({
                            type: "navigateBack",
                            delta: 1
                        });
                    }, 1500);
                }
            });
        })) : wx.showToast({
            icon: "none",
            title: "请输入咨询内容"
        });
    }
});