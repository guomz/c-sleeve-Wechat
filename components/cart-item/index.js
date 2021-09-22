// components/cart-item/index.js
import {Cart} from '../../model/cart'
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
        discountPrice: null,
        stock: Cart.SKU_MAX_COUNT,
        count: Cart.SKU_MIN_COUNT
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
            const count = cartItem.count
            const stock = cartItem.sku.stock
            this.setData({
                checked: cartItem.checked,
                online,
                soldOut,
                discount,
                price,
                discountPrice,
                count,
                stock
            })
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //点击选择框触发事件
        onSelect(detail){
            this.setData({
                checked: detail.detail.checked
            })
            //传递给cart页面处理全选逻辑
            this.triggerEvent('selectSingle',{
                skuId: this.properties.cartItem.skuId,
                checked:detail.detail.checked
            })
        },

        //数量选择器点击事件
        onCounterChange(detail){
            const count = detail.detail.count
            const cart = new Cart()
            this.properties.cartItem.count = count
            this.setData({
                count
            })
            //更新缓存中的count
            const currentItem = cart.getCartItem(this.properties.cartItem.skuId)
            currentItem.count = count
        },

        //滑动删除按钮监听
        onDelete(detail){
            //从购物车删除
            const skuId = this.properties.cartItem.skuId
            const cart = new Cart()
            cart.removeItem(skuId)
            this.setData({
                cartItem: null
            })
            //传递事件
            this.triggerEvent('itemDelete',{
                skuId
            },{ bubbles: true })
        }
    }
})
