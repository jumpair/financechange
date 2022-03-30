var elements = require("./elements"), startTagReg = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/, endTagReg = /^<\/([-A-Za-z0-9_]+)[^>]*>/, attrReg = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g, parseHtml = function(e, i) {
    var t = void 0, s = void 0, n = void 0, l = [], r = e;
    for (l.last = function() {
        return this[this.length - 1];
    }; e; ) {
        if (s = !0, l.length && elements.special[l.last()]) e = e.replace(new RegExp("([\\s\\S]*?)</" + l.last() + "[^>]*>"), function(e, t) {
            return "";
        }); else if (0 === e.indexOf("\x3c!--") ? -1 !== (t = e.indexOf("--\x3e")) && (i.comment && i.comment(e.substring(4, t)), 
        e = e.substring(t + 3), s = !1) : 0 === e.indexOf("</") ? (n = e.match(endTagReg)) && (e = e.substring(n[0].length), 
        n[0].replace(endTagReg, o), s = !1) : 0 === e.indexOf("<") && (n = e.match(startTagReg)) && (e = e.substring(n[0].length), 
        n[0].replace(startTagReg, g), s = !1), s) {
            t = e.indexOf("<");
            for (var a = ""; 0 === t && !e.match(startTagReg); ) a += "<", t = (e = e.substring(1)).indexOf("<");
            a += t < 0 ? e : e.substring(0, t), e = t < 0 ? "" : e.substring(t), i.text && i.text(a);
        }
        if (e === r) throw new Error("解析 html 内容时出席异常");
        r = e;
    }
    if (l.length) throw new Error("HTML 内容存在未关闭的标签，会导致未关闭标签的内容无法被解析");
    function g(e, t, s, n) {
        t = t.toLowerCase();
        var r = elements.empty[t] || n;
        if (r || elements.closeSelf[t] || elements.special[t] || l.push(t), i.start && !elements.special[t]) {
            var a = [];
            s.replace(attrReg, function(e, t, s) {
                elements.fillAttrs[t] && (s = t), a.push({
                    name: t,
                    value: s || ""
                });
            }), i.start(t, a, r);
        }
    }
    function o(e, t) {
        if (t) {
            t = t.toLowerCase();
            for (var s = -1, n = l.length - 1; 0 <= n; n--) if (l[n] == t) {
                s = n;
                break;
            }
            0 <= s && (i.end && i.end(l[s]), l.length = s);
        }
    }
};

module.exports = {
    parseHtml: parseHtml
};