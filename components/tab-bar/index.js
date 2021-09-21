// components/tab-bar/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cartItemCount: Number
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
        onGoToHome(){
            this.triggerEvent('gotohome')
        },

        onGoToCart(){
            this.triggerEvent('gotocart')
        },

        onAddToCart(){
            this.triggerEvent('addtocart')
        },

        onBuy(detail){
            this.triggerEvent('buy')
        }
    }
})
