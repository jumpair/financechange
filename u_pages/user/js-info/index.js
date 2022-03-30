import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
var g, app = getApp(), request = app.util.request,  page = app.page;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        serve_list: [{
            id: 0,
            name: "融资服务",
            color: "#FFB540"
        }, {
            id: 1,
            name: "资本市场",
            color: "#37A2FF"
        }, {
            id: 3,
            name: "商事服务",
            color: "#635DEB"
        }, {
            id: 4,
            name: "专家咨询",
            color: "#FF5C55"
        }, {
            id: 5,
            name: "在线融资",
            color: "#1AD5D1"
        }],
        show: false,
        columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    },
    onLoad(options) {
        g = this;
        var value = wx.getStorageSync('userInfo');
        0 == value.is_law && g.setData({
          isLogin: !0
       });
        request({
          url: "Financeinfo",
          data:{userid:value.id},
          showLoading: !1,
          success: function(res) {
            console.log(res);
            g.data.industryindex = isHasElementTwo(res.industrylist, res.industry);
            console.log(res.industrylist);
            var jg_mc = res.is_must.is_jg_mc == 1 ? "true": '';
            var jg_js = res.is_must.is_jg_js == 1 ? "true": '';
            var jg_lxr = res.is_must.is_jg_lxr == 1 ? "true": '';
            var jg_zw = res.is_must.is_jg_zw == 1 ? "true": '';
            var jg_dh = res.is_must.is_jg_dh == 1 ? "true": '';
            var jg_hy = res.is_must.is_jg_hy == 1 ? "true": '';
              g.setData({
                lists:res,
                industry:res.industrylist,
                industryindex: g.data.industryindex,
                setmust:res.is_must,
                industryid:res.industry,
                jg_mc:jg_mc,
                jg_js:jg_js,
                jg_lxr:jg_lxr,
                jg_zw:jg_zw,
                jg_dh:jg_dh,
                jg_hy:jg_hy,
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
      saveperson:function(e){
        var that = this;
        var userinfo = wx.getStorageSync('userInfo');
        var name = e.detail.value.name;
        var des = e.detail.value.des;
        var contact = e.detail.value.contact;
        var job = e.detail.value.job;
        var tel = e.detail.value.tel;
        var industry = that.data.industryid;
        var userid = userinfo.id;
        var setmust = that.data.setmust;

        if (name == "" && setmust.is_jg_mc == 1) {
          wx.showModal({
            title: '提示',
            content: '请输入机构名称',
            showCancel: false
          })
          return
        }
        if (des == "" && setmust.is_jg_js == 1) {
            wx.showModal({
              title: '提示',
              content: '请输入机构介绍',
              showCancel: false
            })
            return
          }
        if (contact == '' && setmust.is_jg_lxr == 1) {
          wx.showModal({
            title: '提示',
            content: '请输入企业联系人',
            showCancel: false
          })
          return
        }
 
        if (tel == 0 && setmust.is_jg_dh == 1) {
          wx.showModal({
            title: '提示',
            content: '请输入手机号',
            showCancel: false
          })
          return
        }
        if(setmust.is_jg_dh == 1){
          if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(tel))) { 
  
            wx.showModal({
              title: '提示',
              content: '手机号有误,请重新填写',
              showCancel: false
            })
            return
          }
        }

        if (industry == 0 && setmust.is_jg_hy == 1) {
          wx.showModal({
            title: '提示',
            content: '请填写行业分类',
            showCancel: false
          })
          return
        } 

        var data ={
          name:name,
          des:des,
          contact:contact,
          job:job,
          tel:tel,
          industry:industry,
          userid:userid,
        }
  
        request({
          url: "SaveFinance",
          data:data,
          showLoading: !1,
          success: function(res) {
              console.log(res);
              if(res == 0){
                wx.showModal({
                  title: '提示',
                  content:'添加成功',
                  showCancel: false
                })
                setTimeout(item => {
                  wx.navigateBack({
                    delta: 1 //返回上一级页面
                  })
                },2000)
                return
              }else if(res == -1){
                wx.showModal({
                  title: '提示',
                  content: '修改成功',
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
        showPopup() {
            this.setData({
                show: true
            });
        },
        onClose() {
            this.setData({
                show: false
            });
        },
        onChange(event) {
            const {
                picker,
                value,
                index
            } = event.detail;
            Toast(`当前值：${value}, 当前索引：${index}`);
        },
        del(){
            Toast(`删除：当前`);
        }
        
})
function isHasElementTwo(arr, value) {
  for (var i = 0, vlen = arr.length; i < vlen; i++) {
    if (arr[i]['id'] == value) {
      return i;
    }
  }
  return -1;
} 