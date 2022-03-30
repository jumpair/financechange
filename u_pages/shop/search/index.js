function _toConsumableArray(a) {
    if (Array.isArray(a)) {
        for (var t = 0, e = Array(a.length); t < a.length; t++) e[t] = a[t];
        return e;
    }
    return Array.from(a);
}

var g, search_value, pages, app = getApp(), page = app.page, request = app.util.request, route = app.route;

function getList() {
    request({
        url: "ShopSearch",
        data: {
            title: search_value,
            page: pages,
            number: app.config.goods_number,
            type_id: -1
        },
        success: function(a) {
            var t = g.data.good_list;
            a = a.good_list, t && 1 != pages && (a = [].concat(_toConsumableArray(t), _toConsumableArray(a))), 
            g.setData({
                good_list: a
            }), a.length && pages * app.config.goods_number >= a[0].num && g.setData({
                isLoad: !0
            });
        }
    });
}

page({
    data: {
        isLoad: !1,
        no_goods: app.srcRoot + "no_shop.png"
    },
    onLoad: function(a) {
        g = this, search_value = "", pages = 1;
    },
    input: function(a) {
        search_value = a.detail.value;
    },
    search: function() {
        g.setData({
            isLoad: !1
        }), pages = 1, getList();
    },
    onReachBottom: function() {
        !g.data.isLoad && pages++ && getList();
    },
    toInfo: function(a) {
        route({
            url: "shop_info",
            params: {
                id: a.currentTarget.dataset.id
            }
        });
    }
});