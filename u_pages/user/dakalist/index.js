// u_pages/user/daka/dakalist/index.js
var g, app = getApp(), request = app.util.request,  page = app.page;
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        polyline: [],
        markers:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        console.log(options.listid);
        this.myaddress();
        request({
            url: "mytrack",
            data: {
                listid: options.listid,
            },
            showLoading: !1,
            success: function(res) {
                console.log(res);
                that.setData({
          
                    mytrack:res
                })
            }
        });
    },
    myaddress:function(){
        var that = this;
        wx.getLocation({
          type: 'gcj02',
          success: function(res) {
          var latitude = res.latitude;
          var longitude = res.longitude;
          // wx.setStorageSync('latitude', latitude) //纬度
          // wx.setStorageSync('longitude', longitude) //经度
          var qqMapApi = "https://apis.map.qq.com/ws/geocoder/v1/" + "?location=" + latitude + ',' +
          longitude + "&key=" + '6K7BZ-HUJLX-6Z64X-ZFXXL-H4FM7-J4FE2' + "&get_poi=1"
          wx.request({
          url: qqMapApi,
          data: {},
          method: 'GET',
          success: (res) => {
          console.log(res)
          if (res.statusCode == 200 && res.data.status == 0) {
           
              that.setData({
                address:res.data.result.address
              })
          }
          }
          })
          }
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