// components/tab-bar/tab-bar.js
const app = getApp() //全局对象
Component({
    data: {
    },
    properties: {
        selected: {
            type: Number,
            value: 0
        },
        color: {
            type: String,
            value: '#333333'
        },
        selectedColor: {
            type: String,
            value: '#000000'
        },
        fontSize: {
            type: Number,
            value: 26
        },
        borderStyle: {
            type: String,
            value: '#f6f6f6'
        },
        backgroundColor: {
            type: String,
            value: '#fff'
        },
        list: {
            type: Array,
            value: [{
                pagePath: "/u_pages/index/index",
                iconPath: "../assets/images/tabbar/home.png",
                selectedIconPath: "../assets/images/tabbar/_home.png",
                text: "首页"
            }, {
                pagePath: "/u_pages/index/index",
                iconPath: "../assets/images/tabbar/product.png",
                selectedIconPath: "../assets/images/tabbar/_product.png",
                text: "产品"
            }, {
                pagePath: "/u_pages/user/index",
                iconPath: "../assets/images/tabbar/user.png",
                selectedIconPath: "../assets/images/tabbar/_user.png",
                text: "我的"
            }]
        }
    },
    methods: {
        switchTab(e) {
            const {
                index,
                path
            } = e.currentTarget.dataset
            if (index === this.properties.selected) return
            wx.switchTab({
                url: path
            })
            this.showItem(index, path)
        },
        showItem(idx, path) {
            this.setData({
                selected: idx
            });
            const detail = {
                idx,
                path
            };
            const option = {
                bubbles: true,
                composed: true
            };
            this.triggerEvent('onTap', detail, option);
        }
    }
})