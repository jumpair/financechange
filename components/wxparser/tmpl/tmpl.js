function init(e) {
    var i = this;
    this.tapWxParserImg = function(t) {
        var r = t.currentTarget.dataset.src;
        r && wx.previewImage({
            current: r,
            urls: e.imgUrls
        }), i.triggerEvent("tapImg", {
            src: r
        });
    }, this.tapWxParserLink = function(t) {
        i.triggerEvent("tapLink", {
            href: t.currentTarget.dataset.href
        });
    };
}

module.exports = {
    init: init
};