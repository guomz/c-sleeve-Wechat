import {OrderException} from '../core/order-exception'
import {OrderExceptionType} from '../core/enum'
import {Joiner} from '../utils/joiner'

class OrderItem{

    finalPrice
    count=0
    sku
    skuId
    specValuesText=null

    constructor(checkedItem){
        this.sku = checkedItem.sku
        this.count = checkedItem.count
        this.skuId = checkedItem.skuId
        this.finalPrice = checkedItem.sku.discount_price? checkedItem.sku.discount_price:checkedItem.sku.price
        this.specValuesText = this._generateSpecValuesText(checkedItem.sku)
    }

    //判断库存
    isOk(){
        if(this.count > this.sku.stock){
            console.error(`商品${this.skuId}库存不足`)
            throw new OrderException('库存不足', OrderExceptionType.BEYOND_STOCK)
        }
    }

    //生成规格值字符串
    _generateSpecValuesText(sku){
        const joiner = new Joiner(',')
        sku.specs.forEach(spec => {
            joiner.join(spec.value)
        })
        return joiner.getStr()
    }
}

export{
    OrderItem
}