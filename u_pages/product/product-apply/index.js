// pages/product/product-apply/index.js

var g, app = getApp(), _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (e[r] = a[r]);
    }
    return e;
}, page = app.page, request = app.util.request, route = app.route;

page({
    data: {},
    onLoad: function(e) {
          console.log(e);
         g = this;
         g.setData({
            order_type: e.order_type,
            law_id:e.law_id
        });
       
        request({
            url: "ServiceInfo",
            data: {
                law_id: e.law_id          
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
   
    goApplySuccess(e){
        
        
        var that = this;    
        var company_name = e.detail.value.company_name;
        var company_phone = e.detail.value.company_phone;
        var message = e.detail.value.message;
        var code = e.detail.value.code;
        var user_id = g.data.userInfo.id;
       if(!user_id){
        wx.showModal({
          title: '提示',
          content: '请先登录账号',
          showCancel: false
        })
        return
       }
        if (company_name == 0) {
            wx.showModal({
              title: '提示',
              content: '请输入企业名称',
              showCancel: false
            })
            return
          }
        if (company_phone == 0) {
            wx.showModal({
              title: '提示',
              content: '请输入手机号',
              showCancel: false
            })
            return
          }
          if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(company_phone))) { 
    
            wx.showModal({
              title: '提示',
              content: '手机号有误,请重新填写',
              showCancel: false
            })
            return
          }

          if (code == 0) {
            wx.showModal({
              title: '提示',
              content: '请输入验证码',
              showCancel: false
            })
            return
          }
       

        request({
            url: "LawAdd",
            showLoading: !1,
            data: {
                order_type: that.data.order_type,
                law_id: that.data.law_id,
                company_name: company_name,
                company_phone: company_phone,
                message: message,
                code: code,
                user_id:g.data.userInfo.id
            },
            success: function(t) {
              
              route({
                url: '/u_pages/product/apply-success/index'
                })
            }
        });

       
    }
   
});



