// u_pages/product/product-finance/index.js
var g,  m_type_id, app = getApp(), page = app.page, request = app.util.request;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var g = this;
    var proid = options.id;
    var userid = wx.getStorageSync('userInfo').id;
    console.log(proid);
    request({
      url: "ProFinance",
      showLoading: !1,
      data: {proid:proid,userid,userid},
      success: function(t) {
        
        g.setData({
            list:t
        });
      }
  });
  },
  goProdetail(e){
    wx.navigateTo({
      url: '/u_pages/lawyer/info?id='+ e.currentTarget.dataset.id+'&num=2&fid='+e.currentTarget.dataset.fid,
    })
  },
  goProIntro(e){
    var that = this;
   
    wx.navigateTo({
      url: '/u_pages/product/product-intro/index?user_id='+e.currentTarget.dataset.id+'&law_id='+that.options.id,
  
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