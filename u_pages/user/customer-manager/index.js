var g, app = getApp(), request = app.util.request,  page = app.page;
page({
  data: {
    activeNames: ['1'],
  },
  onLoad: function (options) {
    g = this;
    var userid = g.data.userInfo.id;
    0 == g.data.userInfo.is_law && g.setData({
      isLogin: !0
   });
    request({
        url: "Mycustomer",
        data:{userid:userid},
        showLoading: !1,
        success: function(res) {
          console.log(res);
            g.setData({
              companylist:res.companylist,
              personlist:res.personlist
            })
        }
    });
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
})