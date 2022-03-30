// pages/product/product-apply/index.js

var g, app = getApp(), _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (e[r] = a[r]);
    }
    return e;
}, page = app.page, request = app.util.request, route = app.route;

page({
    data: {
      name:"",
      tel:""
    },
    onLoad: function(e) {
     
         g = this;
         g.setData({
            aid:e.id
        });
        var userid = wx.getStorageSync('userInfo').id;
        request({
          url: "Getuserjb",
          data: {
              id: e.id,
              user_id:userid          
          },
          showLoading: !1,
          success: function(b) {
              console.log(b);
              g.setData({
                name:b.name,
                phone:b.tel,
              });
              
    
          }
      })
        
    },
   
    goSign(e){
       // console.log(e.detail.value);return
        var that = this;    
        var company_name = e.detail.value.company_name;
        var name = e.detail.value.name;
        var phone = e.detail.value.phone;
        var activity_people = e.detail.value.activity_people;
        var tj_people = e.detail.value.tj_people;
        var position = e.detail.value.position;
        var user_id = g.data.userInfo.id;
       if(!user_id){

       }
       if (name == 0) {
        wx.showModal({
          title: '提示',
          content: '请输入用户名',
          showCancel: false
        })
        return
      }
      
        if (phone == 0) {
            wx.showModal({
              title: '提示',
              content: '请输入手机号',
              showCancel: false
            })
            return
          }
          if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) { 
    
            wx.showModal({
              title: '提示',
              content: '手机号有误,请重新填写',
              showCancel: false
            })
            return
          }

          if (company_name == 0) {
            wx.showModal({
              title: '提示',
              content: '请输入公司名称',
              showCancel: false
            })
            return
          }
        
          if (activity_people == 0) {
            wx.showModal({
              title: '提示',
              content: '请输入姓名',
              showCancel: false
            })
            return
          }

          if (tj_people == 0) {
            wx.showModal({
              title: '提示',
              content: '请输入推荐人',
              showCancel: false
            })
            return
          }

          if (position == 0) {
            wx.showModal({
              title: '提示',
              content: '请输入职位',
              showCancel: false
            })
            return
          }
       

        request({
            url: "ActivityAdd",
            showLoading: !1,
            data: {
                company_name:company_name,
                activityid: that.data.aid,
                name: name,
                phone: phone,
                activity_people: activity_people,
                tj_people:tj_people,
                position: position,
                user_id:g.data.userInfo.id
            },
            success: function(t) {
              console.log( that.data.aid);
              if(t== 1){
                route({
                     url: '/u_pages/index/event-regist-detail/index?id='+ that.data.aid
                     })
              }else{
                wx.showModal({
                    title: '提示',
                    content: '您已经报名了，不能重复报名',
                    showCancel: false
                  })
                  return
              }
            /*  route({
               // url: '/u_pages/index/event-regist-detail/index?id='+ that.data.aid
                })*/
            }
        });

       
    }
   
});



