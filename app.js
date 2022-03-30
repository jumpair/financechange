var _util = require("utils/util"), _util2 = _interopRequireDefault(_util), _page = require("utils/page"), _page2 = _interopRequireDefault(_page), _tools = require("utils/tools"), _tools2 = _interopRequireDefault(_tools), _route = require("utils/route"), _route2 = _interopRequireDefault(_route), _page_urls = require("utils/page_urls"), _page_urls2 = _interopRequireDefault(_page_urls);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var g, versions = "1.7.9", isHide = !1;

App({
    onLaunch: function(e) {
    
        g = this;
        console.log('我被触发了');
        var t = wx.getSystemInfoSync();
        g.G.StatusBar = t.statusBarHeight;
        var o = wx.getMenuButtonBoundingClientRect();
        g.G.Custom = o, g.G.CustomBar = o.bottom + o.top - t.statusBarHeight;
        t = wx.getStorageSync("versions");
        t && t == versions || (wx.clearStorageSync(), wx.setStorageSync("versions", versions)), 
        (0, _util.request)({
            url: "ChekZdsh",
            showLoading: !1,
            success: function(e) {
                return console.log("%c%s", "color: #FFF; background: #39b54a;border-radius:4px;padding:2px 5px;", e);
            }
        }), wx.getLocation({
            type: "wgs84",
            success: function(e) {
                return g.userAddress = e;
            },
            fail: console.log
        }), g.scene = e.scene, _tools2.default.initSocket(), "windows" != wx.getSystemInfoSync().platform && wx.showShareMenu({
            menus: [ "shareAppMessage", "shareTimeline" ]
        });
       //调用全局函数需要在onlaunch里定义value
        this.globalData={
            point:[],
            starttime:"",
            markers:[],
            currenttime:"",
            jntm:"0"
        }
    },

    onShow: function() {
    
        isHide && wx.sendSocketMessage({
            data: JSON.stringify({
                data: "test",
                type: "say",
                fromid: "-1",
                toid: "-1",
                uniacid: require("siteinfo.js").uniacid,
                siteroot: require("siteinfo.js").siteroot
            }),
            fail: function(e) {
                console.log("%c%s", "color: #FFF; background: #00aaff;border-radius:4px;padding:2px 5px;", "Socket:消息服务断开,正在重新连接中..."), 
                isHide = !1, _tools2.default.initSocket();
            }
        });
    },
    onHide: function() {
        isHide = !0;
    },
    onError: function(e) {
        console.log(e);
    },
    config: {
        versions: versions,
        metering: 10,
        isFrom: !1,
        law_number: 25,
        news_number: 25,
        chat_number: 25,
        goods_number: 25,
        wenda_number: 25,
        orders_number: 25,
        collect_number: 25,
        evaluate_number: 25,
        fx_number: 25,
        debug_success: !1,
        module: "yzd_lawyer"
    },
    util: _util2.default,
    page: _page2.default,
    tools: _tools2.default,
    toast: _tools2.default.toast,
    userInfo: {},
    sessionid: null,
    siteInfo: require("siteinfo.js"),
    srcRoot: require("siteinfo.js").siteroot.replace("/app/index.php", "") + "/addons/yzd_lawyer/static/wxapp/img/",
    route: _route2.default,
    page_urls: _page_urls2.default,
    chat: {},
    G: {}
});