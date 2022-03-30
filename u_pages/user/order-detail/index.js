var g, app = getApp(), route = app.route,request = app.util.request,  page = app.page;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTc: false
  },
  onLoad: function(option) {
    g = this;
    var userid = wx.getStorageSync('userInfo').id;
    var orderid = option.id;
    request({
        url: "Myorderdetail",
        data:{
            userid:userid,
            orderid:orderid
        },
        showLoading: !1,
        success: function(res) {
            console.log(res)
            g.setData({
              statename:res.nowstate.title,
              statenumber:res.nowstate.statenumber,
              statepid:res.nowstate.pid,
              type:res.type,
              statelist:res.statelist,
              finance:res.finance,
              statepid:res.nowstate.pid,
              showover:res.showover
            })
        }
    });
  
     
  },
  callphone(e){
  
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
  })

},
  closetc() {
    this.setData({
      showTc: false
    })
  },
  showTc() {
    this.setData({
      showTc: true
    })
  },
  closefw() {
    this.setData({
      showfw: false
    })
  },
  showfw() {
    this.setData({
      showfw: true
    })
  },
  backToprev() {
    wx.navigateBack({
      delta: 1,
    })
  }


})      