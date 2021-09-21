class CartItem{

    sku = null
    skuId = null
    count = 0
    checked = true

    constructor(sku, count){
        this.sku = sku
        this.skuId = sku.id
        this.count = count
    }
}

export{
    CartItem
}