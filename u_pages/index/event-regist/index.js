import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast'
function _toConsumableArray(t) {
  if (Array.isArray(t)) {
      for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
      return e;
  }
  return Array.from(t);
}

var g, pages, app = getApp(), page = app.page, request = app.util.request;

function getList1() {
  var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : -1, e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1;
  request({
      url: "Activitying",
      data: {
          page: e,
          number: 10
      },
      showLoading: !1,
      success: function(t) {
        console.log(t);
        g.setData({
          list: t
      })

         /* wx.stopPullDownRefresh();
          var a = g.data.list;
          a && 1 != e && (t = [].concat(_toConsumableArray(a), _toConsumableArray(t))), g.setData({
              list: t
          }), t.length && e * 10 >= t[0].num && g.setData({
              isLoad: !0
          });*/
      }
  });
}

function getList2() {
  var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : -1, e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1;
  request({
      url: "Activityold",
      data: {
          page: e,
          number: 10
      },
      showLoading: !1,
      success: function(t) {
        console.log(t);
        g.setData({
          oldlist: t
      })
          /*wx.stopPullDownRefresh();
          var a = g.data.oldlist;
          a && 1 != e && (t = [].concat(_toConsumableArray(a), _toConsumableArray(t))), g.setData({
              oldlist: t
          }), t.length && e * 10 >= t[0].num && g.setData({
              isLoad: !0
          });*/
      }
  });
}

page({
  data: {
      TabCur: 0,
      isLoad: !1
  },
  onLoad: function(t) {
    g = this;
     /* g = this, pages = 1, t && t.id ? (getList(t.id), wx.setNavigationBarTitle({
          title: t.title || "活动报名"
      })) : request({
          url: "NewsType",
          showLoading: !1,
          success: function(t) {
              g.setData({
                  news_type: [ {
                      id: -1,
                      title: "全部"
                  } ].concat(_toConsumableArray(t))
              }), getList();
          }
      });*/
      getList1();
      getList2();
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
      /*t = t.currentTarget.dataset.item, g.setData({
          TabCur: t[0],
          isLoad: !1
      }), getList(t[pages = 1]);*/
  }
  ,goDetail(e){
    var userInfo = wx.getStorageSync('userInfo');
    var userid = wx.getStorageSync('userInfo').id;
    if(userInfo.is_law == null || userInfo.is_law == 'undefined' || userInfo.is_law == 0){
      g.setData({
        isLogin: !0
     });
    }else{
    request({
        url: "ActivityInfo",
        data: {
            id: e.currentTarget.dataset.id,
            user_id:userid          
        },
        showLoading: !1,
        success: function(b) {
            console.log(b);
  
            if(b.end==0&&b.is_sign==1&&b.sure_sign==0 && g.data.userInfo.id!=b.hxid){
              wx:wx.navigateTo({
                url: '/u_pages/index/sign-in/index?id='+e.currentTarget.dataset.id
              })
            }else{
                wx.navigateTo({
                    url: '/u_pages/index/event-regist-detail/index?id='+ e.currentTarget.dataset.id,
                  })
            } 
        }
    })
}
   
  }
});
