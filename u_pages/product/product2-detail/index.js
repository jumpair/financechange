// pages/product/product-detail/index.js
var g, app = getApp(), page = app.page, request = app.util.request, route = app.route;
Component({
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
 onLoad(){
    console.log(1)
 },
    /**
     * 组件的属性列表
     */
    properties: {

    },
    /**
     * 组件的方法列表
     */
    methods: {
        /**
         * 复选框
         */
        onChange(e) {
            var sb = e.target.dataset.index;
            this.setData({
                checked: sb
            });
        },
    }
})