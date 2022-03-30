// components/product-item/product-item.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        aaa:{
            type:Array,
            value:[]
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
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
               url: '../product/product-intro/index?user_id='+e.currentTarget.dataset.id,
           
             })
       },
    }
})
