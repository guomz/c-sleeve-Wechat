class Cart{
    static SKU_MIN_COUNT=1
    static SKU_MAX_COUNT=999
    static CART_ITEMS_KEY = 'cart'

    cartData = null

    constructor() {
        if (typeof Cart.instance === 'object') {
            return Cart.instance
        }
        Cart.instance = this
        return this
    }

    //向购物车添加商品
    addItem(cartItem){
        const currentItem = this.getCartItem(cartItem.skuId)
        if(currentItem){
            //存在则更新数量
            currentItem.count += cartItem.count
        }else{
            this.cartData.unshift(cartItem)
        }
        this._refreshCartData()
    }

    //删除购物车商品
    removeItem(skuId){
        const itemIndex = this.getCartItemIndex(skuId)
        if(itemIndex){
            this.cartData.items.splice(itemIndex,1)
        }
        this._refreshCartData()
    }

    //获取购物车中的商品信息
    getCartItem(skuId){
        const cartItems = this._getCartData().items
        return cartItems.find(item => item.id == skuId) 
    }

    //获取购物车商品索引
    getCartItemIndex(skuId){
        const cartItems = this._getCartData().items
        return cartItems.findIndex(item => item.id == skuId) 
    }

    //获取购物车数据，若没有则读取缓存
    _getCartData(){
        if(this.cartData){
            return this.cartData
        }else{
            const cartData = wx.getStorageSync(Cart.CART_ITEMS_KEY);
            if(!cartData){
                cartData = {
                    items: []
                }
            }
            this.cartData = cartData
            return cartData;
        }
    }  
    
    //更新购物车缓存
    _refreshCartData(){
        wx.setStorageSync(Cart.CART_ITEMS_KEY, this.cartData);
    }
}

export{
    Cart
}