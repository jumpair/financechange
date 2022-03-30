var audio, _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var o, n = arguments[t];
        for (o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
    }
    return e;
}, _util = require("util");

function _defineProperty(e, t, o) {
    return t in e ? Object.defineProperty(e, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = o, e;
}

function getTabbar(t) {
    (0, _util.request)({
        url: "FootNav",
        showLoading: !1,
        success: function(e) {
            getApp().dataNav = e, setTabbar(t, e);
        }
    });
}

function setTabbar(e) {
    var t, o = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : getApp().dataNav, n = (JSON.stringify(o), 
    getApp()), r = !1, i = require("page_urls.js"), s = require("route.js");
    if (e.route == i.loading && s({
        type: "redirect",
        url: wx.getStorageSync("page") ? "l_index" : o.tabbar[0].url
    }), n.tabbar) {
        for (var a = o.tabbar, c = 0; c < a.length; c++) if (a[c].url == getParam(e, !0)) {
            t = a[c].url, r = n.isLoading = !0;
            break;
        }
        e.setData({
            show_tabbar: r
        }), n.tabbar.setData({
            dataNav: o,
            route: t
        });
    }
    getCurrentPages().length && t == getParam(e, !0) && "windows" != wx.getSystemInfoSync().platform && wx.hideHomeButton();
}

function getParam(e, t) {
    var o, n = e.route, r = e.options;
    getApp();
    if (t) {
        t = require("page_urls.js");
        switch (n) {
          case t.f_enter:
          case t.f_index:
            n = "fenxiao_settling_in";
        }
    }
    for (o in r) "pid" != o && (n += (n == e.route ? "?" : "&") + o + "=" + r[o]);
    return n;
}

function getSystem(t) {
    (0, _util.request)({
        url: "Qjsz",
        showLoading: !1,
        success: function(e) {
            e.text_color = isDark(e.foot_color2), getApp().system = e, setSystem(t, e), wx.setStorageSync("system", e);
        }
    });
}

function setSystem(t) {
    var o = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : getApp().system;
    t.setData({
        system: _extends({}, t.data.system, o)
    });
    var e = require("page_urls.js");
    function n(e) {
        ("游客" == e.nickName && "1" == o.is_force_login || !e.phone && "1" == o.is_force_getphone) && (getApp().force_before_path = t.route, 
        getApp().force_before_data = t.options, require("route")({
            url: "accredit",
            type: "redirect"
        }));
    }
    e.orders_info != t.route && setNavigationBarTextColor(o.title_bg, t), "1" != o.is_force_getphone && "1" != o.is_force_login || t.route != e.accredit && t.route != e.loading && (getApp().userInfo.openid ? n(getApp().userInfo) : getUserInfo(n));
}

function setNavigationBarTextColor(e, t) {
    var o = require("page_urls.js");
    t.route != o.diy && (o = require("page_urls.js"), t.route != o.chat_info && wx.setNavigationBarColor({
        frontColor: isDark(e),
        backgroundColor: getApp().system.title_bg,
        animation: {}
    }));
}

function isDark(e) {
    if (4 === e.length) {
        for (var t = "#", o = 1; o < 4; o += 1) t += e.slice(o, o + 1).concat(e.slice(o, o + 1));
        e = t;
    }
    for (var n = [], o = 1; o < 7; o += 2) n.push(parseInt("0x" + e.slice(o, o + 2)));
    return n = 192 <= (n = .299 * n[0] + .587 * n[1] + .114 * n[2]) ? "#000000" : "#ffffff";
}

function submitFromId(e) {
    if (!getApp().config.isFrom) return !1;
    console.log("捕获到当前页面fromId:", e);
}

function setUserInfo() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : getApp().userInfo, t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : function() {}, o = getApp().currentPage;
    console.log(e);
    
    getApp().userInfo = e, e = _extends({}, e, {
        siteroot: getApp().siteInfo.siteroot
    }), wx.setStorageSync("userInfo", e), -1 != getApp().page_urls.user.indexOf(o.route) && setTimeout(function() {
        o.setData({
            updeta: !1
        });
    }, 1e3), o.setData({
        userInfo: e
    }, function() {
        t(e);
    }), wx.stopPullDownRefresh();
}

function getUserInfo() {
    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : function() {}, e = getApp().siteInfo.siteroot == wx.getStorageSync("userInfo").siteroot ? wx.getStorageSync("userInfo") : "";
    e.id ? signIn({
        user_id: e.id
    }, t) : wx.login({
        success: function(e) {
            signIn({
                code: e.code
            }, t);
        }
    });
}

function signIn(e) {
    console.log(getApp().userPid)
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : function() {};
    (0, _util.request)({
        url: "Openid",
        data: _extends({}, e, {
            pid: getApp().userPid
        }),
        showLoading: !1,
        success: function(e) {
            setUserInfo(e, t);
        }
    });
}

function updeta(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : function() {}, o = getApp().userInfo, n = parseInt(o.is_law);
    e.user_id = o.id, e.is_law = n || 1, (0, _util.request)({
        url: "WxLogin",
        data: e,
        showLoading: !1,
        success: function(e) {
            setUserInfo(e, t);
        }
    });
}

function check(e) {
    var t, o;
    switch (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "phone") {
      case "phone":
        return t = /0?(13|14|15|16|17|18|19)[0-9]{9}/, o = /^(1?|(1\-)?)\d{10,12}$/, e.length < 9 || 12 < e.length || !(!t.exec(e) && !o.exec(e));

      case "account":
        t = /^([a-zA-Z0-9]|[._@]){5,20}$/;
        break;

      case "password":
        t = /^(\w){6,20}$/;
    }
    return !!t.exec(e);
}

function verifyLogin(e) {
    e.fail = e.fail || function() {}, e.success = e.success || function() {}, getApp().userInfo.nickName && "游客" != getApp().userInfo.nickName ? e.success() : (getApp().currentPage.setData({
        isLogin: !0
    }), e.fail());
}

function getDate() {
    var e = new Date(), t = e.getFullYear(), o = e.getMonth() + 1, e = e.getDate();
    return t + "-" + (o = o < 10 ? "0" + o : o) + "-" + (e = e < 10 ? "0" + e : e);
}

function getTime() {
    var e = new Date(), t = e.getHours(), e = (e = e.getMinutes()) < 10 ? "0" + e : e;
    return console.log("获取当前时分:", t + ":" + e), t + ":" + e;
}

function uploadImg(t, e) {
    var o, n, r, i, s = 2 < arguments.length && void 0 !== arguments[2] && arguments[2];
    t.length < 1 ? e("") : (t.path || (t = {
        path: t,
        urlStr: []
    }), o = getApp().siteInfo.siteroot + "?i=" + getApp().siteInfo.uniacid + "&c=entry&a=wxapp&do=UploadImg&m=" + getApp().config.module, 
    n = t.i || 0, r = t.ok || 0, i = t.fail || 0, console.log(t.path[n]), wx.uploadFile({
        url: o,
        filePath: t.path[n],
        name: "upfile",
        formData: null,
        success: function(e) {
            r++, t.urlStr.push(e.data);
        },
        fail: function(e) {
            t.urlStr.push(""), i++;
        },
        complete: function() {
            ++n == t.path.length ? (console.log("上传完毕,成功:" + r + " 失败:" + i), s || (t.urlStr = t.urlStr.join(",")), 
            e(t.urlStr)) : (t.i = n, t.ok = r, t.fail = i, uploadImg(t, e, s), console.log(t));
        }
    }));
}

function getPhoneNumber(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : function() {}, o = e.detail;
    "getPhoneNumber:ok" == o.errMsg ? wx.login({
        success: function(e) {
            (0, _util.request)({
                url: "GetPhoneNumber",
                showLoading: !1,
                data: {
                    encryptedData: o.encryptedData,
                    iv: o.iv,
                    code: e.code,
                    user_id: getApp().userInfo.id
                },
                success: function(e) {
                    getApp().currentPage.setData({
                        "userInfo.phone": e
                    }), getApp().userInfo || (getApp().userInfo = {}), getApp().userInfo.phone = e, 
                    t(e);
                }
            });
        }
    }) : console.log("取消获取手机号");
}

function getTimestamp(e, t) {
    t = (e + " " + t + ":00").split(/[- :]/), t = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
    return t = Date.parse(t) / 1e3;
}

function wxPay(t) {
    "function" != typeof t.fail && (t.fail = function(e) {}), "function" != typeof t.success && (t.success = function(e) {}), 
    "function" != typeof t.complete && (t.complete = function() {});
    var e = t.data;
    wx.requestPayment({
        timeStamp: e.timeStamp,
        nonceStr: e.nonceStr,
        package: e.package,
        signType: "MD5",
        paySign: e.paySign,
        success: function(e) {
            t.success(e);
        },
        fail: function(e) {
            wx.showToast({
                icon: "none",
                title: "取消支付"
            }), t.fail(e);
        },
        complete: function() {
            t.complete();
        }
    });
}

function formatTime(e) {
    e = parseInt(e);
    var t = new Date(1e3 * e), o = t.getFullYear(), n = t.getMonth() + 1, r = t.getDate(), i = t.getHours(), s = t.getMinutes(), e = t.getSeconds();
    return t = [ o, n, r ].map(formatNumber).join("-") + " " + [ i, s, e ].map(formatNumber).join(":");
}

var formatNumber = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
};

function initSocket() {
    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0;
    function o() {
        t < getApp().config.metering ? setTimeout(function() {
            initSocket(t + 1);
        }, 200) : (wx.hideLoading(), wx.showToast({
            icon: "none",
            title: "连接消息服务失败",
            duration: 2e3
        }));
    }
    wx.connectSocket({
        url: require("../siteinfo.js").siteroot.replace("https", "wss").replace("app/index.php", "yzdlawyer"),
        fail: function(e) {
            console.log("%c%s", "color: #FFF; background: #ff0000;border-radius:4px;padding:2px 5px;", "Socket:连接错误");
        }
    }), wx.onSocketOpen(function(e) {
        setInterval(function() {
            wx.sendSocketMessage({
                data: {
                    type: "head_test"
                },
                success: function(e) {
                    return console.log("%c%s", "color: #FFF; background: #00aaff;border-radius:4px;padding:2px 5px;", "心跳测试成功");
                }
            });
        }, 3e3), console.log("%c%s", "color: #FFF; background: #00aaff;border-radius:4px;padding:2px 5px;", "Socket:连接成功"), 
        t = 0, wx.hideLoading(), wx.onSocketMessage(function(e) {
            onMessage(JSON.parse(e.data));
        });
    }), wx.onSocketClose(function(e) {
        console.log("Socket关闭:", e), o();
    }), wx.onSocketError(function(e) {
        console.log("Socket错误:", e), o();
    });
}

function sendMessage(e) {
    var r = getApp(), i = e.success || function() {}, s = (e.fail, e.complete || function() {}), t = e.content, o = e.toid, a = e.message_type || 1, c = r.userInfo.id || wx.getStorageSync("userInfo").id, u = wx.getStorageSync("page") ? 2 : 1, g = wx.getStorageSync("page") ? 1 : 2, f = r.currentPage.data[1 == u ? "toinfo" : "frominfo"].id, l = e.duration || 0;
    (0, _util.request)({
        url: "Chat",
        data: {
            type: "save_text",
            from_role: u,
            content: t,
            fromid: c,
            toid: o,
            message_type: a,
            duration: l
        },
        showLoading: !1,
        success: function(n) {
            wx.sendSocketMessage({
                data: JSON.stringify({
                    data: t,
                    type: 1 == a ? "say" : 2 == a ? "say_img" : "say_audio",
                    fromid: c,
                    from_role: u,
                    toid: o,
                    to_role: g,
                    uniacid: r.system.uniacid,
                    siteroot: r.system.siteroot,
                    law_id: f,
                    duration: l
                }),
                success: function(e) {
                    var t, o;
                    console.log("%c%s", "color: #FFF; background: #00aaff;border-radius:4px;padding:2px 5px;", "发送消息成功"), 
                    3 == a && (t = r.srcRoot.replace("img", "mp3") + "send_audio.wav", (o = wx.createInnerAudioContext()).src = t, 
                    o.play(), o = null), getChatList(function() {
                        s(n);
                    }), i(n);
                },
                fail: function(e) {
                    console.log(e);
                }
            });
        }
    });
}

function onMessage(e) {
    var t = getApp(), o = t.userInfo.id || wx.getStorageSync("userInfo").id, n = t.srcRoot.replace("img", "mp3") + "notice.mp3", r = (r = getCurrentPages())[r.length - 1];
    if ("init" === e.type) wx.sendSocketMessage({
        data: JSON.stringify({
            type: "bind",
            fromid: o
        }),
        fail: console.error
    }); else {
        if (t.chat["t" + e.toid] || (t.chat["t" + e.toid] = []), t.chat["t" + e.toid].push(e), 
        t.is_say || wx.vibrateLong(), r.data.user_id || e.toid == r.data.user_id || i(), 
        r.route == require("page_urls").chat_info) {
            t = "chat[" + r.data.chat.length + "]";
            if (e.time = getDateString(e.time), e.fromid != r.options.toid) return i();
            r.setData(_defineProperty({}, t, e), function() {
                scrollBottom();
            }), (0, _util.request)({
                url: "Chat",
                data: {
                    type: "change_state",
                    toid: r.data.toinfo.id,
                    fromid: r.data.frominfo.user_id
                },
                showLoading: !1,
                success: function(e) {}
            });
        }
        getChatList();
    }
    function i() {
        (audio = wx.createInnerAudioContext()).autoplay = !0, audio.play(), audio.src = n, 
        audio.onPlay(function(e) {
            console.log(e), audio = void 0;
        });
    }
}

function getChatList() {
    var o = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : function() {}, n = getApp(), e = wx.getStorageSync("page") ? 2 : 1;
    (0, _util.request)({
        url: "GetChatList",
        data: {
            fromid: n.userInfo.id || wx.getStorageSync("userInfo").id,
            role: e
        },
        showLoading: !1,
        success: function(e) {
            for (var t = 0; t < e.length; t++) e[t].last_message && (e[t].last_message.time = getDateString(e[t].last_message.time)), 
            n.chat_num += e[t].countNoread;
            n.chatListThat && n.chatListThat.setData({
                chatList: e
            }), n.chatList = e, o(e);
        }
    });
}

function scrollBottom() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "#chat", t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0;
    wx.pageScrollTo({
        duration: t,
        selector: e,
        success: function(e) {}
    });
}

function getDateString(e) {
    var t, o, n, r, i = formatTime(e), s = u(-2), a = u(-1), c = u(0);
    function u(e) {
        var t = new Date();
        return t.setDate(t.getDate() + e), t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
    }
    return r = (i = i.split(" "))[1].split(":"), r = (t = (i = i[0].split("-"))[0]) + "-" + (o = i[1]) + "-" + (n = i[2]) + " " + (e = r[0]) + ":" + (i = r[1]), 
    (s = s.split("-"))[1] = formatNumber(s[1]), s[2] = formatNumber(s[2]), (a = a.split("-"))[1] = formatNumber(a[1]), 
    a[2] = formatNumber(a[2]), (c = c.split("-"))[1] = formatNumber(c[1]), c[2] = formatNumber(c[2]), 
    t == s[0] && o == s[1] && n == s[2] ? "前天 " + e + ":" + i : t == a[0] && o == a[1] && n == a[2] ? "昨天 " + e + ":" + i : t == c[0] && o == c[1] && n == c[2] ? "今天 " + e + ":" + i : r;
}

function subscribe(o) {
    var n, r, i = getApp(), e = (i.system || wx.getStorageSync("system")).dyxx;
    console.log(o);console.log(e);
    if (e || o) {
        switch (o) {
          case "ENTER":
            n = [ e.zxhftz_id, e.shjgtx_id, e.ddzttx_id ];
            break;

          case "LAWYER":
            n = [ e.zxhftz_id, e.pjwctz_id, e.ddzttx_id ];
            break;

          case "USER":
            n = [ e.zxhftz_id, e.ddzttx_id, e.shjgtx_id ];
            break;

          default:
            n = [ o ];
        }
        wx.getSetting({
            withSubscriptions: !0,
            success: function(e) {
               
                if ((e = e.subscriptionsSetting) && !e.mainSwitch && "USER" != o) return s();
                r = e.itemSettings || [];
                for (var t = 0; t < n.length; t++)
                 if ("reject" == r[n[t]] && "USER" != o) return s();console.log(123),
                i.config.debug_success && console.log("模板消息id:", n), "windows" != wx.getSystemInfoSync().platform && wx.requestSubscribeMessage({
                    tmplIds: n,
                    success: console.log,
                    fail: console.error
                });
            }
        });
    }
    function s() {
        wx.showModal({
            showCancel: !1,
            confirmColor: i.system.foot_color2,
            confirmText: "确定",
            title: "提示",
            content: "您关闭了订阅消息,将会影响正常使用\r\n请在设置页依次操作\r\n1.点击 订阅消息\r\n2.打开 接收订阅消息\r\n3.勾选 接收订阅消息 下面所有的权限",
            success: function(e) {
                e.confirm && wx.openSetting({
                    withSubscriptions: !0
                });
            }
        });
    }
}

function toast(e) {
    wx.showToast({
        icon: "none",
        title: e
    });
}

function getNodeInfo(e) {
    var t = e.id || void 0, o = e.success || function() {}, n = e.fail || function() {}, r = wx.createSelectorQuery();
    if (!t) {
        e = "组件选择器不可为空";
        return console.error(e), void n(e);
    }
    r.select(t).boundingClientRect(function(e) {
        return o(e);
    }).exec();
}

function setQuery(e) {
    console.log(e)
    if (!e || !e.scene) return e;
    var t = (e = decodeURIComponent(e.scene)).split("&");
    e = {};
    for (var o = 0; o < t.length; o++) {
        var n = t[o].split("=");
        e[n[0]] = n[1];
    }
    
    return e;
}

module.exports = {
    getTabbar: getTabbar,
    setTabbar: setTabbar,
    getSystem: getSystem,
    setSystem: setSystem,
    submitFromId: submitFromId,
    isDark: isDark,
    setUserInfo: setUserInfo,
    getUserInfo: getUserInfo,
    updeta: updeta,
    verifyLogin: verifyLogin,
    getDate: getDate,
    getTime: getTime,
    uploadImg: uploadImg,
    getPhoneNumber: getPhoneNumber,
    getTimestamp: getTimestamp,
    wxPay: wxPay,
    formatTime: formatTime,
    getParam: getParam,
    initSocket: initSocket,
    sendMessage: sendMessage,
    getChatList: getChatList,
    scrollBottom: scrollBottom,
    getDateString: getDateString,
    subscribe: subscribe,
    toast: toast,
    getNodeInfo: getNodeInfo,
    setQuery: setQuery,
    check: check
};