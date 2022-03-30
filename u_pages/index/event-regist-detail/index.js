
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
      checked: 0, //复选框
     
  },
  onLoad: function(e) {
   
  g = this;
  g.setData(
   {userid:wx.getStorageSync('userInfo').id }
   );
  request({
      url: "ActivityInfo",
      data: {
          id: e.id,
          user_id:wx.getStorageSync('userInfo').id,      
      },
      showLoading: !1,
      success: function(b) {
          console.log(b);
          g.setData(
           _extends({}, b, {})
          );
          

      }
  })
  },
  /**
   * 组件的方法列表
   */
 
     
      goSign(e){

        wx:wx.navigateTo({
          url: '/u_pages/index/online-sigh/index?id='+g.data.id
        })
    },
    sureSign(e){
     
     wx:wx.navigateTo({
        url: '/u_pages/index/sign-in/index?id='+g.data.id
      })
  },

  hxScan(){
    g = this;
    wx.scanCode({
      success (res) {
        console.log(res);
        var orderno = res.result;
        console.log(orderno);
        console.log(g.data.userInfo.id );
        request({
            url: "ActivitySureSign",
            data: {
                orderno: orderno,
                userid:g.data.userInfo.id 
            },
            showLoading: !1,
            success: function(b) {
              console.log("这是返回");
              console.log(b);
              
            }
        })
      }
     
    })
  },

  showPopup() {
    this.setData({
        show: true
    });
},

onClose() {
    this.setData({
        show: false
    });
}
 
});

