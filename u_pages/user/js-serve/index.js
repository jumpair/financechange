// pages/user/jg-serve/index.js
var g, app = getApp(), request = app.util.request,  page = app.page;
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
        var value = wx.getStorageSync('userInfo');
        0 == g.data.userInfo.is_law && g.setData({
          isLogin: !0
       });
        request({
            url: "FinanceService",
            data:{userid:value.id},
            showLoading: !1,
            success: function(res) {
              console.log(res);
                g.setData({
                  lists:res
                })
            }
        });
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