var g, _tools = require("../../utils/tools"), app = getApp(), page = app.page, request = app.util.request, route = app.route, toast = app.toast;

page({
    data: {
        formats: {},
        editorHeight: 300,
        keyboardHeight: 0,
        isIOS: !1,
        item: [ "redo", "undo", "indent", "outdent", "fontsize", "format-header-1", "format-header-2", "format-header-3", "format-header-4", "format-header-5", "format-header-6", "clearup", "preview", "date", "fontbgcolor", "clearedformat", "font", "723bianjiqi_duanhouju", "722bianjiqi_duanqianju", "text_color", "checklist", "baocun", "line-height", "quanping", "direction-rtl", "direction-ltr", "selectall", "fuzhi", "shanchu", "bianjisekuai", "fengexian", "dianzan", "charulianjie", "charutupian", "wuxupailie", "juzhongduiqi", "yinyong", "youxupailie", "youduiqi", "zitidaima", "xiaolian", "zitijiacu", "zitishanchuxian", "zitishangbiao", "zitibiaoti", "zitixiahuaxian", "zitixieti", "zitiyanse", "zuoduiqi", "zitiyulan", "zitixiabiao", "zuoyouduiqi", "duigoux", "guanbi", "shengyin_shiti", "Character-Spacing" ]
    },
    onLoad: function(t) {
        g = this;
        var i = "ios" === wx.getSystemInfoSync().platform;
        g.setData({
            isIOS: i
        }), g.updatePosition(0);
        var e = 0;
        wx.onKeyboardHeightChange(function(t) {
            var i;
            t.height !== e && (i = 0 < t.height ? 1e3 * t.duration : 0, e = t.height, setTimeout(function() {
                wx.pageScrollTo({
                    scrollTop: 0,
                    success: function() {
                        g.updatePosition(e), g.editor.scrollIntoView();
                    }
                });
            }, i));
        });
    },
    onPullDownRefresh: function() {},
    onEditorReady: function() {
        var i = this;
        wx.createSelectorQuery().select("#editor").context(function(t) {
            i.editor = t.context, i.editor.setContents({
                html: app.lawContent || ""
            });
        }).exec();
    },
    readOnlyChange: function() {
        this.setData({
            readOnly: !this.data.readOnly
        });
    },
    updatePosition: function(t) {
        var i = wx.getSystemInfoSync(), e = i.windowHeight, e = (i.platform, 0 < t ? e - t - 50 : e);
        this.setData({
            editorHeight: e,
            keyboardHeight: t
        });
    },
    format: function(t) {
        var i = t.target.dataset, t = i.name, i = i.value;
        t && ("insertDivider" == t ? this.editor.insertDivider() : "undo" == t ? this.editor.undo() : this.editor.format(t, i));
    },
    onStatusChange: function(t) {
        t = t.detail;
        this.setData({
            formats: t
        });
    },
    insertImage: function() {
        wx.chooseImage({
            count: 9,
            success: function(t) {
                t = t.tempFilePaths;
                wx.showLoading({
                    title: "图片上传中..."
                }), (0, _tools.uploadImg)(t, function(t) {
                    wx.hideLoading();
                    for (var i = 0; i < t.length; i++) g.editor.insertImage({
                        src: g.data.system.attachurl + t[i],
                        width: "100%"
                    });
                }, !0);
            }
        });
    },
    getEditorContent: function(t) {
        app.lawContent = t.detail.html;
    },
    backpage: function() {
        wx.navigateBack({
            delta: 1
        });
    }
});