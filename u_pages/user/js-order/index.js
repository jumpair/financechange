import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
var g, app = getApp(), request = app.util.request,  page = app.page;
Page({
  data: {
    show: false,
    show0: false,
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    show5: false,
    columns: ['对接', '现场尽调', '资料收集', '授信审批', '抵押登记', '放款'],
    tcIndex: 0,
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    showtime: false,
    showtime1: false,
    showtime2: false,
    zlstateindex: 0,
    jdTime: '2020-09-20', //现场尽调时间
    jdTime1: '2020-09-20', //起始日
    jdTime2: '2020-09-20', //到期日
  },
  onLoad(options) {
    g = this;
    var value = wx.getStorageSync('userInfo');
    0 == value.is_law && g.setData({
      isLogin: !0
   });
   this.datechange(new Date().getTime())
   this.datechange1(new Date().getTime())
   this.datechange2(new Date().getTime())
    request({
      url: "FinanceOrder",
      data:{userid:value.id},
      showLoading: !1,
      success: function(res) {
        console.log(res);
        if(res == -2){
          wx.showToast({
            icon:'none',
            title:'请完善机构资料'
          })
          setTimeout(item => {
            wx.navigateBack({
              delta: 1 //返回上一级页面
            })
          },2000)
        }else{
          g.setData({
            lists:res.orderlist,
            statelist:res.statelist,

          })
        }
      }
  });
  },
  bindOrderid:function(e){
    var id = e.currentTarget.dataset.id;
    console.log(id);
    this.setData({
        orderuserid: id
    })
},
  bindState: function (e) {
    var statelist = this.data.statelist;
    var orderid = e.currentTarget.dataset.id;
    var catid = e.currentTarget.dataset.catid;
    var statelist = e.currentTarget.dataset.statelist;
    
    this.data.orderid = orderid;
    if (statelist) {
      this.data.stateindex = e.detail.value;
      this.data.statenum = statelist[e.detail.value].statenumber;
     
    }
    if(this.data.statenum == 10 || this.data.statenum == 12 || this.data.statenum == 20 || this.data.statenum == 22 ||this.data.statenum == 32 || this.data.statenum == 42 || this.data.statenum == 52  || this.data.statenum == 61  ||  this.data.statenum == 62){
      this.onCloseFile(this.data.statenum,catid);
    }else{
      this.onChangestate(this.data.statenum);
    }
   
  },
  onChangestate:function(n){
    var that = this;
    var orderid = that.data.orderid;
    var userid = that.data.orderuserid;
    var state = that.data.statenum;

    var data ={
      orderid:orderid,
      userid:userid,
      state:state
    }
   
    request({
      url: "SaveState",
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
   //时间戳转化
   datechange(time) {
    var date = new Date(time);
    var year = date.getFullYear();
    var mon = date.getMonth() + 1;
    var day = date.getDate();
    this.setData({
      jdTime: year + '-' + ((mon<10)?('0'+mon):mon) + '-' + ((day<10)?('0'+day):day),
    })
  },
  datechange1(time) {
    var date = new Date(time);
    var year = date.getFullYear();
    var mon = date.getMonth() + 1;
    var day = date.getDate();
    this.setData({
      jdTime1: year + '-' + ((mon<10)?('0'+mon):mon) + '-' + ((day<10)?('0'+day):day),
    })
  },
  datechange2(time) {
    var date = new Date(time);
    var year = date.getFullYear();
    var mon = date.getMonth() + 1;
    var day = date.getDate();
    this.setData({
      jdTime2: year + '-' + ((mon<10)?('0'+mon):mon) + '-' + ((day<10)?('0'+day):day)
    })
  },
  //点击确认选择时间
  confirmTime() {
    this.setData({
      showtime: false
    })
  },
  confirmTime1() {
    this.setData({
      showtime1: false
    })
  },
  confirmTime2() {
    this.setData({
      showtime2: false
    })
  },
  //点击取消
  cancelTime() {
    this.setData({
      showtime: false
    })
  },
  cancelTime1() {
    this.setData({
      showtime1: false
    })
  },
  cancelTime2() {
    this.setData({
      showtime2: false
    })
  },
  //选择时间时触发
  onInput(event) {
    this.datechange(event.detail)
  },
  onInput1(event) {
    this.datechange1(event.detail)
  },
  onInput2(event) {
    this.datechange2(event.detail)
  },
  zlChangeState() {
    this.setData({
      zlstateindex: 0
    })
  },
  zlChangeState1() {
    this.setData({
      zlstateindex: 1
    })
  },
  opentimebox() {
    this.setData({
      showtime: true
    });
  },
  opentimebox1() {
    this.setData({
      showtime1: true
    });
  },
  opentimebox2() {
    this.setData({
      showtime2: true
    });
  },
  closetimebox() {
    this.setData({
      showtime: false
    });
  },
  goOrderProgress() {
    this.setData({
      show: true
    });
  },
  goOrderDetail(e) {
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '/u_pages/user/order-detail/index?id='+id,
    })
  },
  savedj:function(e){
    var that = this;
    var name = e.detail.value.name;
    var tel = e.detail.value.tel;
    var orderid = that.data.orderid;
    var userid = that.data.orderuserid;
    var state = that.data.statenum;
    
    if (name == '') {
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

    var data ={
      name:name,
      tel:tel,
      orderid:orderid,
      userid:userid,
      state:state
    }
   
    request({
      url: "SaveDock",
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
  saveDD:function(e){
    var that = this;
    var name = e.detail.value.name;
    var zhiwu = e.detail.value.zhiwu;
    var tel = e.detail.value.tel;
    var time = that.data.jdTime;
    var orderid = that.data.orderid;
    var userid = that.data.orderuserid;
    var state = that.data.statenum;

    if (name == '') {
      wx.showModal({
        title: '提示',
        content: '请输入姓名',
        showCancel: false
      })
      return
    }
    if (zhiwu == '') {
      wx.showModal({
        title: '提示',
        content: '请输入职位',
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

    
    var data ={
      name:name,
      tel:tel,
      zhiwu:zhiwu,
      time:time,
      orderid:orderid,
      userid:userid,
      state:state
    }
   
    request({
      url: "SaveDD",
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
  saveMaterial:function(e){
    var that = this;
    var zlxz = that.data.zlstateindex;

    var reason = e.detail.value.zil;
    var orderid = that.data.orderid;
    var userid = that.data.orderuserid;
    var state = that.data.statenum;
   
    if (reason == '') {
      wx.showModal({
        title: '提示',
        content: '请输入原因',
        showCancel: false
      })
      return
    }
    var data ={
      reason:reason,
      zlxz:zlxz,
      orderid:orderid,
      userid:userid,
      state:state
    }
   
    request({
      url: "SaveReason",
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
  // saveMaterial:function(e){
  //   var that = this;
  //   var zlxz = that.data.zlstateindex;

  //   var reason = e.detail.value.zil;
  //   var orderid = that.data.orderid;
  //   var userid = that.data.orderuserid;
  //   var state = that.data.statenum;

  //   if (reason == '') {
  //     wx.showModal({
  //       title: '提示',
  //       content: '请输入原因',
  //       showCancel: false
  //     })
  //     return
  //   }
  //   var data ={
  //     reason:reason,
  //     zlxz:zlxz,
  //     orderid:orderid,
  //     userid:userid,
  //     state:state
  //   }
   
  //   request({
  //     url: "SaveReason",
  //     data:data,
  //     showLoading: !1,
  //     success: function(res) {
  //         console.log(res);
  //         if(res.state == 0){
  //           wx.showModal({
  //             title: '提示',
  //             content:res.msg,
  //             showCancel: false
  //           })
  //           setTimeout(item => {
  //             wx.navigateBack({
  //               delta: 1 //返回上一级页面
  //             })
  //           },2000)
  //           return
  //         }else if(res.state == -1){
  //           wx.showModal({
  //             title: '提示',
  //             content: res.msg,
  //             showCancel: false
  //           })
  //           setTimeout(item => {
  //             wx.navigateBack({
  //               delta: 1 //返回上一级页面
  //             })
  //           },2000)
  //           return
  //         }
  //     }
  //   });
  // },
  saveLoan:function(e){
    var that = this;
 
    var price = e.detail.value.price;
    var rate = e.detail.value.rate;
    var term = e.detail.value.term;
    var guarantee = e.detail.value.guarantee;
    var start_time = that.data.jdTime1;
    var end_time = that.data.jdTime2;
    var manager = e.detail.value.manager;
    var orderid = that.data.orderid;
    var userid = that.data.orderuserid;
    var state = that.data.statenum;
  
    if (price == '') {
      wx.showModal({
        title: '提示',
        content: '请输入价格',
        showCancel: false
      })
      return
    }
    if (rate == '') {
      wx.showModal({
        title: '提示',
        content: '请输入利率',
        showCancel: false
      })
      return
    }
    if (term == '') {
      wx.showModal({
        title: '提示',
        content: '请输入周期',
        showCancel: false
      })
      return
    }
    if (guarantee == '') {
      wx.showModal({
        title: '提示',
        content: '请输入担保方式',
        showCancel: false
      })
      return
    }
    if (manager == '') {
      wx.showModal({
        title: '提示',
        content: '请输入经理人',
        showCancel: false
      })
      return
    }
    var data ={
      price:price,
      rate:rate,
      term:term,
      guarantee:guarantee,
      start_time:start_time,
      end_time:end_time,
      manager:manager,
      orderid:orderid,
      userid:userid,
      state:state
    }
   
    request({
      url: "SaveLoan",
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
  saveServer:function(e){
    var that = this;
 
    var scontent = e.detail.value.scontent;
    var orderid = that.data.orderid;
    var userid = that.data.orderuserid;
    var state = that.data.statenum;
  
    if (scontent == '') {
      wx.showModal({
        title: '提示',
        content: '请输入服务内容',
        showCancel: false
      })
      return
    }
    
    var data ={
      scontent:scontent,
      orderid:orderid,
      userid:userid,
      state:state
    }
   
    request({
      url: "SaveServer",
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
  onClose() {
    this.setData({
      show: false
    });
  },
  onChange(event) {
    var _this = this
    const {
      picker,
      value,
      index
    } = event.detail;
    console.log(event.detail);
    _this.setData({
      tcIndex: index
    })
  },
  onCloseFile(n,val) {
    console.log(val)
    var num = Number(n);
    switch (num) {
      case 10:
        this.setData({
          show0: true
        });
        break;
      case 20:
        this.setData({
          show1: true
        });
        break;
      case 12:
          this.setData({
            show11: true
          });
      break;
      case 22:
          this.setData({
            show22: true
          });
      break;
      case 32:
        this.setData({
          show2: true
        });
        break;
      case 42:
        this.setData({
          show3: true
        });
        break;
      case 52:
        this.setData({
          show4: true
        });
        break;
      case 61:
        if(val == 3){
          this.setData({
            show7: true
          });
          break;
      
        }
      case 62:
        if(val == 3){
          this.setData({
            show5: true
          });
          break;
        } else{
          this.setData({
            show6: true
          });
          break;
        }

    };
    this.setData({
      show: false
    });
  },
  aaa() {
    this.close()
  },
  close() {
    this.setData({
      show1: false,
      show11: false,
      show22: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      show0: false,
      show7: false
    });
  }
})