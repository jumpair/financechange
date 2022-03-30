import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
var g, action_type, picker_val, pages, city_id, m_type_id, app = getApp(), page = app.page, request = app.util.request;
function getservicelist(catid){
  var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : g.data.heat, e = m_type_id;
  request({
      url: "ServiceList",
      showLoading: !1,
      data: {cateid:catid},
      success: function(t) {

        console.log(t);
        g.setData({
            list:t
        });
        g.selectComponent('#tabs').resize();
      }
  });
}
page({
  data: {
    active:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    console.log(e);
    g = this;
    g.setData({
      catid:e.catid,
      active:  parseInt(e.active)
    });
  
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
    g = this;
    
    console.log(g.data.catid);
    console.log(666);
    getservicelist(g.data.catid);
  },
  
goProIntro(e){

    wx.navigateTo({
      url: '../product/product-intro/index?user_id='+e.currentTarget.dataset.id+'&law_id='+e.currentTarget.dataset.lawid,
  
    })
  

},

goProdetail(e){
  var finance_num = e.currentTarget.dataset.num;

  if(finance_num == 1){
      wx.navigateTo({
        url: '/u_pages/lawyer/info?id='+ e.currentTarget.dataset.id+'&fid='+e.currentTarget.dataset.fid
      })
    }else{
      wx.navigateTo({
        url: '/u_pages/product/product-finance/index?id='+e.currentTarget.dataset.id,
    
      })
    }
},
goDetail(e){
  var finance_num = e.currentTarget.dataset.num;

  if(finance_num == 1){
      wx.navigateTo({
        url: '/u_pages/lawyer/info?id='+ e.currentTarget.dataset.id+'&fid='+e.currentTarget.dataset.fid
      })
    }else{
      wx.navigateTo({
        url: '/u_pages/product/product-finance/index?id='+e.currentTarget.dataset.id,
    
      })
    }
},
goSub(e){
  wx.navigateTo({
    url: '/u_pages/product/index?catid='+ e.currentTarget.dataset.id
  })
}
})
