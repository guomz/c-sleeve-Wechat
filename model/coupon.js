import {Http} from '../utils/http'

class Coupon{

    static async collectCoupon(id){
        return await Http.request({
            url: `/coupon/collect/${id}`,
            data: null,
            method: 'POST'
        })
    }

    static async getMyCouponsWithCategory(){
        return await Http.request({
            url: `/coupon/myself/available/with_category`
        })
    }

    static async getWholeStoreCoupons() {
        return await Http.request({
            url: `/coupon/whole_store`
        })
    }

    static async getCouponsByCategory(cid) {
        return await Http.request({
            url: `/coupon/by/category/${cid}`,
        })
    }

    static async getTop2CouponsByCategory(cid) {
        let coupons = await Http.request({
            url: `/coupon/by/category/${cid}`,
        })
        if (coupons.length === 0) {
            const otherCoupons = await Coupon.getWholeStoreCoupons()
            return Coupon.getTop2(otherCoupons)
        }
        if (coupons.length >= 2) {
            return coupons.slice(0, 2)
        }
        if (coupons.length === 1) {
            const otherCoupons = await Coupon.getWholeStoreCoupons()
            coupons = coupons.concat(otherCoupons)
            return Coupon.getTop2(coupons)
        }
    }

    static getTop2(coupons) {
        if (coupons.length === 0) {
            return []
        }
        if (coupons.length >= 2) {
            return coupons.slice(0, 2)
        }
        if (coupons.length === 1) {
            return coupons
        }
        return []
    }
}

export{
    Coupon
}