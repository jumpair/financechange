var _index = require("api/index.js"), _index2 = _interopRequireDefault(_index), _tmpl = require("tmpl/tmpl.js"), _tmpl2 = _interopRequireDefault(_tmpl);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Component({
    properties: {
        richText: {
            type: String,
            value: "",
            observer: function(e) {
                var t = (0, _index2.default)(e);
                this.setData({
                    richTextNode: t.nodes
                }), _tmpl2.default.init.call(this, {
                    imgUrls: t.imageUrls
                });
            }
        }
    },
    data: {
        richTextNode: ""
    }
});