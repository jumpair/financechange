// u_pages/user/my-order/index.js
var g, app = getApp(), route = app.route,request = app.util.request,  page = app.page;

page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
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
        url: "Prostate",
        data:{userid:userid},
        showLoading: !1,
        success: function(e) {
          console.log(e);
            g.setData({
              orderlist:e
            })
        }
    });
  },
  goOrderProgress:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/u_pages/user/order-progress/index?id='+id,
    })
  },
  goPhone:function(e){
    var phone = e.currentTarget.dataset.phone;
    if(phone){
               wx.makePhoneCall({

                   phoneNumber: phone,
            
                })
                
           }else{
              wx.showToast({
                  icon: "none",
                   title: "本服务暂不支持电话咨询"
               });
           }
  },
  goOrderDetail:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/u_pages/user/order-detail/index?id='+id,
    })
  },
  goComment:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/u_pages/user/comment/index?id='+id,
    })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})