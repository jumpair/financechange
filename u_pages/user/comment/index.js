// pages/user/comment/index.js
var g, app = getApp(), route = app.route,request = app.util.request,  page = app.page;
Page({

    /**
     * 页面的初始数据
     */
    data: {
    },
    onLoad: function(option) {
        g = this;
        var userid = wx.getStorageSync('userInfo').id;
        var orderid = option.id;
        request({
            url: "Mycomment",
            data:{
                userid:userid,
                orderid:orderid
            },
            showLoading: !1,
            success: function(res) {
                console.log(res)
                g.setData({
                    proname:res.proname,
                    financename:res.financename,
                    orderid:orderid,
                    value:res.pj_star,
                    overstar:res.overstar
                })
            }
        });
    },
    onChange(event) {
     
      this.setData({
        value: event.detail,
      });
    },
    SaveComment:function(e){
        var g = this;
        var userid = wx.getStorageSync('userInfo').id;
        var star = e.detail.value.star;
        var orderid = g.data.orderid;

         var data ={
            star:star,
            orderid:orderid,
            userid:userid,
        }
        request({
            url: "SaveComment",
            data:data,
            showLoading: !1,
            success: function(res) {
              console.log(res);
              if(res.state == 0){
                wx.showModal({
                  title: '提示',
                  content:res.msg,
                  showCancel: false
                })
                setTimeout(item => {
                  wx.navigateBack({
                      delta: 1 //返回上一级页面
                  })
               },2000)
                return
              }else if(res.state == -1){
                wx.showModal({
                  title: '提示',
                  content: res.msg,
                  showCancel: false
                })
                setTimeout(item => {
                  wx.navigateBack({
                      delta: 1 //返回上一级页面
                  })
              },2000)
                return
              }
            }
        });
    },
})