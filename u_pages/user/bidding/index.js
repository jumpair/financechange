import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
var g, app = getApp(), request = app.util.request,  page = app.page;
page({

    /**
     * 页面的初始数据
     */
    data: {
        name:'',
        coder: '获取验证码',
        tel:''
    },
    onLoad: function (options) {
      g = this;
      var userInfo = wx.getStorageSync('userInfo');
      
      if(userInfo.is_law == null || userInfo.is_law == 'undefined' || userInfo.is_law == 0){
        g.setData({
          isLogin: !0
      });
      }
      request({
        url: "Getuserjb",
        data:{user_id:userInfo.id},
        showLoading: !1,
        success: function(res) {
          console.log(res);
            g.setData({
              name:res.name,
              tel:res.tel
            })
          
        }
    });
    
    },
    back(){
        wx.navigateBack({
          delta: 1,
        })
    },
    saveperson:function(e){
      var that = this;
      var title = e.detail.value.title;
      var name = e.detail.value.name;
      var tel = e.detail.value.tel;
      var code = e.detail.value.code;
      var content = e.detail.value.content;
      var userid = that.data.userInfo.id;
      console.log(tel);
      if (title == "") {
        wx.showModal({
          title: '提示',
          content: '请输入招标标题',
          showCancel: false
        })
        return
      }
      if (name == "") {
        wx.showModal({
          title: '提示',
          content: '请输入姓名',
          showCancel: false
        })
        return
      }
      if (tel == 0) {
        wx.showModal({
          title: '提示',
          content: '请输入手机号',
          showCancel: false
        })
        return
      }
      if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(tel))) { 

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
      if (content == "") {
        wx.showModal({
          title: '提示',
          content: '请输入需求',
          showCancel: false
        })
        return
      }
      var data ={
        title:title,
        name:name,
        tel:tel,
        code:code,
        content:content,
        userid:userid,
      }

      request({
        url: "MyBidding",
        data:data,
        showLoading: !1,
        success: function(res) {
            console.log(res);
            if(res.errno == 0){
              wx.showModal({
                title: '提示',
                content: res.msg,
               
              })
              setTimeout(item => {
                wx.navigateBack({
                  delta: 1 //返回上一级页面
                })
              },2000)
            }else if(res.errno == -1){
              wx.showModal({
                title: '提示',
                content: res.msg,
                
              })
             return;
            }
        }
      });
    },
    getInputValue(e){
      console.log(e.detail)// {value: "ff", cursor: 2}  
      this.setData({
          company_phone: e.detail
      })
  },
    getCode() {
       
      var that = this;
      if (that.data.disabled == true) {
        return;
      }

      var company_phone = this.data.company_phone;
      if(company_phone == undefined){
        var company_phone = that.data.tel;
      }
      console.log(company_phone);
     if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(company_phone))) { 

          wx.showModal({
              title: '提示',
              content: '手机号有误,请重新填写',
              showCancel: false
          })
          return
      }
      console.log(1123);
      this.sendCode(company_phone);
     },
  sendCode(phone){
      var company_phone = phone;
      var that = this;
      console.log(company_phone);
      console.log(999);
      request({
          url: "TencentSms",
          showLoading: !1,
          data: {
              company_phone: company_phone,
          },
          success: function(tbe) {
              console.log(tbe);
              if(tbe==1){
                  var time = 60;
                  that.setData({
                      coder: '60秒后重发',
                    disabled: true
                  })
                  var Interval = setInterval(function () {
                    time--;
                    if (time > 0) {
                      that.setData({
                          coder: time + '秒后重发'
                      })
                    } else {
                      clearInterval(Interval);
                      that.setData({
                          coder: '获取验证码',
                       disabled: false
                      })
                    }
                  }, 1000);
              }else{
                  wx.showModal({
                      title: '提示',
                      content: '短信发送失败',
                      showCancel: false
                  })
              }

          }
      });
      return true;
  },
    submit(){

        Dialog.alert({
            title: '提交成功',
            message: '感谢您的填写',
          }).then(() => {
            wx.navigateBack({
              delta: 1,
            })
          });
    }
})