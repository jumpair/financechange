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

function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var e = 0, o = Array(t.length); e < t.length; e++) o[e] = t[e];
        return o;
    }
    return Array.from(t);
}

var g, toid, pages, iosTop, fromid, app = getApp(), page = app.page, request = app.util.request, route = app.route;

function getChatList() {
    var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 1;
    request({
        url: "Chat",
        data: {
            type: "init",
            page: a,
            toid: toid,    
            fromid: fromid,
            number: app.config.chat_number
        },
        success: function(t) {
            for (var e = 0; e < t.length; e++) t[e].time = (0, _tools.getDateString)(t[e].time);
            var o;
            g.data.chat.length && (o = g.data.chat[0].id);
            g.setData({
                chat: [].concat(_toConsumableArray(t), _toConsumableArray(g.data.chat))
            }, function() {
                (0, _tools.scrollBottom)(1 == a ? void 0 : "#item_" + o);
            });
        }
    }), request({
        url: "Chat",
        data: {
            type: "change_state",
            toid: toid,
            fromid: fromid
        },
        showLoading: !1,
        success: function(t) {
            if (app.chatList) {
                for (var e = 0, o = 0; o < app.chatList.length; o++) if (app.chatList[o].toid == toid) {
                    e = o;
                    break;
                }
                if (app.chatList[e].countNoread = 0, app.chatListThat) {
                    var a = "chatList[" + e + "].countNoread";
                    app.chatListThat.setData(_defineProperty({}, a, 0));
                }
            }
        }
    });
}

function send() {
    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : g.data.content, a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1;
    (0, _tools.sendMessage)({
        content: t,
        toid: toid,
        message_type: a,
        success: function(t) {
            var e, o = "chat[" + (g.data.chat ? g.data.chat.length : 0) + "]";
            t.time = (0, _tools.getDateString)(t.time), g.setData((_defineProperty(e = {}, o, t), 
            _defineProperty(e, "content", ""), _defineProperty(e, "is_send", !0), e), function() {
                (0, _tools.scrollBottom)("#chat"), 2 == a && wx.hideLoading();
            });
        }
    });
}

page({
    data: {
        user_id: parseInt(app.userInfo.id || wx.getStorageSync("userInfo").id),
        is_send: !0,
        chat: []
    },
    onLoad: function(t) {
        g = this;
    },
    onReady: function() {
        pages = iosTop = 1, toid = g.options.toid, fromid = app.userInfo.id || wx.getStorageSync("userInfo").id, 
        request({
            url: "Chat",
            data: {
                type: "getinfo",
                toid: toid,
                fromid: fromid,
                from_role: wx.getStorageSync("page") ? 2 : 1
            },
            showLoading: !1,
            success: function(t) {
                console.log(t);
                g.setData(_extends({}, t)), getChatList();
            }
        });
    },
    onPageScroll: function(t) {
        0 == t.scrollTop && iosTop ? (iosTop = 0, getChatList(++pages)) : 0 != t.scrollTop || iosTop || (iosTop = 1);
    },
    say: function(t) {
       
        (0, _tools.subscribe)("USER"), g.data.is_send || send();
    },
    input: function(t) {
        t.detail.value;
        console.log(t.detail.cursor);
        this.setData({
            content: t.detail.value,
            is_send: t.detail.cursor < 1
        });
    },
    send_img: function() {
        (0, _tools.subscribe)("USER"), wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            success: function(t) {
                wx.showLoading({
                    title: "发送中...",
                    mask: !0
                }), (0, _tools.uploadImg)(t.tempFilePaths, function(t) {
                    return send(t, 2);
                });
            }
        });
    },
    showImage: function(t) {
        t = t.currentTarget.dataset.index;
        var e = g.data.system.attachurl + g.data.chat[t].content;
        wx.previewImage({
            urls: [ e ],
            current: e
        });
    },
    imgLoad: function() {
        pages < 2 && (0, _tools.scrollBottom)();
    },
    copy: function(t) {
        wx.setClipboardData({
            data: t.currentTarget.dataset.content
        });
    }
});