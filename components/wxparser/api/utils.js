module.exports = {
    makeMap: function(e) {
        for (var a = {}, r = e.split(","), t = 0, s = r.length; t < s; t++) a[r[t]] = !0;
        return a;
    },
    getFontSizeByAttribsSize: function(e) {
        var a;
        switch (e = parseInt(e, 10)) {
          case 2:
            a = .75;
            break;

          case 3:
            a = 1;
            break;

          case 4:
            a = 1.17;
            break;

          case 5:
            a = 1.5;
            break;

          case 6:
            a = 2;
            break;

          case 7:
            a = 3;
            break;

          default:
            a = 1;
        }
        return a + "em";
    }
};