// components/cart-item/index.js
import {CartItem} from '../../model/cart-item'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cartItem: Object,
    },

    /**
     * 组件的初始数据
     */
    data: {
        checked: Boolean,
        online: true,
        soldOut: true,
        discount: false,
        specStr: '',
        price: null,
        discountPrice: null
    },

    observers:{
        'cartItem': function(cartItem){
            if(!cartItem){
                return
            }
            //初始化购物车sku数据显示
            const online = cartItem.sku.online
            const soldOut = cartItem.sku.stock == 0?true:false
            const discount = cartItem.sku.discount_price? true: false
            const price = cartItem.sku.price
            const discountPrice = cartItem.sku.discount_price
            this.setData({
                checked: cartItem.checked,
                online,
                soldOut,
                discount,
                price,
                discountPrice
            })
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //点击选择框触发事件
        onSelect(detail){
            console.log(detail.detail)
            this.setData({
                checked: detail.detail.checked
            })
        },

        //数量选择器点击事件
        onCounterChange(detail){

        }
    }
})
