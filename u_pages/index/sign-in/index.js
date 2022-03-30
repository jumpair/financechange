// pages/user/comment/index.js

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
        
        show: false
    },
    onLoad: function(e) {
     
    g = this;
    request({
        url: "ActivityInfo",
        data: {
            id: e.id,
            user_id:g.data.userInfo.id          
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
  
  