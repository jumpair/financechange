var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
    }
    return t;
}, _tools = require("../../utils/tools");

function _defineProperty(t, e, o) {
    return e in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t;
}

var g, city, mIcon, app = getApp(), page = app.page, request = app.util.request, route = app.route;

function toast(t) {
    wx.showToast({
        icon: "none",
        title: t
    });
}

function getLocation() {
    request({
        url: "Location",
        success: function(t) {
            t = t.province;
            var e, o = [], a = [];
            city = [];
            for (var i = 0; i < t.length; i++) {
                e = t[i], a[i] = {
                    id: e.id,
                    name: e.name
                }, e = e.city, city[i] = [];
                for (var n = 0; n < e.length; n++) city[i].push({
                    id: e[n].id,
                    name: e[n].name
                });
            }
            o.push(a), o.push(city[0]), wx.setStorageSync("location", o), wx.setStorageSync("city", city), 
            g.setData({
                location: o
            }), getInfo();
        }
    });
}

function getInfo() {
    request({
        url: "MLawInfo",
        data: {
            user_id: app.userInfo.id || wx.getStorageSync("userInfo").id
        },
        success: function(t) {
            for (var e = g.data.location[0], o = t.goodareas_id.split(","), a = 0; a < e.length; a++) if (e[a].id == t.province_id) {
                for (var i = 0; i < city[a].length; i++) if (city[a][i].id == t.city_id) {
                    g.setData({
                        "location[1]": city[a],
                        addressIndx: [ a, i ]
                    });
                    break;
                }
                break;
            }
            for (a = 0; a < t.good.length; a++) for (i = 0; i < o.length; i++) {
                if (t.good[a].id == o[i]) {
                    t.good[a].checked = !0;
                    break;
                }
                t.good[a].checked = !1;
            }
            app.item = t.good, mIcon = t.img, g.setData(_extends({}, t), function() {
                g.onShow();
            });
        }
    });
}

page({
    data: {
        src: app.srcRoot
    },
    onLoad: function(t) {
        g = this, mIcon = "";
        var e = wx.getStorageSync("location");
        city = wx.getStorageSync("city"), e && city ? g.setData({
            location: e
        }, function() {
            getInfo();
        }) : getLocation();
    },
    switchChange: function(t) {
        (0, _tools.subscribe)("LAWYER");
        var e = "dh_state";
        switch (t.currentTarget.dataset.i) {
          case "1":
            e = "img_state";
            break;

          case "2":
            e = "jslt_state";
        }
        g.setData(_defineProperty({}, e, t.detail.value ? 2 : 1));
    },
    onShow: function() {
        var t = [];
        if (app.item) {
            for (var e = 0; e < app.item.length; e++) app.item[e].checked && t.push(app.item[e]);
            g.setData({
                goodareas: t
            });
        }
    },
    addressColumnChange: function(t) {
        var e = (t = t.detail).column, o = t.value;
        switch (e) {
          case 0:
            g.setData({
                "location[1]": city[o]
            });
        }
    },
    addressChange: function(t) {
        g.setData({
            addressIndx: t.detail.value
        });
    },
    toDomain: function() {
        route({
            type: "navigate",
            url: "domain"
        });
    },
    ChooseImage: function(t) {
        parseInt(t.currentTarget.dataset.type);
        wx.chooseImage({
            count: 1,
            success: function(t) {
                g.setData({
                    img: t.tempFilePaths[0]
                });
            }
        });
    },
    submit: function(t) {
        (0, _tools.subscribe)("LAWYER"), t = t.detail.value;
        for (var e, o, a = g.data, i = t.name, n = t.lawfirm, s = 2 == a.dh_state ? t.dh_price : a.dh_price, c = 2 == a.img_state ? t.img_price : a.img_price, r = 2 == a.jslt_state ? t.jslt_price : a.jslt_price, d = a.dh_state, u = a.img_state, l = a.jslt_state, p = t.content, f = t.phone, h = a.img == mIcon ? [] : [ a.img ], m = "", _ = 0; _ < a.goodareas.length; _++) m += (0 != _ ? "," : "") + a.goodareas[_].id;
        e = a.location[0][a.addressIndx[0]].id, o = a.location[1][a.addressIndx[1]].id, 
        i ? f ? n ? a.chooseLocation ? m ? s ? c ? r ? p ? h ? (wx.showLoading({
            title: "上传图片中...",
            mask: !0
        }), (0, _tools.uploadImg)(h, function(t) {
            wx.showLoading({
                title: "提交中...",
                mask: !0
            }), request({
                url: "MLawUpdate",
                data: _extends({
                    user_id: app.userInfo.id || wx.getStorageSync("userInfo").id,
                    name: i,
                    lawfirm: n,
                    dh_price: s,
                    img_price: c,
                    jslt_price: r,
                    dh_state: d,
                    img_state: u,
                    jslt_state: l,
                    goodareas_id: m,
                    province_id: e,
                    city_id: o,
                    content: p,
                    phone: f,
                    img: t || a.img_url
                }, a.chooseLocation),
                showLoading: !1,
                success: function(t) {
                    wx.hideLoading(), app.item = {
                        title: "修改成功",
                        content: "修改提交成功",
                        img: "pay_ok",
                        button: [ {
                            title: "返回首页",
                            url: "l_index",
                            type: "reLaunch"
                        } ]
                    }, route({
                        type: "redirect",
                        url: "result"
                    });
                }
            });
        })) : toast("请上传头像") : toast("请填写个人介绍") : toast("请填写在线咨询价格") : toast("请填写图文咨询价格") : toast("请填写电话咨询价格") : toast("请选择擅长领域") : toast("请选择所在位置") : toast("请填写" + g.data.system.ssls) : toast("请填手机号码") : toast("请填写姓名");
    },
    getAddress: function() {
        wx.chooseLocation({
            success: function(t) {
                g.setData({
                    chooseLocation: {
                        address: t.address,
                        longitude: t.longitude,
                        latitude: t.latitude
                    }
                });
            },
            fail: function(t) {
                console.log(t), wx.showModal({
                    content: "请进入设置打开位置授权",
                    title: "提示",
                    success: function(t) {
                        t.confirm && wx.openSetting({
                            success: function(t) {
                                t.authSetting["scope.userLocation"] && g.getAddress();
                            }
                        });
                    }
                });
            }
        });
    }
});