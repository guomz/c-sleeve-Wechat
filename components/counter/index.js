import {Cart} from '../../model/cart'

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        count:{
            type: Number,
            value: Cart.SKU_MIN_COUNT
        },
        min:{
            type: Number,
            value: Cart.SKU_MIN_COUNT
        },
        max:{
            type: Number,
            value: Cart.SKU_MAX_COUNT
        },
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
        //counter数值变化监听事件
        onChange(detail){
            this.triggerEvent("counterChange",{
                count: detail.detail.count
            },{
                bubbles:true,
                composed:true
            })
        },

        //数量超出可选范围
        onOut(detail){
            // console.log(this.data.max)
            // if(this.data.max == 0){
            //     return
            // }
            const type = detail.detail.type
            if(type == 'overflow_max'){
                wx.showToast({
                    title: '库存不足',
                    icon: 'none',
                    image: '',
                    duration: 3000,
                    mask: false,
                });
            }else{

            }
        }
    }
})
