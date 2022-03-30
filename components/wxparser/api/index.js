var html2Json = require("./html2json");

module.exports = function(t) {
    if ("[object String]" !== Object.prototype.toString.call(t)) throw new Error("HTML 内容必须是字符串");
    return html2Json.html2json(t);
};