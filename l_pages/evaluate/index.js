var _tools = require("../../utils/tools");

function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0, a = Array(e.length); t < e.length; t++) a[t] = e[t];
        return a;
    }
    return Array.from(e);
}

function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var g, pages, index, app = getApp(), page = app.page, request = app.util.request, route = app.route;

function getList() {
    var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 1;
    request({
        url: "MLawComment",
        data: {
            user_id: app.userInfo.id || wx.getStorageSync("userInfo").id,
            page: a,
            number: app.config.evaluate_number
        },
        showLoading: !1,
        success: function(e) {
            wx.stopPullDownRefresh();
            var t = g.data.list;
            t && 1 != a && (e = [].concat(_toConsumableArray(t), _toConsumableArray(e))), g.setData({
                list: e
            }), e.length && a * app.config.evaluate_number >= e[0].num && g.setData({
                isLoad: !0
            });
        }
    });
}

page({
    data: {
        top_img: app.srcRoot + "l_evaluate_bg.png",
        no_comment: app.srcRoot + "no_comment.png",
        isLoad: !1,
        input_focus: !1
    },
    onLoad: function(e) {
        g = this, pages = 1, getList();
    },
    onPullDownRefresh: function() {
        pages = 1, g.setData({
            isLoad: !1,
            list: []
        }, function() {
            getList();
        });
    },
    onReachBottom: function() {
        !g.data.isLoad && pages++ && getList(pages);
    },
    comment: function(n) {
        (0, _tools.subscribe)("LAWYER");
        var e = g.data.list[index].id;
        request({
            url: "MLawCommentBack",
            data: {
                comment_id: e,
                law_comment: n.detail.value
            },
            success: function(e) {
                var t = 1 == e ? "成功" : "失败";
                wx.showToast({
                    icon: "none",
                    title: "回复" + t
                });
                var a = "list[" + index + "].law_comment";
                1 == e && g.setData(_defineProperty({}, a, n.detail.value));
            }
        });
    },
    showComment: function(e) {
        (0, _tools.subscribe)("LAWYER"), ((e = e.currentTarget.dataset).item || "").law_comment || (index = parseInt(e.index), 
        g.setData({
            input_focus: !0
        }));
    }
});