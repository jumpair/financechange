// pages/user/order-progress/index.js
var g, app = getApp(), route = app.route,request = app.util.request,  page = app.page;

page({
    data:{

    },
    onLoad: function(option) {
        g = this;
        var userid = wx.getStorageSync('userInfo').id;
        var orderid = option.id;
        request({
            url: "Myprogress",
            data:{
                userid:userid,
                orderid:orderid
            },
            showLoading: !1,
            success: function(res) {
                console.log(res)
                g.setData({
                  lists:res
                })
            }
        });
      
        
    },
})
