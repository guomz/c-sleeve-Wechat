// components/order-sku-item/index.js
Component({
    /**
     * 组件的属性列表
     */
     externalClasses:['l-class'],
    properties: {
        orderItem: Object
    },

    /**
     * 组件的初始数据
     */
    data: {
        specValuesText:null
    },

    observers:{
        'orderItem':function (orderItem) {
            if(orderItem){
                this.setData({
                    specValuesText: orderItem.specValuesText
                })
            }
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        
    }
})
