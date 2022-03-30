var url, type, delta, _page_urls = require("page_urls"), _page_urls2 = _interopRequireDefault(_page_urls), _tools = require("tools");

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function toPage() {
    if (-1 != (url = setUrl())) switch (type) {
      case "navigate":
        wx.navigateTo({
            url: url,
            fail: function(e) {
                console.log(e);
            }
        });
        break;

      case "reLaunch":
        wx.reLaunch({
            url: url,
            fail: function(e) {
                console.log(e);
            }
        });
        break;

      case "redirect":
        wx.redirectTo({
            url: url,
            fail: function(e) {
                console.log(e);
            }
        });
        break;

      case "switchTab":
        wx.switchTab({
            url: url,
            fail: function(e) {
                console.log(e);
            }
        });
        break;

      case "navigateBack":
        wx.navigateBack({
            delta: delta,
            fail: function(e) {
                console.log(e);
            }
        });
    }
}

function setUrl() {
    var e = getApp();
    switch (url) {
      case "/law_settling_in":
        var t = e.userInfo;
        if (3 == t.is_law && 0 == t.sh_state) return wx.showToast({
            icon: "none",
            title: "审核中"
        }), -1;
        if (3 == t.is_law && 1 == t.sh_state) return e.item = {
            title: "申请驳回",
            content: t.jujue_content,
            img: "pay_no",
            button: [ {
                title: "返回首页",
                url: "loading",
                type: "reLaunch"
            }, {
                title: "重新申请",
                url: "enter",
                type: "redirect"
            } ]
        }, "/" + _page_urls2.default.result;
        if (3 != t.is_law) return "/" + (2 == t.is_law && 2 == t.sh_state ? _page_urls2.default.l_index : _page_urls2.default.enter);
    }
    return url;
}

module.exports = function(e) {
    var t = e.a || e.params || "";
    if (url = _page_urls2.default[e.url] ? "/" + _page_urls2.default[e.url] : e.url, 
    type = e.type || "navigate", delta = e.delta || "", t) for (var l in t) url += (-1 == url.indexOf("=") ? "?" : "&") + l + "=" + t[l];
    url && (url = 0 != url.indexOf("/") ? "/" + url : url), e.term ? (0, _tools.verifyLogin)({
        success: function() {
            toPage();
        }
    }) : toPage();
};