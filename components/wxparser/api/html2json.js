var utils = require("./utils"), elements = require("./elements"), codeTransformation = require("./codeTransformation"), htmlParser = require("./htmlparser"), olTagCount = [], removeDOCTYPE = function(t) {
    return t.replace(/<\?xml.*\?>\n/, "").replace(/<.*!doctype.*\>\n/, "").replace(/<.*!DOCTYPE.*\>\n/, "");
}, html2json = function(t) {
    t = removeDOCTYPE(t);
    var l = [], s = [], u = {
        nodes: [],
        images: [],
        imageUrls: []
    }, i = function(t) {
        if (0 === l.length) u.nodes.push(t); else {
            var e = l[0];
            void 0 === e.nodes && (e.nodes = []), t.parent = e.tag, e.nodes.push(t);
        }
    };
    return htmlParser.parseHtml(t, {
        start: function(t, e, a) {
            var r = {
                node: "element",
                tag: t
            };
            if (elements.block[t] ? r.tagType = "block" : elements.inline[t] ? r.tagType = "inline" : elements.closeSelf[t] && (r.tagType = "closeSelf"), 
            s = [], e.length && (r.attr = {}, e.map(function(t) {
                "style" === t.name && -1 === s.indexOf(t.value) && s.push(t.value), "color" === t.name && s.push("color: " + t.value), 
                "font" === r.tag && "size" === t.name && s.push("font-size: " + utils.getFontSizeByAttribsSize(t.value)), 
                "class" === t.name && (r.classStr = t.value), r.attr[t.name] = t.value;
            }), r.styleStr = s.join(" ")), "ol" != r.tag && "ul" != r.tag || olTagCount.push(0), 
            "li" == r.tag) {
                var o = olTagCount.length - 1;
                olTagCount[o] = olTagCount[o] + 1, r.order = olTagCount[o];
            }
            if ("img" === r.tag && (r.imgIndex = u.images.length, u.images.push(r), u.imageUrls.push(r.attr.src)), 
            "video" !== r.tag && "audio" !== r.tag || (r.attr.controls = !!r.attr.controls, 
            r.attr.autoplay = !!r.attr.autoplay, r.attr.loop = !!r.attr.loop), "video" === r.tag && (r.attr.muted = !!r.attr.muted), 
            "audio" === r.tag) {
                var n = r.attr["data-extra"];
                n && (n = n.replace(new RegExp("&quot;", "g"), '"'), n = JSON.parse(n), r.attr.poster = n.poster, 
                r.attr.name = n.name, r.attr.author = n.author);
            }
            a ? i(r) : l.unshift(r);
        },
        end: function(t) {
            var e = l.shift();
            if (e.tag !== t) throw new Error("不匹配的关闭标签");
            if ("ol" != e.tag && "ul" != e.tag || olTagCount.pop(), ("video" === e.tag || "audio" === e.tag) && !e.attr.src) {
                for (var a = e.nodes, r = a.length, o = "", n = 0; n < r; n++) if ("source" === a[n].tag) {
                    o = a[n].attr.src;
                    break;
                }
                e.attr.src = o;
            }
            i(e);
        },
        text: function(t) {
            var e = {
                node: "text",
                text: codeTransformation.transform(t)
            };
            i(e);
        },
        comment: function(t) {}
    }), u;
};

module.exports = {
    html2json: html2json
};