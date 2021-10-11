import {CouponType} from '../core/enum'
import { accMultiply,accSubtract } from '../utils/number'

class CouponBo{
    constructor(coupon) {
        this.type = coupon.type
        this.fullMoney = coupon.full_money
        this.rate = coupon.rate
        this.minus = coupon.minus
        this.id = coupon.id
        this.startTime = coupon.start_time
        this.endTime = coupon.end_time
        this.wholeStore = coupon.whole_store
        this.title = coupon.title
        this.satisfaction = false

        //Mark
        this.categories = coupon.categories
        this.categoryIds = coupon.categories.map(category => {
            return category.id
        })
    }

    //判断优惠券是否能使用
    meetCondition(order){
        let categoryTotalPrice = 0
        if(this.wholeStore){
            //全场券则为订单总价格
            categoryTotalPrice = order.totalPrice
        }else{
            //否则为分类计算的价格
            categoryTotalPrice = order.getCategoryTotalPrice(this.categoryIds)
        }

        let satisfaction = false
        switch (this.type) {
            case CouponType.FULL_MINUS:
            case CouponType.FULL_OFF:
                satisfaction = this._fullTypeCouponIsOK(categoryTotalPrice)
                break
            case CouponType.NO_THRESHOLD_MINUS:
                satisfaction = true
                break
            default:
                break
        }
        this.satisfaction = satisfaction
    }

    //判断满减满减折扣是否满足金额限定
    _fullTypeCouponIsOK(categoryTotalPrice) {
        if (categoryTotalPrice >= this.fullMoney) {
            return true
        }
        return false
    }

    //计算最终价格
    static getFinalPrice(order, couponObj) {
        if (couponObj.satisfaction === false) {
            throw new Error('优惠券不满足使用条件')
        }

        let finalPrice;

        switch (couponObj.type) {
            case CouponType.FULL_MINUS:
                return {
                    finalPrice: accSubtract(order.totalPrice, couponObj.minus),
                    discountMoney: couponObj.minus
                }
            case CouponType.FULL_OFF:
            case CouponType.NO_THRESHOLD_OFF:
                let actualPrice = accMultiply(order.totalPrice, couponObj.rate)
                finalPrice = CouponBo.roundMoney(actualPrice)
                return {
                    finalPrice,
                    discountMoney: accSubtract(order.totalPrice, finalPrice)
                }
            case CouponType.NO_THRESHOLD_MINUS:
                finalPrice = accSubtract(order.totalPrice, couponObj.minus)
                finalPrice = finalPrice < 0 ? 0 : finalPrice
                return {
                    finalPrice,
                    discountMoney: couponObj.minus
                }
            //  case CouponType.NO_THRESHOLD_OFF:
            //     let actualPrice = accMultiply(order.totalPrice, couponObj.rate)
            //     finalPrice = CouponBo.roundMoney(actualPrice)
            //     return {
            //         finalPrice,
            //         discountMoney: accSubtract(order.totalPrice, finalPrice)
            //     }
        }
    }

    static roundMoney(money) {
        // 对于小数的约束可能模式有4种：向上/向下取整、四舍五入、银行家模式
        // 前端算法模式必须同服务端保持一致，否则对于浮点数金额的运算将导致订单无法通过验证

        const final = Math.ceil(money * 100) / 100
        return final
    }
}

export{
    CouponBo
}