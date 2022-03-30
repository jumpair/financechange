var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a, o = arguments[e];
        for (a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
    }
    return t;
}, _tools = require("../../../utils/tools"),app = getApp(), page = app.page, request = app.util.request, route = app.route;

 function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var g, pages, app = getApp(), page = app.page, request = app.util.request, route = app.route;

function getLawArticleList() {
    request({
        url: "LawArticleList",
        data: {
            law_id: g.data.id,
            type_id: g.data.cur
        },
        showLoading: !1,
        success: function(t) {
            wx.stopPullDownRefresh(), g.setData({
                newList: t
            });
        }
    });
}

function getInfo(t) {
    request({
        url: "LawNewInfo",
        data: {
            law_id: t.id,
            type: "-1" != t.id || "rand",
            user_id: app.userInfo.id || wx.getStorageSync("userInfo").id
        },
        showLoading: !1,
        success: function(t) {
            if (wx.stopPullDownRefresh(), !t) return wx.showModal({
                title: "提示",
                showCancel: !1,
                content: (g.data.system.law_custom || "律师") + "不存在",
                confirmText: 1 < getCurrentPages().length ? "返回" : "首页",
                success: function(t) {
                    1 < getCurrentPages().length ? route({
                        type: "navigateBack",
                        delta: 1
                    }) : route({
                        url: "loading",
                        type: "reLaunch"
                    });
                }
            });
            "windows" == wx.getSystemInfoSync().platform && wx.setNavigationBarTitle({
                title: (g.data.system ? g.data.system.law_custom : "") + "详情"
            }), t.score = parseInt(t.score);
            var e = [ {
                title: "服务",
                id: 0
            } ];
            t.article_type && 0 < t.article_type.length && (e = [].concat(_toConsumableArray(e), _toConsumableArray(t.article_type))), 
            g.setData(_extends({}, t, {
                price: t.fulu_list.length ? t.fulu_list[0].price : 0,
                navs: e
            }));
        }
    });
    var e = app.system ? app.system.foot_color2 : wx.getStorageSync("system").foot_color2 || "";
    if (4 === e.length) {
        for (var a = "#", o = 1; o < 4; o += 1) a += e.slice(o, o + 1).concat(e.slice(o, o + 1));
        e = a;
    }
    for (var i = [], o = 1; o < 7; o += 2) i.push(parseInt("0x" + e.slice(o, o + 2)));
    g.setData({
        rbga: "rgba(" + i[0] + "," + i[1] + "," + i[2] + ",.2);",
        isLoad: !1
    }), getList(pages = 1);
}

function getList(s) {
    request({
        url: "LawCommentList",
        showLoading: !1,
        data: {
            page: s,
            num: app.config.law_number,
            id: g.options.id
        },
        success: function(t) {
            for (var e, a = t.list, o = 0; o < a.length; o++) if ("string" == typeof a[o].nickName) {
                for (var i = (r = a[o].nickName).length / 2, r = r.substring(0, i), n = 0; n < i; n++) r += "*";
                t.list[o].nickName = r;
            }
            e = 1 == s ? a : [].concat(_toConsumableArray(g.data.comment), _toConsumableArray(a)), 
            g.setData({
                comment: e
            }), a.length && s * app.config.law_number >= t.total && g.setData({
                isLoad: !0
            }), wx.stopPullDownRefresh();
        }
    });
}


function pay(t) {
    request({
        url: "LawOrderPay",
        data: {
            user_id: app.userInfo.id || wx.getStorageSync("userInfo").id,
            order_id: t
        },
        success: function(t) {
            console.log("回调支付信息：", t), (0, _tools.wxPay)({
                data: t,
                success: function(t) {
                    (0, _tools.getChatList)(function(t) {
                        result("支付成功", "订单支付成功 ￥" + g.data.price);
                    });
                }
            });
        }
    });
}

function result(t, e) {
    console.log(g.data.order_id), app.item = {
        title: t,
        content: e,
        img: "pay_ok",
        button: [ {
            title: "立即咨询",
            url: "chat_info",
            params: {
                toid: g.data.user_id
            }
        }, {
            title: "返回首页",
            url: "loading",
            type: "reLaunch"
        } ]
    }, route({
        type: "redirect",
        url: "result"
    });
}

page({
    data: {
        is_collect: 1,
        choice_index: 0,
        check_xy: wx.getStorageSync("xieyi"),
        no_comment: app.srcRoot + "no_comment.png",
        no_data: app.srcRoot + "no_data.png",
        navs: [ {
            title: "服务",
            id: 0
        } ],
        cur: 0,
        isLoad: !1
    },
    onLoad: function(t) {
        console.log((0, _tools.setQuery));
        // g = this, pages = 1, getInfo(t = (0, _tools.setQuery)(t));
        var that = this;

        that.setData({law_id: t.id});
        request({
            url: "ServiceInfo",
            data: {
                law_id: t.id          
            },
            showLoading: !1,
            success: function(b) {
                console.log(b);
                that.setData(
                 _extends({}, b, {})
                );
            }
        })
    },
    onPullDownRefresh: function() {
        getInfo((0, _tools.setQuery)(this.options));
    },
    onShareAppMessage: function(t) {
        return {
            title: g.data.name,
            path: g.route + "?id=" + g.data.id + "&pid=" + app.userInfo.id,
            imageUrl: g.data.img || ""
        };
    },
    onShow: function() {},
    onShareTimeline: function() {
        return {
            title: g.data.name,
            query: "id=" + g.data.id + "&pid=" + app.userInfo.id,
            imageUrl: g.data.img || ""
        };
    },
    collect: function(t) {
        var e = 1 == parseInt(g.data.is_collect) ? 2 : 1;
        (0, _tools.verifyLogin)({
            success: function(t) {
                request({
                    url: "LawCollect",
                    data: {
                        type: e,
                        law_id: g.data.id,
                        user_id: app.userInfo.id
                    },
                    showLoading: !1,
                    success: function(t) {
                        g.setData({
                            is_collect: e
                        });
                    }
                });
            }
        });
    },
    choiceServe: function(t) {
        t = parseInt(t.currentTarget.dataset.index), g.setData({
            choice_index: t,
            price: g.data.fulu_list[t].price
        });
    },
    toSubscribe: function() {
        console.log(_tools.subscribe);
        (0, _tools.subscribe)("USER"), (0, _tools.verifyLogin)({
            success: function(t) {
                if ("2" == g.data.system.is_order_notice && !g.data.check_xy) return wx.showToast({
                    title: "请阅读并勾选用户下单须知",
                    icon: "none"
                });
                "2" == g.data.system.is_order_notice && wx.setStorageSync("xieyi", !0);
                var e = g.data.id, a = g.data.price;
                if ("jslt" === g.data.fulu_list[g.data.choice_index].type) g.data.order_id ? 0 < parseFloat(g.data.price) ? pay(g.data.order_id) : result("成功", "订单提交成功") : g.data.order_id ? pay(g.data.order_id) : request({
                    url: "SubmitLawOrder",
                    data: {
                        type: "jslt",
                        law_id: e,
                        price: a,
                        user_id: app.userInfo.id || wx.getStorageSync("userInfo").id
                    },
                    success: function(t) {
                        wx.hideLoading(), t ? g.setData({
                            order_id: t.order_id
                        }, function() {
                            0 < parseFloat(g.data.price) ? pay(g.data.order_id) : result("成功", "订单提交成功");
                        }) : wx.showToast({
                            icon: "none",
                            title: "提交失败:" + t
                        });
                    }
                }); else app.item = {
                    law_id: e,
                    price: a,
                    name: g.data.name,
                    img: g.data.img,
                    type: g.data.fulu_list[g.data.choice_index].type,
                    title: g.data.fulu_list[g.data.choice_index].title
                }, route({
                    url: "lawyer_subscribe"
                });
            }
        });
    },
    toHome: function() {
        route({
            url: "loading",
            type: "reLaunch"
        });
    },
    toNewInfo: function(t) {
        route({
            type: "navigate",
            url: "lawyer_new_info",
            params: {
                id: t.currentTarget.dataset.id
            }
        });
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
                type: "lawposter"
            }
        });
    },
    checkXy: function() {
        g.setData({
            check_xy: !g.data.check_xy
        });
    },
    toPage: function() {
        app.centent = g.data.system.order_notice, route({
            type: "navigate",
            url: "html_page",
            params: {
                title: "用户下单须知"
            }
        });
    },
    tabSelect: function(t) {
        t = parseInt(t.currentTarget.dataset.id), g.setData({
            cur: t
        }), t && getLawArticleList();
    },
    toMap: function() {
        wx.openLocation({
            latitude: parseFloat(this.data.latitude),
            longitude: parseFloat(this.data.longitude),
            address: this.data.address
        });
    },
    onReachBottom: function() {
        !g.data.isLoad && pages++ && getList(pages);
    }
});