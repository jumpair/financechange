// pages/product/product-detail/index.js
var g, app = getApp(), _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (e[r] = a[r]);
    }
    return e;
}, page = app.page, request = app.util.request, route = app.route;

page({
    data: {
        checked: 0, //复选框
        orderList:[
            {
                "icon":"../../../assets/images/tel.png",
                "text1":"电话咨询",
                "text2":"电话咨询，快速响应"
            },
            {
                "icon":"../../../assets/images/image.png",
                "text1":"图文咨询",
                "text2":"图文咨询，详细描述"
            },
            {
                "icon":"../../../assets/images/online.png",
                "text1":"在线咨询",
                "text2":"在线咨询，实时回复"
            }
        ]
    },
    onLoad: function(e) {
     console.log(e);
    g = this;
    request({
        url: "FinanceInfo",
        data: {
            userid: e.user_id,
            law_id:e.law_id          
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
    /**
     * 组件的方法列表
     */
    goProdetail(e){
        
        var finance_num = e.currentTarget.dataset.num;
        console.log(finance_num)
    if(finance_num == 1){
        var that = this;
        wx.navigateTo({
            url: '/u_pages/lawyer/info?id='+ e.currentTarget.dataset.id+'&fid='+e.currentTarget.dataset.fid
        })
        }else{
        wx.navigateTo({
            url: '/u_pages/product/product-finance/index?id='+e.currentTarget.dataset.id,
        
        })
        }
  },
   
});
