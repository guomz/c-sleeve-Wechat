import { Http } from '../utils/http'
import  {accMultiply} from '../utils/number'
import {accAdd} from '../utils/number'

class Order{

    orderItems=[]
    totalPrice

    constructor(orderItems){
        this.orderItems = orderItems
        this.totalPrice = orderItems.reduce((acc, cur) => {
            return accAdd(acc, cur.singleFinalTotalPrice)
        },0)
    }

    checkOrderIsOk(){
        this.orderItems.forEach(item => {
            item.isOk()
        })
    }

    getCategoryTotalPrice(categoryIds){
        //无分类则为全场券
        if(!categoryIds || categoryIds.length == 0){
            return this.totalPrice
        } 
        //符合分类的订单项
        const orderItemsInIds = this.orderItems
        .filter(orderItem => categoryIds.includes(orderItem.sku.category_id) 
        || categoryIds.includes(orderItem.sku.root_category_id))
        //得出总合
        return orderItemsInIds.reduce((acc, cur)=> {
            return accAdd(acc, cur.singleFinalTotalPrice)
        },0)
    }

    //下订单
    static async placeOrder(orderPost){
        return await Http.request({
            url: `/order`,
            data:orderPost,
            method: 'POST',
            refetch: true,
            throwError: true
        })
    }
}

export{
    Order
}