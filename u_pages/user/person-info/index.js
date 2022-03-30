var g, app = getApp(), request = app.util.request,  page = app.page;
page({

    /**
     * 页面的初始数据
     */
    data: {
      coder: '获取验证码',
      radio: '1',
    },
    onLoad: function(e) {
      wx.setNavigationBarTitle({
        title: '个人信息'
      })
      var that = this;
      0 == that.data.userInfo.is_law && that.setData({
        isLogin: !0
     });
      request({
        url: "Getusers",
        data:{
          userid: that.data.userInfo.id
        },
        showLoading: !1,
        success: function(res) {
          console.log(res)
          var gr_name = res.is_must.is_gr_name == 1 ? "true": '';
          var gr_zy = res.is_must.is_gr_zy == 1 ? "true": '';
          var gr_xl = res.is_must.is_gr_xl == 1 ? "true": '';
          var gr_zfh = res.is_must.is_gr_zfh == 1 ? "true": '';
            that.setData({
              name:res.info.name,
              radio:res.info.sex,
              job:res.info.job,
              education:res.info.education,  
              tel:res.info.tel,  
              certification:res.info.idcard,  
              setmust:res.is_must,
              gr_name:gr_name,
              gr_zy:gr_zy,
              gr_xl:gr_xl,
              gr_zfh:gr_zfh,
            })
        }
      });

   },
   onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
    saveperson:function(e){
      var that = this;
      var name = e.detail.value.name;
      var sex =  e.detail.value.sex;
      var job = e.detail.value.job;
      var education = e.detail.value.education;
      var tel = e.detail.value.tel;
      var code = e.detail.value.code;
      var certification = e.detail.value.certification;
      var userid = that.data.userInfo.id;
      var setmust = that.data.setmust;


      if (name == "" && setmust.is_gr_name == 1) {
        wx.showModal({
          title: '提示',
          content: '请输入姓名',
          showCancel: false
        })
        return
      }
  
      if (job == 0 && setmust.is_gr_zy == 1) {
        wx.showModal({
          title: '提示',
          content: '请输入职位',
          showCancel: false
        })
        return
      }
      if (education == 0 && setmust.is_gr_xl == 1) {
        wx.showModal({
          title: '提示',
          content: '请输入学历',
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
      console.log(tel);
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
      if (certification == "" && setmust.is_gr_zfh == 1) {
        wx.showModal({
          title: '提示',
          content: '请填写身份证号',
          showCancel: false
        })
        return
      } else if(setmust.is_gr_zfh == 1) {
  
        // var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!reg.test(certification)) {
  
          wx.showModal({
            title: '提示',
            content: '身份证号格式错误,请重新填写',
            showCancel: false
          })
          return
  
        }

      }
      var data ={
        name:name,
        sex:sex,
        job:job,
        code:code,
        education:education,
        tel:tel,
        code:code,
        certification:certification,
        userid:userid,
      }

      request({
        url: "SavePerson",
        data:data,
        showLoading: !1,
        success: function(res) {
            console.log(res);
            if(res.errno == 0){
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
            }else if(res.errno == -1){
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
    // console.log(e);return;
      var company_phone = phone;
      var that = this;
   
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
  }
})