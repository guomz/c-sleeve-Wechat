import {Sku} from '../model/sku'

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

    //与服务器同步购物车数据
    async refreshCartSkuWithServer(){
        const cartItems = this.getAllCartItems()
        if(cartItems.length == 0){
            return
        }
        //获取服务器数据
        const ids = cartItems.map(item => item.skuId)
        const skus = await Sku.getSkuByIds(ids)
        console.log(skus)
        //更新每个
        cartItems.forEach(cartItem => {
            this._refreshEach(cartItem, skus)
        })

        this._refreshCartData()
    }

    //同步每个购物车数据
    _refreshEach(cartItem, skus){
        let exist = false
        for(let sku of skus){
            if(sku.id == cartItem.skuId){
                cartItem.sku = sku
                exist = true
                break
            }
        }
        //商品不存在，即下架
        if(!exist){
            cartItem.sku.online = false
        }
    }

    //提交订单后清除购物车已选商品
    clearCheckedItems(){
        const cartItems = this.getAllCartItems()
        for(let i = 0; i < cartItems.length; i ++){
            let item = cartItems[i]
            if(item && item.checked){
                cartItems.splice(i,1)
                //减一避免移除元素后数组长度变化造成的遍历不完全
                i--
            }
        }
        this._refreshCartData()
    }

    //获取全部被选中的商品
    getAllCheckedItems(){
        const cartItems = this.getAllCartItems()
        const checkedItems = []
        cartItems.forEach(item => {
            if(item && item.checked){
                checkedItems.push(item)
            }
        })
        return checkedItems
    }

    //获取购物车全部商品
    getAllCartItems(){
        return this._getCartData().items
    }

    //获取购物车商品种类数量
    getAllItemsCount(){
        return this._getCartData().items.length
    }

    //修改指定购物车商品的购买数量
    changeItemCount(skuId, count){
        const cartItem = this.getCartItem(skuId)
        cartItem.count = count
        this._refreshCartData()
    }

    //更改某个商品的选中状态
    changeChecked(skuId, checked){
        const cartItem = this.getCartItem(skuId)
        cartItem.checked = checked
        this._refreshCartData()
    }

    //判断购物车商品是否都被选中
    isAllChecked(){
        const cartItems = this.getAllCartItems()
        for(let i in cartItems){
            if(!cartItems[i].checked){
                return false
            }
        }
        return true
    }

    //更改全部物品选中状态
    changeAllChecked(checked){
        const cartItems = this.getAllCartItems()
        for(let i in cartItems){
            cartItems[i].checked = checked
        }
        this._refreshCartData()
    }

    //向购物车添加商品
    addItem(cartItem){
        const currentItem = this.getCartItem(cartItem.skuId)
        if(currentItem){
            //存在则更新数量
            currentItem.count += cartItem.count
        }else{
            this.cartData.items.unshift(cartItem)
        }
        this._refreshCartData()
    }

    //删除购物车商品
    removeItem(skuId){
        const itemIndex = this.getCartItemIndex(skuId)
        if(itemIndex !== null){
            this.cartData.items.splice(itemIndex,1)
        }
        this._refreshCartData()
    }

    //获取购物车中的商品信息
    getCartItem(skuId){
        const cartItems = this._getCartData().items
        return cartItems.find(item => item.skuId == skuId) 
    }

    //获取购物车商品索引
    getCartItemIndex(skuId){
        const cartItems = this._getCartData().items
        return cartItems.findIndex(item => item.skuId == skuId) 
    }

    isEmpty(){
        const cartData = this._getCartData()
        if(cartData.items.length == 0){
            return true
        }
        return false
    }

    //获取购物车数据，若没有则读取缓存
    _getCartData(){
        if(this.cartData){
            return this.cartData
        }else{
            let cartData = wx.getStorageSync(Cart.CART_ITEMS_KEY);
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