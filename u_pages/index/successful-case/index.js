function _toConsumableArray(t) {
  if (Array.isArray(t)) {
      for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
      return e;
  }
  return Array.from(t);
}

var g, pages, app = getApp(), page = app.page, request = app.util.request;

function getList() {
  var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : -1, e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1;
  request({
      url: "NewsList",
      data: {
          type_id: t,
          page: e,
          number: app.config.news_number
      },
      showLoading: !1,
      success: function(t) {
          wx.stopPullDownRefresh();
          var a = g.data.news_list;
          a && 1 != e && (t = [].concat(_toConsumableArray(a), _toConsumableArray(t))), g.setData({
              news_list: t
          }), t.length && e * app.config.news_number >= t[0].num && g.setData({
              isLoad: !0
          });
      }
  });
}

page({
  data: {
      TabCur: 0,
      isLoad: !1,
      active: 0
  },
  onLoad: function(t) {
    var active = t.active;
      g = this, pages = 1, t && t.id ? (getList(t.id), wx.setNavigationBarTitle({
          title: t.title || "新闻"
      })) : request({
          url: "NewsType",
          showLoading: !1,
          success: function(t) {
              g.setData({
                active:  parseInt(active),
                  news_type: [ {
                      id: -1,
                      title: "全部"
                  } ].concat(_toConsumableArray(t))
              }), getList();
              g.selectComponent('#tabs').resize();
          }
      });
  },
  onPullDownRefresh: function() {
      g.setData({
          TabCur: 0,
          isLoad: !1
      }), g.onLoad();
  },
  onReachBottom: function() {
      !g.data.isLoad && pages++ && getList(g.data.news_type[g.data.TabCur].id, pages);
  },
  tabSelect: function(t) {
      t = t.currentTarget.dataset.item, g.setData({
          TabCur: t[0],
          isLoad: !1
      }), getList(t[pages = 1]);
  },
  loadMore(){
    Toast.loading({
      duration: 1000,// 持续展示 toast
      message: '加载中...',
      forbidClick: false,//禁用背景点击
    })
  },
 
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1 //数字是当前页面在tabbar的索引,如我的查询页索引是2，因此这边为2，同理首页就为0，审批页面为1
      })
    }
  },
  goDetail(e){
    wx:wx.navigateTo({
      url: '/u_pages/index/successful-case-detail/index?id='+ e.currentTarget.dataset.id
    })
  }
});