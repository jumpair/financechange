// components/person/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list:{
            type:Array,
            value:[]
        },
        id:{
            type:Number,
            value:0 
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        id:"",
        name:'',
        tel:''
    },
    ready(){
        this.initlist()
    },
    /**
     * 组件的方法列表
     */
    methods: {
        initlist(){
            let list = this.data.list
            let id = 0
            for(let i = 0;i<this.data.list.length;i++){
                list[i]['drop'] = false
                if(i == 0){
                    id =  list[i].id
                }
            }
            this.setData({
                list,
                nameid:id

            })
        },
        select(e){
            let index = e.currentTarget.dataset.index;
            let boolean = e.currentTarget.dataset.id;
            let tel = e.currentTarget.dataset.tel;
            let name = e.currentTarget.dataset.name;
            let userid = e.currentTarget.dataset.userid;
            this.setData({
                id:boolean,
                name:name,
                tel:tel,
                userid:userid,
            })
            this.handleTap()
        },
        drop(e){
            let index = e.currentTarget.dataset.index;
            let boolean = e.currentTarget.dataset.drop;
            let list = this.data.list;
            list[index].drop = !boolean;
            this.setData({
                list
            })
        },
        handleTap(){
            let arr = {id:this.data.id,tel:this.data.tel,name:this.data.name,userid:this.data.userid};
            this.triggerEvent('myevent',{params: arr},{})
        }
    }
})
