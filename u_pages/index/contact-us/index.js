// pages/index/contact/index.js
var g, action_type, picker_val, pages, city_id, m_type_id, app = getApp(), page = app.page, request = app.util.request;
Page({

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
        request({
            url: "About",
            data: {
             
            },
            showLoading: !1,
            success: function(t) {
                console.log(t);
                g.setData({
                    content: t.about,
                    lng:t.lng,
                    lat:t.lat
                })
            }
        });

        // var self=this;
        // this.mapCtx = wx.createMapContext('myMap');
        // wx.getLocation({
        //   type: 'gcj02',
        //   success(res) {
        //     self.setData({
        //       latitude : '37.541201',
        //       longitude : '121.376086',
        //       markers: [{
        //         id: 1,
        //         latitude : '37.541201',
        //         longitude : '121.376086',
        //         iconPath: '/image/location.png',
        //         callout:{
        //           content:"",
        //           bgColor:"#fff",
        //           padding:"5px",
        //           borderRadius:"2px",
        //           borderWidth:"1px",
        //           borderColor:"#07c160",
        //         }
        //       },
              
        //       ],
        //     });
        //   }
        // })
    },
    openMap:function(){
      var that = this;
      wx.getLocation({
       type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
       success: function(res){
        // success
        wx.openLocation({
         latitude: that.data.lat, // 纬度，范围为-90~90，负数表示南纬
         longitude: that.data.lng, // 经度，范围为-180~180，负数表示西经
         scale: 28, // 缩放比例
         success: function (r) {
            console.log(r)
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