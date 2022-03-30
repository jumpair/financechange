
var g, action_type, picker_val, pages, city_id, m_type_id, app = getApp(), page = app.page, request = app.util.request;
function getservicelist(){
  var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : g.data.heat, e = m_type_id;
  request({
      url: "People",
      showLoading: !1,
      data: {},
      success: function(t) {
        console.log(t);
        g.setData({
            list:t
        });
      }
  });
}
page({
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    //console.log(e);
    g = this;
  },
  loadMore(){
    Toast.loading({
      duration: 1000,// 持续展示 toast
      message: '加载中...',
      forbidClick: false,//禁用背景点击
    })
  },
  getData(){
    //Toast('赶紧尼玛请求数据')
  },
  onShow: function () {
    /*if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1 //数字是当前页面在tabbar的索引,如我的查询页索引是2，因此这边为2，同理首页就为0，审批页面为1
      })
    }*/
    getservicelist();
  },
  goProIntro(){
    wx.navigateTo({
        url: '../product/product-intro/index'
      })
},
goProdetail(e){
   
      wx.navigateTo({
        url: '/u_pages/product/product-detail/index?id='+ e.currentTarget.dataset.id,
      })
},
goDetail(){
  wx.navigateTo({
    url: '../product/product2-detail/index'
  })
}
})
