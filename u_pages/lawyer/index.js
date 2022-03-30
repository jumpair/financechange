var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (t[i] = a[i]);
    }
    return t;
};

function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var g, action_type, picker_val, pages, city_id, m_type_id, app = getApp(), page = app.page, request = app.util.request;

function getList(a) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : g.data.heat, e = m_type_id;
    request({
        url: "LawList",
        showLoading: !1,
        data: _extends({
            page: a,
            number: app.config.law_number,
            city_id: city_id,
            juli: t ? "1" : "0",
            type_id: e
        }, app.userAddress),
        success: function(t) {
            var e = g.data.lawyer_list;
            e && 1 != a && (t = [].concat(_toConsumableArray(e), _toConsumableArray(t))), g.setData({
                lawyer_list: t
            }), t.length && a * app.config.law_number >= t[0].num && g.setData({
                isLoad: !0
            }), wx.stopPullDownRefresh();
        }
    });
}

page({
    data: {
        isShow: !1,
        city_name: "全国",
        action_type: action_type,
        heat: !0,
        isLoad: !1
    },
    onLoad: function(t) {
        g = this, picker_val = [ action_type = 0, 0 ], city_id = -(pages = 1), m_type_id = t.id || "", 
        g.setData({
            city_name: "全国",
            heat: !0
        }), request({
            url: "Location",
            showLoading: !1,
            success: function(t) {
                var e = [ {
                    id: -1,
                    pid: -1,
                    name: "全国",
                    type: 1,
                    city: [ {
                        id: -1,
                        pid: -1,
                        name: "全国",
                        type: 2
                    } ]
                } ].concat(_toConsumableArray(t.province));
                g.setData({
                    province: e,
                    city: e[0].city
                });
            }
        }), request({
            url: "LawType",
            showLoading: !1,
            success: function(t) {
                for (var e = 0; e < t.length; e++) t[e].select = !1;
                g.setData({
                    typelist: t
                });
            }
        }), getList(1);
    },
    onPullDownRefresh: function() {
        g.setData({
            isLoad: !1
        }), g.onLoad({});
    },
    pickerChange: function(t) {
        picker_val = t.detail.value, g.setData({
            city: g.data.province[picker_val[0]].city
        });
    },
    showModal: function(t) {
        action_type = t ? parseInt(t.currentTarget.dataset.type) : action_type, g.setData({
            isShow: !g.data.isShow,
            action_type: action_type
        });
    },
    btnAction: function() {
        switch (g.showModal(), action_type) {
          case 0:
            g.setData({
                city_name: g.data.province[picker_val[0]].city[picker_val[1]].name
            }), city_id = g.data.province[picker_val[0]].city[picker_val[1]].id;
        }
        g.setData({
            isLoad: !1
        }), getList(pages = 1);
    },
    selectType: function(t) {
        for (var e = t.currentTarget.dataset.index, a = g.data.typelist, i = (a[e], 0); i < a.length; i++) a[i].id != a[e].id ? a[i].select = !1 : (m_type_id = a[e].select ? "" : a[e].id, 
        a[e].select = !a[e].select);
        g.setData({
            typelist: a
        });
    },
    heatChange: function() {
        wx.showLoading({
            mask: !0,
            title: "加载中"
        }), wx.getLocation({
            type: "wgs84",
            success: function(t) {
                app.userAddress = t;
                var e = !g.data.heat;
                g.setData({
                    heat: e,
                    isLoad: !1
                }), wx.hideLoading(), getList(pages = 1, e);
            },
            fail: function(t) {
                wx.hideLoading(), wx.showModal({
                    content: "请进入设置打开位置授权",
                    title: "提示",
                    success: function(t) {
                        t.confirm && wx.openSetting({
                            success: function(t) {
                                t.authSetting["scope.userLocation"] && g.heatChange();
                            }
                        });
                    }
                });
            }
        });
    },
    onReachBottom: function() {
        !g.data.isLoad && pages++ && getList(pages);
    }
});