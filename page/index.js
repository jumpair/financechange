var g, _tools = require("../utils/tools"), app = getApp(), page = app.page, request = app.util.request, route = app.route;

page({
    data: {},
    onLoad: function(p) {
        g = this, app.isLoading = !0;
    }
});