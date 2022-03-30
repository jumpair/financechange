// pages/user/finance/index.js
var g, app = getApp(), request = app.util.request,  page = app.page;
page({

    data: {
        activeNames: ['1'],
    },
    onLoad: function (options) {
        g = this;
        var userInfo = wx.getStorageSync('userInfo');
        var userid = wx.getStorageSync('userInfo').id;
        
        if(userInfo.is_law == null || userInfo.is_law == 'undefined' || userInfo.is_law == 0){
          g.setData({
            isLogin: !0
        });
        }
        request({
            url: "Myfinance",
            data:{userid:userid},
            showLoading: !1,
            success: function(res) {
              console.log(res);
                g.setData({
                  lists:res
                })
            }
        });
      },
    onChange(event) {
        this.setData({
            activeNames: event.detail,
        });
    },
})