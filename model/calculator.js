import {accAdd,accMultiply} from '../utils/number'

class Calculator{

    checkedItems = []

    constructor(checkedItems){
        this.checkedItems = checkedItems
    }

    //计算选中的商品总数量
    getTotalCount(){
        let totalConut = 0
        this.checkedItems.forEach(item => {
            totalConut = accAdd(totalConut, item.count)
        })
        return totalConut
    }

    //计算总价格
    getTotalPrice(){
        let totalPrice = 0
        this.checkedItems.forEach(item => {
            let price = item.sku.discount_price?item.sku.discount_price:item.sku.price
            totalPrice = accAdd(totalPrice, accMultiply(item.count, price))
        })
        return totalPrice
    }
}

export {
    Calculator
}