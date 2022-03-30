function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var o = 0, a = Array(t.length); o < t.length; o++) a[o] = t[o];
        return a;
    }
    return Array.from(t);
}

var g, pages, app = getApp(), page = app.page, request = app.util.request, route = app.route;

function getGoodsList() {
    var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 1, t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "";
    request({
        url: "Shop",
        data: {
            page: a,
            type_id: t,
            number: app.config.goods_number
        },
        showLoading: !1,
        success: function(t) {
            var o = g.data.good_list;
            t = t.good_list, o && 1 != a && (t = [].concat(_toConsumableArray(o), _toConsumableArray(t))), 
            g.setData({
                good_list: t
            }), wx.stopPullDownRefresh(), t.length && a * app.config.goods_number >= t[0].num && g.setData({
                isLoad: !0
            });
        }
    });
}

page({
    data: {
        type_index: 0,
        isLoad: !1,
        no_goods: app.srcRoot + "no_shop.png"
    },
    onLoad: function(t) {
        g = this, pages = 1, t && t.id ? (getGoodsList(1, t.id), g.setData({
            type_id: {
                id: t.id
            }
        }), wx.setNavigationBarTitle({
            title: t.title
        })) : request({
            url: "ShopType",
            showLoading: !1,
            success: function(t) {
                g.setData({
                    good_type: [ {
                        id: "",
                        title: "全部"
                    } ].concat(_toConsumableArray(t.good_type))
                }), getGoodsList();
            }
        });
    },
    onPullDownRefresh: function() {
        g.setData({
            type_index: 0,
            isLoad: !1
        }), pages = 1, g.onLoad();
    },
    selectType: function(t) {
        var o = (t = t.currentTarget.dataset.data)[0], a = t[1];
        g.setData({
            type_index: o,
            isLoad: !1
        }), getGoodsList(pages = 1, a);
    },
    toInfo: function(t) {
        route({
            url: "shop_info",
            params: {
                id: t.currentTarget.dataset.id
            }
        });
    },
    onReachBottom: function() {
        !g.data.isLoad && pages++ && getGoodsList(pages, g.data.good_type[g.data.type_index].id);
    }
});