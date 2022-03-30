var g, _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (e[r] = a[r]);
    }
    return e;
}, _tools = require("../../utils/tools"), app = getApp(), page = app.page, request = app.util.request, route = app.route;

function pay(e) {
    request({
        url: "LawOrderPay",
        data: {
            user_id: app.userInfo.id || wx.getStorageSync("userInfo").id,
            order_id: e
        },
        success: function(e) {
            console.log("回调支付信息：", e), (0, _tools.wxPay)({
                data: e,
                success: function(e) {
                    (0, _tools.getChatList)(function(e) {
                        result("支付成功", "订单支付成功 ￥" + g.data.price);
                    });
                }
            });
        }
    });
}

function result(e, t) {
    // console.log(wx.getStorageSync('fid'));return;
    console.log(g.data.order_id), app.item = {
        title: e,
        content: t,
        img: "pay_ok",
        button: [ {
            title: "立即咨询",
            url: "chat_info",
            params: {
                toid: wx.getStorageSync('fid')
            }
        }, {
            title: "返回首页",
            url: "loading",
            type: "reLaunch"
        } ]
    }, route({
        type: "redirect",
        url: "result"
    });
}

page({
    data: {
        is_collect: 1,
        choice_index: 0,
        no_comment: app.srcRoot + "no_comment.png"
    },
    onLoad: function(e) {
 
        g = this;
        wx.setNavigationBarColor({
            frontColor: '#ffffff', // 必写项
            backgroundColor: '#157be4', // 必写项
         
        })
        var userInfo = wx.getStorageSync('userInfo');
        var userid = wx.getStorageSync('userInfo').id;
        console.log(e.fid);
        wx.setStorageSync('fid',e.fid);
   
        if(userInfo.is_law == null || userInfo.is_law == 'undefined' || userInfo.is_law == 0){
          g.setData({
            isLogin: !0
         });
        }else{
            request({
                url: "LawInfo",
                data: {
                    law_id: e.scene || e.id,
                    type: "-1" != e.id || "rand",
                    user_id: app.userInfo.id || wx.getStorageSync("userInfo").id,
                    num:e.num?e.num:1,
                    fid:e.fid,
                },
                showLoading: !1,
                success: function(e) {
                    console.log(e);
                   
                        e.score = parseInt(e.score), g.setData(_extends({}, e, {}));
                 

                }
            });
        }

  
    },
    onShareAppMessage: function(e) {
        return {
            title: g.data.name,
            path: g.route + "?id=" + g.data.id,
            imageUrl: g.data.img || ""
        };
    },
    collect: function(e) {
        var t = 1 == parseInt(g.data.is_collect) ? 2 : 1;
        (0, _tools.verifyLogin)({
            success: function(e) {
                request({
                    url: "LawCollect",
                    data: {
                        type: t,
                        law_id: g.data.id,
                        user_id: app.userInfo.id
                    },
                    showLoading: !1,
                    success: function(e) {
                        g.setData({
                            is_collect: t
                        });
                    }
                });
            }
        });
    },
    choiceServe: function(e) {
        e = parseInt(e.currentTarget.dataset.index), g.setData({
            choice_index: e,
            price: g.data.fulu_list[e].price
            
        });
    },
    toSubscribe: function() {

        var g = this;
        // if(g.data.choice_index==0){
        //     if(g.data.phone){
        //         wx.makePhoneCall({

        //             phoneNumber: g.data.phone,
              
        //           })
                  
        //     }else{
        //         wx.showToast({
        //             icon: "none",
        //             title: "本服务暂不支持电话咨询"
        //         });
        //     }
        //     return
        // }
        if(g.data.level == 2){
            wx.showToast({
                icon: "none",
                title: "机构禁止购买产品"
            });
           return;
        }

        if(g.data.can_order ==0){
        
            wx.showToast({
                icon: "none",
                title: "请先完善个人、企业和机构信息"
            });
            if(g.data.can_type == 0){
                setTimeout(item => {
                    wx.redirectTo({
                    url: '/u_pages/user/person-info/index',
                    })
                },2000);
            }else if(g.data.can_type == 1){
                setTimeout(item => {
                    wx.redirectTo({
                        url: '/u_pages/user/qiye-info/index',
                    })
                },2000);
            }else if(g.data.can_type == 2){
                setTimeout(item => {
                    wx.redirectTo({
                        url: '/u_pages/user/js-info/index',
                    })
                },2000);
            }
            return ;
            
        }
        if(g.data.own_goods ==1){
        
            wx.showToast({
                icon: "none",
                title: "不能订购自己的服务"
            });
            return ;
        }

        (0, _tools.subscribe)("USER"), (0, _tools.verifyLogin)({
           
            success: function(e) {
                var t = g.data.id, a = g.data.price;
                var fid = wx.getStorageSync('fid');
               if(g.data.manager_state != 1){
                var types = g.data.fulu_list[g.data.choice_index].type;
               }else{
                var types = 'zxzx';
               }
                switch (app.item = {
                    law_id: t,
                    price: a,
                    name: g.data.name,
                    img: g.data.img,
                    fid:fid
                }, types) {
                  case "jslt":
                    if (g.data.order_id) return void (0 < parseFloat(g.data.price) ? pay(g.data.order_id) : result("成功", "订单提交成功"));
                    g.data.order_id ? pay(g.data.order_id) : request({
                        url: "SubmitLawOrder",
                        data: {
                            type: "jslt",
                            law_id: t,
                            price: a,
                            user_id: app.userInfo.id || wx.getStorageSync("userInfo").id,
                            fid:fid
                        },
                        success: function(e) {
                            wx.hideLoading(), e ? g.setData({
                                order_id: e.order_id
                            }, function() {
                                0 < parseFloat(g.data.price) ? pay(g.data.order_id) : result("成功", "订单提交成功");
                            }) : wx.showToast({
                                icon: "none",
                                title: "提交失败:" + e
                            });
                        }
                    });
                    break;

                  default:
                    route({
                        url: "lawyer_subscribe",
                        params: {
                            type: g.data.choice_index
                        }
                    });
                }
            }
        });
    },
    toHome: function() {
        route({
            url: "loading",
            type: "reLaunch"
        });
    },
    goFinance(e){
        console.log(this.data.id);
       wx.navigateTo({
           url: '../product/product-intro/index?user_id='+e.currentTarget.dataset.id+'&law_id='+this.data.id,
       
         })
   },
    shareModal: function() {
        g.setData({
            isShow: !g.data.isShow
        });
    },
    poster: function() {
 
        g.shareModal(), route({
            url: "poster",
            params: {
                id: g.data.id,
                type: "lawposter"
            }
        });
    }
});