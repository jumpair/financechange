// pages/user/message/index.js
var g, app = getApp(), page = app.page, request = app.util.request, route = app.route;

page({
    data:{

    },
    onLoad: function(option) {
        g = this;
        var userid = wx.getStorageSync('userInfo').id;
       
        request({
            url: "Myremind",
            data:{
                userid:userid  
            },
            showLoading: !1,
            success: function(res) {
                console.log(res)
                g.setData({
                    list:res
                })
            }
        });
    },
})
