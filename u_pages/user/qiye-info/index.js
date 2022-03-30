import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
var g, app = getApp(), request = app.util.request,  page = app.page;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        sex: '',
        job: '',
        education: '',
        tel: '',
        code: '',
        certification: '',
        show1: false,
        show2: false,
        show3: false,
        columns1: [],
        columns2: [],
        columns3: [],
        industry: [],
        industryid: 0,
        capital: [],
        capitalid: 0,
        zzbs: [],
        coder: '获取验证码',
        zzbsid:0,
        jdTime:'',
        jdTime1:'',
        jdTime2:'',
        jdTime3:''

      },
      onLoad: function (options) {
        g = this;
        var value = wx.getStorageSync('userInfo');

        0 == value.is_law && g.setData({
          isLogin: !0
       });
        this.data.userInfo = value;
        request({
            url: "CompanyInfo",
            data:{userid:value.id},
            showLoading: !1,
            success: function(res) {
              console.log(res);
              g.data.industryindex = isHasElementTwo(res.industrylist, res.info.Industry);
              g.data.capitalindex = isHasElementTwo(res.capitallist, res.info.market);
              g.data.zzbsindex = isHasElementTwo(res.zzbslist, res.info.zzbs);
              var qy_mc = res.is_must.is_qy_mc == 1 ? "true": '';
              var qy_xm = res.is_must.is_qy_xm == 1 ? "true": '';
              var qy_zw = res.is_must.is_qy_zw == 1 ? "true": '';
              var qy_yw = res.is_must.is_qy_yw == 1 ? "true": '';
              var qy_hy = res.is_must.is_qy_hy == 1 ? "true": '';
              var qy_zj = res.is_must.is_qy_zj == 1 ? "true": '';
              var qy_sc = res.is_must.is_qy_sc == 1 ? "true": '';
              var qy_zf = res.is_must.is_qy_zf == 1 ? "true": '';
              g.setData({
                 lists:res.info,
                 industry:res.industrylist,
                 capital:res.capitallist,
                 zzbs:res.zzbslist,
                 industryindex: g.data.industryindex,
                 capitalindex: g.data.capitalindex,
                 zzbsindex: g.data.zzbsindex,
                 industryid:res.info.Industry,
                 capitalid:res.info.market,
                 zzbsid:res.info.zzbs,
                 setmust:res.is_must,
                 qy_mc:qy_mc,
                 qy_xm:qy_xm,
                 qy_zw:qy_zw,
                 qy_yw:qy_yw,
                 qy_hy:qy_hy,
                 qy_zj:qy_zj,
                 qy_sc:qy_sc,
                 qy_zf:qy_zf,
              })
            }
        });
    },
    bindIndustry: function (e) {
      var industry = this.data.industry;
      
      if (industry) {
        this.data.industryindex = e.detail.value;
        this.data.industryid = industry[e.detail.value].id;
      }
      this.setData({
        industry: industry,
        industryindex: e.detail.value
      })
    },
    bindCapital: function (e) {
      var capital = this.data.capital;

      if (capital) {
        this.data.capitalindex = e.detail.value;
        this.data.capitalid = capital[e.detail.value].id;
      }
      this.setData({
        capital: capital,
        capitalindex: e.detail.value
      })
    },
    bindZzbs: function (e) {
      var zzbs = this.data.zzbs;

      if (zzbs) {
        this.data.zzbsindex = e.detail.value;
        this.data.zzbsid = zzbs[e.detail.value].id;
      }
      this.setData({
        zzbs: zzbs,
        zzbsindex: e.detail.value
      })
    },
    savepubinfo:function(e){
      var that = this;
      var companyname = e.detail.value.companyname;
      var contacts = e.detail.value.contacts;
      var companywork = e.detail.value.companywork;
      var tel = e.detail.value.tel;
      var code = e.detail.value.code;
      var company_zw = e.detail.value.company_zw;
      var industry = that.data.industryid;
      var Funds = e.detail.value.Funds;
      var market = that.data.capitalid;
      var zzbs = that.data.zzbsid;
      var userid = that.data.userInfo.id;
      var setmust = that.data.setmust;
      
      if (companyname == "" && setmust.is_qy_mc == 1) {
        wx.showModal({
          title: '提示',
          content: '请输入企业名称',
          showCancel: false
        })
        return
      }
  
      if (contacts == ''  && setmust.is_qy_xm == 1) {
        wx.showModal({
          title: '提示',
          content: '请输入企业联系人',
          showCancel: false
        })
        return
      }
      if (companywork == '' && setmust.is_qy_zw == 1) {
        wx.showModal({
          title: '提示',
          content: '请输入职务',
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
      if (company_zw == "" && setmust.is_qy_yw == 1) {
        wx.showModal({
          title: '提示',
          content: '请填写主营业务',
          showCancel: false
        })
        return
      } 
      if (industry == 0 && setmust.is_qy_hy == 1) {
        wx.showModal({
          title: '提示',
          content: '请选择所属行业',
          showCancel: false
        })
        return
      } 
      if (Funds == "" && setmust.is_qy_zj == 1) {
        wx.showModal({
          title: '提示',
          content: '请填写注册资金',
          showCancel: false
        })
        return
      } 
      if (market == 0 && setmust.is_qy_sc == 1) {
        wx.showModal({
          title: '提示',
          content: '请选择资本市场',
          showCancel: false
        })
        return
      } 
       if (zzbs == 0 && setmust.is_qy_zf == 1) {
        wx.showModal({
          title: '提示',
          content: '请选择政治背书',
          showCancel: false
        })
        return
      } 
      var data ={
        companyname:companyname,
        contacts:contacts,
        companywork:companywork,
        code:code,
        tel:tel,
        company_zw:company_zw,
        industry:industry,
        Funds:Funds,
        market:market,
        zzbs:zzbs,
        userid:userid,
      }

      request({
        url: "SaveCompany",
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
        var company_phone = that.data.lists.tel;
      }
      
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
    onClose() {
      this.setData({
        show: false
      });
    },
    openSelect1(){
      this.setData({
        jdTime1:'对接',
        show1: true
      });
    },
    openSelect2(){
      this.setData({
        jdTime2:'对接',
        show2: true
      });
    },
    openSelect3(){
      this.setData({
        jdTime3:'对接',
        show3: true
      });
    },
    onCloseFile1(){
      this.setData({
        show1: false,
        show2: false,
        show3: false
      });
    },
    onCloseFile2(){
      this.setData({
        show1: false,
        show2: false,
        show3: false
      });
    },
    onCloseFile3(){
      this.setData({
        show1: false,
        show2: false,
        show3: false
      });
    },
    onChange1(event) {
      var _this = this
      const {
        picker,
        value,
        index
      } = event.detail;
      _this.setData({
        jdTime1: value
      })
    },
    onChange2(event) {
      var _this = this
      const {
        picker,
        value,
        index
      } = event.detail;
      _this.setData({
        jdTime2: value
      })
    },
    onChange3(event) {
      var _this = this
      const {
        picker,
        value,
        index
      } = event.detail;
      _this.setData({
        jdTime3: value
      })
    },
})
function isHasElementTwo(arr, value) {
  for (var i = 0, vlen = arr.length; i < vlen; i++) {
    if (arr[i]['id'] == value) {
      return i;
    }
  }
  return -1;
} 