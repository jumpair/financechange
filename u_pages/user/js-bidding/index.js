var g, app = getApp(), request = app.util.request,  page = app.page;
page({
    data: {
      show: false,
    },
    onLoad(options) {
      g = this;
      var value = wx.getStorageSync('userInfo');
      0 == g.data.userInfo.is_law && g.setData({
        isLogin: !0
     });
      request({
        url: "FinanceBidding",
        data:{userid:value.id},
        showLoading: !1,
        success: function(res) {
          console.log(res);
          if(res == -2){
            wx.showToast({
              icon:'none',
              title:'请完善机构资料'
            })
            setTimeout(item => {
              wx.navigateBack({
                delta: 1 //返回上一级页面
              })
            },2000)
          }else{
            g.setData({
              lists:res
            })
          }
        }
    });
    },
    showPopup:function(e) {
      var g = this;
      var userid = wx.getStorageSync('userInfo').id;
      var biddingid = e.currentTarget.dataset.id;
      request({
        url: "FinanceTender",
        data:{userid:userid,biddingid:biddingid},
        showLoading: !1,
        success: function(res) {
          console.log(res);
          if(res.state == 0){
            wx.showModal({
              title: '提示',
              content:res.msg,
              showCancel: false
            })
            setTimeout(item => {
              wx.navigateBack({
                delta: 1 //返回上一级页面
              })
            },2000)
            return
          }else if(res.state == -1){
            wx.showModal({
              title: '提示',
              content: res.msg,
              showCancel: false
            })
            setTimeout(item => {
              wx.navigateBack({
                delta: 1 //返回上一级页面
              })
            },2000)
            return
          }
        }
    });
  
    },
  
    onClose() {
      this.setData({ show: false });
    },
  });