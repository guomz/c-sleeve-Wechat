import {Cart} from '../../model/cart'

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        count:{
            type: Number,
            value: Cart.SKU_MIN_COUNT
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        min: Cart.SKU_MIN_COUNT,
        max: Cart.SKU_MAX_COUNT
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
        }
    }
})
