// pages/product/product-detail/index.js
var g, app = getApp(), _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (e[r] = a[r]);
    }
    return e;
}, page = app.page, request = app.util.request, route = app.route;

page({
    data: {
        
    },
    onLoad: function(e) {
     console.log(e);
    g = this;
    request({
        url: "NewInfo",
        data: {
            new_id: e.id          
        },
        showLoading: !1,
        success: function(b) {
            wx.setNavigationBarTitle({
                title: b.type_name,
              })
            console.log(b);
            g.setData(
             _extends({}, b, {})
            );
        }
    })
    }
    
   
});
