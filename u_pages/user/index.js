var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, _tools = require("../../utils/tools"), _util = require("../../utils/util");

function _defineProperty(t, e, o) {
    return e in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t;
}

var g, app = getApp(), route = app.route,request = app.util.request,  page = app.page;

function getGrzx() {
    (0, _util.request)({
        url: "Grzx",
        showLoading: !1,
        success: function(t) {
            g.setData({
                grzx: t
            });
        }
    });
}
function getState(t) {
    var e = wx.getStorageSync("userInfo"), o = e.is_law, n = e.sh_state;
    return 3 == o && 0 == n ? t ? "" : "审核中" : 3 == o && 1 == n ? (app.item = {
        title: "申请驳回",
        content: e.jujue_content,
        img: "pay_no",
        button: [ {
            title: "返回首页",
            url: "loading",
            type: "reLaunch"
        }, {
            title: "重新申请",
            url: "enter",
            type: "redirect"
        } ]
    }, t ? "result" : "申请驳回") : 2 == o ? t ? "l_index" : g.data.system.law_custom + "界面" : t ? "enter" : g.data.system.law_custom + "入驻";
}

page({
    data: {
        nav: [ {
            icon: "yzd-other",
            title: "待付款"
        }, {
            icon: "yzd-time",
            title: "待服务"
        }, {
            icon: "yzd-flag",
            title: "待确认"
        }, {
            icon: "yzd-document",
            title: "待评价"
        }, {
            icon: "yzd-tasklist",
            title: "已完成"
        } ],
        isLogin: !1,
        updeta: !1
    },
    onLoad: function() {
        g = this, getGrzx();
        var level = wx.getStorageSync('userInfo').level;
        var userInfo = wx.getStorageSync('userInfo');
        var userid = wx.getStorageSync('userInfo').id;

        console.log(userid)
            request({
                url: "Prouser",
                data:{
                    userid:userid
                },
                showLoading: !1,
                success: function(e) {
                    console.log(e);
                    g.setData({
                      list:e.prolist,
                      mypeople:e.mypeople,
                      fxstate:e.fxid
                    })
                }
            });
            if(level == 2){
                // wx.setNavigationBarColor({
                //     frontColor: '#ffffff', // 必写项
                //     backgroundColor: '#157be4', // 必写项
                 
                // })
                request({
                    url:"FinanceUser",
                    data:{
                        userid:userid
                    },
                    showLoading: !1,
                    success: function(res) {
                        console.log(res)
                        g.setData({
                          finace:res,
                        })
                    }
                })
            }
        
        
        this.onShow();
    },
    Getcompany:function(){
        var g = this;
        var userid = wx.getStorageSync('userInfo').id;
        console.log(userid)
        request({
            url:"SaveUserlevel",
            data:{
                userid:userid
            },
            showLoading: !1,
            success: function(res) {
                if(res == 0){
                    wx.showModal({
                      title: '提示',
                      content:'修改成功,请重新载入小程序',
                      showCancel: false
                    })
                    setTimeout(item => {
                        wx.navigateTo({
                            url: '/u_pages/user/index'
                        })
                    },2000)
                    return
                  }else if(res == -1){
                    wx.showModal({
                      title: '提示',
                      content: '修改失败',
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
        })
    },
    login: function() {
       
        0 == g.data.userInfo.is_law && g.setData({
            isLogin: !0
        });
    },
    toPage: function(t) {
        t = t.currentTarget.dataset;
        var e = (t = "object" == _typeof(t.page) ? t.page : t).page, o = t.key || "", n = t.value || "", a = t.type || "";
        switch (e) {
          case "clearCache":
            return wx.clearStorageSync(), app.dataNav = "", app.system = "", app.userInfo = "", 
            wx.showToast({
                icon: "none",
                title: "清除成功"
            }), void setTimeout(function() {
                route({
                    url: "loading",
                    type: "reLaunch"
                });
            }, 1500);

          case g.data.law_item.page:
            return void (0, _tools.verifyLogin)({
                success: function() {
                    "l_index" == g.data.law_item.page && wx.setStorageSync("page", !0), route({
                        url: e,
                        params: _defineProperty({}, o, n),
                        type: a
                    });
                }
            });
        }
        route({
            url: e,
            params: _defineProperty({}, o, n),
            type: a
        });
    },
    updeta: function() {
        g.setData({
            updeta: !0
        }), wx.getUserProfile({
            desc: "用于完善用户的基础信息",
            success: function(t) {
                console.log(t.userInfo);
                "getUserProfile:ok" == t.errMsg && (0, _tools.updeta)(t.userInfo);
            },
            fail: function(t) {
                g.setData({
                    isLogin: !0
                });
            }
        });
    },
    getPhoneNumber: function(t) {
        (0, _tools.getPhoneNumber)(t);
    },
    onShow: function() {
        g.setData({
            law_item: {
                icon: "yzd-addpeople",
                title: getState(0),
                page: getState(1),
                type: "l_index" == getState(1) ? "reLaunch" : ""
            }
        });
    },
    
    golaw:function(e){
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
    goMyOrder:function(){
        wx.navigateTo({
          url: '/u_pages/user/my-order/index',
        })
    },
    goFinace:function(){
        wx.navigateTo({
          url: '/u_pages/user/finance/index',
        })
    },
    goPerInfo:function(){
        wx.navigateTo({
            url: '/u_pages/user/person-info/index',
          })
    },
    getFinance:function(e){
        console.log(e);
       wx.navigateTo({
           url: '/u_pages/product/product-intro/index?user_id='+e.currentTarget.dataset.id+'&law_id='+e.currentTarget.dataset.lawid,
         })
   },
    
    goSeo:function(){
        var that =this;
        var id =  wx.getStorageSync('userInfo').id;
        console.log(that.data.fxstate);
        if(that.data.fxstate == 2){
            wx.showModal({
                title: '提示',
                content: '审核中，请耐心等待',
                showCancel: false
            })
            return
        }else if(that.data.fxstate == 3){
            route({
                url: "poster",
                params: {
                    id: app.userInfo.id || wx.getStorageSync("userInfo").id,
                    type: "disposter"
                }
            });
            wx.redirectTo({
                url: '/u_pages/poster/index?id='+id+'&type=disposter',
              })
        }else{
            wx.navigateTo({
                url: '/fenxiao/enter/index',
              })
        }
       
    },
    goTender:function(){
        wx.navigateTo({
            url: '/u_pages/user/bidding/index',
          })
    },
    goTenderlist:function(){
        wx.navigateTo({
            url: '/u_pages/user/biddinglist/index',
          })
    },
    goCustomer:function(){
        wx.navigateTo({
            url: '/u_pages/user/customer-manager/index',
          })
    },
    goFinaceorder:function(){
        wx.navigateTo({
            url: '/u_pages/user/js-order/index',
          })
    },
    goServer:function(){
        wx.navigateTo({
            url: '/u_pages/user/js-serve/index',
          })
    },
    goProduct:function(){
        wx.navigateTo({
            url: '/u_pages/user/js-product/index',
          })
    },
    goBiddingdata:function(){
        wx.navigateTo({
            url: '/u_pages/user/js-bidding/index',
          })
    },
    goFinaceinfo:function(){
        wx.navigateTo({
            url: '/u_pages/user/js-info/index',
          })
    },
    goCompany:function(){
        wx.navigateTo({
            url: '/u_pages/user/qiye-info/index',
          })
    },
    goMessage:function(){
        wx.navigateTo({
            url: '/u_pages/user/message/index',
          })
    },
    getfbidding:function(){
        wx.navigateTo({
            url: '/u_pages/user/js-biddinglist/index',
          })
    },
    goDaka(){
        wx.navigateTo({
          url: '/u_pages/user/daka/index',
        })
    },
    dakajilu(){
        wx.navigateTo({
          url: '/u_pages/user/dakalist/index',
        })
    },
    xingcheng(){
        wx.navigateTo({
            url: '/u_pages/user/xingcheng/index',
          })
    },
    Getinformation:function(){
        wx.navigateTo({
            url: '/l_pages/index/index',
          })
    },
    call: function() {
        wx.makePhoneCall({
            phoneNumber: g.data.system.xcx_dbbq_tel
        });
    },
    onPullDownRefresh: function() {
        (0, _tools.getUserInfo)(function(t) {
            g.onShow();
        });
    }
});