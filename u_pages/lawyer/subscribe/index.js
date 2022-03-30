var g, law_id, _tools = require("../../../utils/tools"),
    app = getApp(),
    page = app.page,
    request = app.util.request,
    route = app.route;

function pay(t) {
    request({
        url: "LawOrderPay",
        data: {
            user_id: app.userInfo.id || wx.getStorageSync("userInfo").id,
            order_id: t
        },
        success: function (t) {
            console.log("回调支付信息：", t), (0, _tools.wxPay)({
                data: t,
                success: function (t) {
                    result("支付成功", "订单支付成功 ￥" + g.data.price);
                }
            });
        }
    });
}

function result(t, e, k) {
    if(k == 2){
        console.log(g.data.order_id), app.item = {
            title: t,
            content: e,
            img: "pay_ok",
            button: [ {
                title: "立即咨询",
                url: "chat_info",
                params: {
                    toid: wx.getStorageSync('toid')
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
    }else{
        console.log(g.data.order_id), app.item = {
            title: t,
            content: e,
            img: "pay_ok",
            button: [{
                title: "查看订单",
                url: "orders_info",
                params: {
                    order_id: g.data.order_id,
                    type: 0
                }
            }, {
                title: "返回首页",
                url: "loading",
                type: "reLaunch"
            }]
        }, route({
            type: "redirect",
            url: "result"
        });
    }
}

page({
    data: {
        imgList: [],
        disabled: false,
        coder: '获取验证码',
        selectId:'',//选择姓名的id
        textaret:'',//表单多行
        list:'',
    },

    myevent(e){
        let selectId = e.detail.params
        this.setData({
            selectId:selectId
        })
    },
    textareaChange(e){
        console.log(e.detail.value);
        this.setData({
            textaret:e.detail.value
        })
    },
    onLoad: function (t) {
        
        g = this, law_id = app.item.law_id, g.setData({
            price: app.item.price,
            name: app.item.name,
            img: app.item.img,
            fid: app.item.fid,
            law_id: app.item.law_id,
            time: (0, _tools.getTime)(),
            date: (0, _tools.getDate)(),
            type: parseInt(t.type)
        }, function () {
            app.item = "";
        });
        var userid = wx.getStorageSync('userInfo').id;

        request({
            url: "ServiceInfo",
            data: {
                userid: userid,
                fid:app.item.fid,
                law_id: app.item.law_id,

            },
            showLoading: !1,
            success: function (b) {
                console.log(b);
                g.setData({
                    sname: b.name,
                    tel: b.tel,
                    managerstate: b.managerstate,
                    list:b.managerlist
                });

            }
        })
    },
    ChooseImage: function () {
        wx.chooseImage({
            count: 9,
            sizeType: ["original", "compressed"],
            sourceType: ["album"],
            success: function (t) {
                0 != g.data.imgList.length ? g.setData({
                    imgList: g.data.imgList.concat(t.tempFilePaths)
                }) : g.setData({
                    imgList: t.tempFilePaths
                });
            }
        });
    },
    ViewImage: function (t) {
        wx.previewImage({
            urls: g.data.imgList,
            current: t.currentTarget.dataset.url
        });
    },
    DelImg: function (t) {
        g.data.imgList.splice(t.currentTarget.dataset.index, 1), g.setData({
            imgList: g.data.imgList
        });
    },
    DateChange: function (t) {
        this.setData({
            date: t.detail.value
        });
    },
    TimeChange: function (t) {
        this.setData({
            time: t.detail.value
        });
    },
   
    //提交表单方法
    // submit: function (t) {
       
    //     (0, _tools.subscribe)("USER"), g.submitFromId(t);
    //     console.log();
    //     var e = (t = t.detail).value.name,
    //         a = t.value.phone,
    //         i = t.value.content,
    //         o = g.data.type;
    //     g.data.order_id ? pay(g.data.order_id) : e ? a ? i ? g.data.order_id ? 0 < parseFloat(g.data.price) ? pay(g.data.order_id) : result("成功", "订单提交成功") : (wx.showLoading({
    //         mask: !0,
    //         title: "图片上传中..."
    //     }), (0, _tools.uploadImg)(g.data.imgList, function (t) {
    //         wx.showLoading({
    //             mask: !0,
    //             title: "提交中..."
    //         }), request({
    //             url: "SubmitLawOrder",
    //             showLoading: !1,
    //             data: {
    //                 type: 0 == o ? "phone" : "img",
    //                 law_id: law_id,
    //                 content: i,
    //                 imglist: t,
    //                 name: e,
    //                 phone: a,
    //                 yy_time: 0 == o ? g.data.date + " " + g.data.time : "",
    //                 price: g.data.price,
    //                 user_id: app.userInfo.id || wx.getStorageSync("userInfo").id
    //             },
    //             success: function (t) {
    //                 wx.hideLoading(), t ? g.setData({
    //                     order_id: t.order_id
    //                 }, function () {
    //                     0 < parseFloat(g.data.price) ? pay(g.data.order_id) : result("成功", "订单提交成功");
    //                 }) : wx.showToast({
    //                     icon: "none",
    //                     title: "提交失败:" + t
    //                 });
    //             }
    //         });
    //     })) : wx.showToast({
    //         icon: "none",
    //         title: "请输入详细描述"
    //     }) : wx.showToast({
    //         icon: "none",
    //         title: "请输入您的手机号"
    //     }) : wx.showToast({
    //         icon: "none",
    //         title: "请输入您的姓名"
    //     });
    // },
    getInputValue(e) {
        console.log(e.detail) // {value: "ff", cursor: 2}  
        this.setData({
            company_phone: e.detail
        })
    },
    goApplySuccess(e) {

        var that = this;
        var company_name = that.data.sname;
        var company_phone = that.data.tel;
        var message = that.data.textaret;
        var code = e.detail.value.code;
        
        var user_id = wx.getStorageSync('userInfo').id;
        if(that.data.managerstate == 1){
            var fid = that.data.selectId.userid;
        }else{
            var fid = that.data.fid;
        }

        //将选中经理进行替换
        if (!user_id) {
            wx.showModal({
                title: '提示',
                content: '请先登录账号',
                showCancel: false
            })
            return
        }
        if(that.data.managerstate == 1){
            if(this.data.selectId == ''){
                wx.showModal({
                    title: '提示',
                    content: '请输入选择一个经理',
                    showCancel: false
                })
                return
            }
        }
        if(that.data.type == 1){
           
            if(message == ''){
                wx.showModal({
                    title: '提示',
                    content: '请输入留言',
                    showCancel: false
                })
                return
            }
        }
 
        if(that.data.type == 2 && that.data.managerstate == 1){
            wx.setStorageSync("toid", fid)
            request({
                url: "SubmitLawOrder",
                data: {
                    type: 'jslt',
                    law_id: that.data.law_id,
                    price: 0.00,
                    user_id: app.userInfo.id || wx.getStorageSync("userInfo").id,
                    fid:fid
                },
                success: function(e) {
                    wx.hideLoading(), e ? g.setData({
                        order_id: e.order_id
                    }, function() {
                        0 < parseFloat(g.data.price) ? pay(g.data.order_id) : result("成功", "订单提交成功", that.data.type);
                    }) : wx.showToast({
                        icon: "none",
                        title: "提交失败:" + e
                    });
                }
            });
        }else{
            request({
                url: "LawAdd",
                showLoading: !1,
                data: {
                    order_type: that.data.type,
                    law_id: that.data.law_id,
                    company_name: company_name,
                    company_phone: company_phone,
                    message: message,
                    code: code,
                    fid: fid,
                    user_id: g.data.userInfo.id
                },
                success: function (tbe) {
                    if (tbe.error == 0) {
                        wx.showModal({
                            title: '提示',
                            content: tbe.msg,
                            showCancel: false
                        })
    
                    } else if (tbe.error == 1) {
                        wx.showModal({
                            title: '提示',
                            content: tbe.msg,
                            showCancel: false
                        })
                        setTimeout(item => {
                            wx.navigateBack({
                                delta: 2 //返回上一级页面
                            })
                        }, 2000)
                    } else if (tbe.error == 2) {
                        wx.showModal({
                            title: '提示',
                            content: tbe.msg,
                            showCancel: false
                        })
                        console.log(tbe.phone);
                        setTimeout(item => {
                            wx.makePhoneCall({
                                phoneNumber: tbe.phone
                            })
                        }, 2000)
                        setTimeout(item => {
                            if (tbe.type == 0) {
                                wx.navigateTo({
                                    url: '/u_pages/user/my-order/index',
                                })
                            } else {
                                wx.navigateBack({
                                    delta: 2 //返回上一级页面
                                })
                            }
                        }, 4000)
                    }
    
                }
            });
        }
       


    },
    getCode() {

        var that = this;
        if (that.data.disabled == true) {
            return;
        }

        var company_phone = this.data.company_phone;
        if (company_phone == undefined) {
            var company_phone = that.data.tel;
        }
        if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(company_phone))) {

            wx.showModal({
                title: '提示',
                content: '手机号有误,请重新填写',
                showCancel: false
            })
            return
        }
        this.sendCode(company_phone);
    },
    sendCode(phone) {
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
            success: function (tbe) {
                console.log(tbe);
                if (tbe == 1) {
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
                } else {
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
});