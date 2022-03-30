var g, app = getApp(), page = app.page, request = app.util.request, route = app.route;

function getIndex() {
    request({
        url: "index",
        showLoading: !1,
        success: function(e) {
            console.log(e.law);
            g.setData({
                banner: e.banner,
                notice: e.notice,
                nav: e.nav,
                lawyer_list: e.law,
                news_list: e.new,
                dj_num:e.dj_num,
                cj_num:e.cj_num,
                cj_price:e.cj_price,
                users_num:e.users_num,
                user_num:e.user_num,
                catelist:e.cate

            }), app.indexData = e, wx.stopPullDownRefresh();
        }
    });
}

page({
    data: {
        new_tabbar:true,
    },
    onLoad: function(e) {
        g = this;
        
        getIndex();
        //获取状态栏高度
        let sysInfo = wx.getSystemInfoSync();
        let pageheight = sysInfo.safeArea.top + 'px';
        this.setData({
            statusHeight: pageheight,
            show_tabbar:false
        })
    },
     showbg() {
        this.setData({
            showWhiteBg: false
        })
    },
    scroll(e){
        if(e.detail.scrollTop>50){
            this.setData({
                showWhiteBg: true
            })
        }
    },
    onPullDownRefresh: function() {
        getIndex();
    },
    toNotice: function(e) {
        route({
            url: "notice",
            params: {
                i: e.currentTarget.dataset.index
            }
        });
    },
    toPage: function(e) {
        var a = e.currentTarget.dataset.item;
        /*route({
            url: a.url
        });*/
    },
    goUrl(e){
        var url = e.currentTarget.dataset.url;
        console.log(url);
        wx.navigateTo({
            url: url
          })
    },
    
    goNewsDetail(e){
        wx.navigateTo({
            url: '../index/successful-case-detail/index?id='+e.currentTarget.dataset.id
          })
    },
    goProdetail(e){
        var finance_num = e.currentTarget.dataset.num;
        if(finance_num == 1){
            wx.navigateTo({
                url: '/u_pages/lawyer/info?id='+ e.currentTarget.dataset.id+'&fid='+e.currentTarget.dataset.fid
            })
            }else{
            wx.navigateTo({
                url: '/u_pages/product/product-finance/index?id='+e.currentTarget.dataset.id,
            
            })
            }
    },
    goProIntro(e){
         console.log(e);
        wx.navigateTo({
            url: '../product/product-intro/index?user_id='+e.currentTarget.dataset.id+'&law_id='+e.currentTarget.dataset.lawid,
        
          })
    },
    onShareAppMessage: function(e) {
        return {
            title: g.data.system.xcx_name,
            path: g.route
        };
    },
    onShow: function() {
        app.indexData ? g.setData({
            banner: app.indexData.banner,
            notice: app.indexData.notice,
            nav: app.indexData.nav,
            lawyer_list: app.indexData.law,
            news_list: app.indexData.new
        }) : getIndex();
    }
});