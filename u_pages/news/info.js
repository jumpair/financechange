var _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
}, _page_urls = require("../../utils/page_urls.js"), _page_urls2 = _interopRequireDefault(_page_urls), _tools = require("../../utils/tools");

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _defineProperty(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

var item, g, index, scrollTop, app = getApp(), page = app.page, request = app.util.request, route = app.route;

function add(e, t) {
    var n = parseInt(e[t]);
    switch (t) {
      case "zan_num":
        n = 1 == e.is_zan ? n - 1 : n + 1;
        break;

      default:
        n++;
    }
    if (g.setData(_defineProperty({}, t, n)), index) {
        var a = getCurrentPages()[getCurrentPages().length - 2], o = "news_list[" + index + "]." + t;
        a.route == _page_urls2.default.news && a.setData(_defineProperty({}, o, n));
    }
}

function getInfo(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : function() {};
    request({
        url: "NewInfo",
        data: {
            new_id: e,
            user_id: app.userInfo.id || wx.getStorageSync("userInfo").id
        },
        showLoading: !1,
        success: function(e) {
            wx.pageScrollTo({
                scrollTop: scrollTop
            }), g.setData(_extends({}, e)), t(e);
        }
    });
}

page({
    data: {
        input_focus: !1,
        isLogin: !1,
        no_comment: app.srcRoot + "no_comment.png"
    },
    onLoad: function(e) {
        g = this, index = e.index || "", scrollTop = 0, getInfo(e.scene || e.id, function(t) {
            request({
                url: "NewViewAdd",
                data: {
                    new_id: t.id
                },
                showLoading: !1,
                success: function(e) {
                    e ? add(t, "view_num") : wx.showToast({
                        icon: "none",
                        title: "错误:" + e
                    });
                }
            });
        });
    },
    onShareAppMessage: function(e) {
        return {
            title: g.data.title,
            path: g.route + "?id=" + g.data.id,
            imageUrl: g.data.img || ""
        };
    },
    showComment: function(e) {
        var t = (e = e.currentTarget.dataset).item || "";
        switch (e.i) {
          case "0":
          case "1":
            t.name = t.nickName, t.nid = t.user_id;
            break;

          case "2":
            t.name = t.c_nickName, t.nid = t.uid;
        }
        t.nid != g.data.userInfo.id ? (0, _tools.verifyLogin)({
            success: function() {
                g.setData({
                    input_focus: !0,
                    comment_item: t
                });
            }
        }) : wx.showToast({
            icon: "none",
            title: "亲,不能评论自己哦"
        });
    },
    collect: function() {
        var t = g.data.is_collect;
        t = 1 == t ? 2 : 1, (0, _tools.verifyLogin)({
            success: function() {
                request({
                    url: "NewsCollect",
                    data: {
                        type: t,
                        news_id: g.data.id,
                        user_id: app.userInfo.id
                    },
                    showLoading: !1,
                    success: function(e) {
                        e ? g.setData({
                            is_collect: t
                        }) : wx.showToast({
                            icon: "none",
                            title: "错误:" + e
                        });
                    }
                });
            }
        });
    },
    zan: function() {
        var t = g.data.is_zan;
        t = 1 == t ? 2 : 1, (0, _tools.verifyLogin)({
            success: function() {
                request({
                    url: "NewsZan",
                    data: {
                        type: t,
                        news_id: g.data.id,
                        user_id: app.userInfo.id
                    },
                    showLoading: !1,
                    success: function(e) {
                        if (e) return g.setData({
                            is_zan: t
                        }), void add(g.data, "zan_num");
                        wx.showToast({
                            icon: "none",
                            title: "错误:" + e
                        });
                    }
                });
            }
        });
    },
    comment: function(e) {
        var t = g.data.comment_item;
        g.data.userInfo.id;
        request({
            url: "NewsComment",
            data: {
                type: t ? 2 : 1,
                comment: e.detail.value,
                news_id: g.data.id,
                user_id: app.userInfo.id || wx.getStorageSync("userInfo").id,
                cid: t ? "0" == t.cid ? t.id : t.cid : 0,
                uid: t ? t.nid : 0
            },
            showLoading: !1,
            success: function(e) {
                getInfo(g.data.id);
            }
        });
    },
    onPageScroll: function(e) {
        scrollTop = e.scrollTop;
    },
    shareModal: function() {
        g.setData({
            isShow: !g.data.isShow
        });
    },
    poster: function() {
        g.shareModal(), route({
            url: "poster",
            params: {
                id: g.data.id,
                type: "newposter"
            }
        });
    }
});