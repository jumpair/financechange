import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
var g, app = getApp(), request = app.util.request,  page = app.page;

page({

    /**
     * 页面的初始数据
     */
    data: {
    qualificationIndex: ['0', '0'],//索引
    multiArray: [],
    objectMultiArray: [],
    multiIndex: [0, 0],
    show: false,
    erji: [],
    text1: '',
    text2:'',
    id1:'',
    id2:'',
    leixing:'',
    procatid:3,
    },
   
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        g = this;
        var value = wx.getStorageSync('userInfo');
        0 == g.data.userInfo.is_law && g.setData({
            isLogin: !0
         });
        request({
            url: "FinanceProduct",
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
                console.log(res)
                // let new_array = new Array();
                // new_array[0] = new Array();
                // for (let index = 0; index < res.typelist.length; index++) {
                //   new_array[0].push(res.typelist[index]['catename']);
                // }

                // new_array[1] = new Array();
                // for (let index = 0; index < res.typelist[0]['child'].length; index++) {
                //   new_array[1].push(res.typelist[0]['child'][index]['catename']);
                // }
                // console.log(new_array);
                
                g.setData({
                  lists:res,
                  typelist:res.typelist.type,
                  prolist:res.typelist.pro,
                  // multiArray:new_array
                })
              }
            }
        });
    },
    // bindMultiPickerColumnChange: function (e) {
    //   var that = this;
    //   console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    //   var data = {
    //     multiArray: this.data.multiArray,
    //     multiIndex: this.data.multiIndex
    //   };
    //   data.multiIndex[e.detail.column] = e.detail.value;
    //   if(e.detail.column==0){
    //     let s = e.detail.value;
    //     let sibada = that.data.typelist[s]['child'];
    //     let sss = new Array();
    //     for (let index = 0; index < sibada.length; index++) {
    //       sss.push(sibada[index]['catename']);
    //     }
    //     data.multiArray[1] = sss;
    //     // if(e.detail.value==0){
    //     //   data.multiArray[1] = ['卢本伟10','卢本伟11','卢本伟12','卢本伟13'];
    //     // }else{
    //     //   data.multiArray[1] = ['卢本伟20','卢本伟21','卢本伟22','卢本伟23'];
    //     // }
    //   }
    //   this.setData(data);
    //   return;
    // },
 
    bindPro: function (e) {
      var prolist = this.data.prolist;

      if (prolist) {
        this.data.proindex = e.detail.value;
        this.data.proid = prolist[e.detail.value].id;
        this.data.catid = prolist[e.detail.value].catid;
      }
      console.log(this.data.catid);
      this.setData({
        prolist: prolist,
        proindex: e.detail.value,
        procatid:this.data.catid
      })
     
    },
    // bindType: function (e) {
    //   var typelist = this.data.typelist;

    //   if (typelist) {
    //     this.data.typeindex = e.detail.value;
    //     this.data.typeid = typelist[e.detail.value].id;
    //   }
    //   this.setData({
    //     typelist: typelist,
    //     typeindex: e.detail.value
    //   })
     
    // },
    // bindMultiPickerChange: function (e) {
    //   //console.log('picker发送选择改变，携带值为', e.detail.value);
    //   var that = this;
    //   var s = e.detail.value;
    //   var parentid = that.data.typelist[s[0]]['id'];
    //   var child = that.data.typelist[s[0]]['child'][s[1]]['id'];
    //   console.log(parentid);
    //   console.log(child);
    //   this.setData({
    //     multiIndex: e.detail.value,
    //     parentid: that.data.typelist[s[0]]['id'],
    //     child : that.data.typelist[s[0]]['child'][s[1]]['id'],
    //   })
    // },
  
    goProductdetail:function(e)
    {
      var finance_num = e.currentTarget.dataset.num;
      var fid = wx.getStorageSync('userInfo').id;
      if(finance_num == 1){
          wx.navigateTo({
              url: '/u_pages/lawyer/info?id='+ e.currentTarget.dataset.id+'&fid='+fid
          })
          }else{
          wx.navigateTo({
              url: '/u_pages/product/product-finance/index?id='+e.currentTarget.dataset.id,
          
          })
      }
    },
    AddProduct:function(e){
        var g = this;
        var userid = wx.getStorageSync('userInfo').id;
        var proid = this.data.proid;
        // var typeid = this.data.typeid;
        var server_price = e.detail.value.server_price;
        var content = e.detail.value.content;
        var pro_ys = e.detail.value.pro_ys;
        var pro_tj = e.detail.value.pro_tj;
        var procatid = g.data.procatid;
        // var child = g.data.child;

 
        if (proid == 0 ) {
            wx.showModal({
              title: '提示',
              content: '请选择产品',
              showCancel: false
            })
            return
          }
          if(procatid != 3){
            if (server_price == '') {
              wx.showModal({
                title: '提示',
                content: '请输入服务价格',
                showCancel: false
              })
              return
            }
          }
          if (content == '') {
            wx.showModal({
              title: '提示',
              content: '请输入服务简介/专业方向',
              showCancel: false
            })
            return
          }
          if (pro_ys == '') {
            wx.showModal({
              title: '提示',
              content: '请输入产品优势/技术职称',
              showCancel: false
            })
            return
          }
          if (pro_tj == '') {
            wx.showModal({
              title: '提示',
              content: '请输入办理条件/专家简介',
              showCancel: false
            })
            return
          }

         var data ={
            proid:proid,
            // typeid:typeid,
            content:content,
            server_price:server_price,
            pro_ys:pro_ys,
            pro_tj:pro_tj,
            userid:userid,
        }
        request({
            url: "FinanceAddpro",

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