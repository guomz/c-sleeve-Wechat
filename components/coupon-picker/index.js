// components/coupon-picker/index.js
import {getSlashYMD} from '../../utils/date'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        couponBos: Array
    },

    /**
     * 组件的初始数据
     */
    data: {
        _coupons: [],
        satisfactionCount: 0
    },

    observers: {
        'couponBos': function (couponBos) {
            if (couponBos.length === 0) {
                return
            }
            const couponsView = this.convertToView(couponBos)
            const satisfactionCount = this.getSatisfactionCount(couponBos)
            console.log(couponsView)
            this.setData({
                _coupons: couponsView,
                satisfactionCount: satisfactionCount? satisfactionCount:0
            })
        }
    },


    /**
     * 组件的方法列表
     */
    methods: {
        convertToView(couponBos) {
            const couponsView = couponBos.map(coupon => {
                return {
                    id: coupon.id,
                    title: coupon.title,
                    startTime: getSlashYMD(coupon.startTime),
                    endTime: getSlashYMD(coupon.endTime),
                    satisfaction: coupon.satisfaction
                }
            })
            couponsView.sort((a, b) => {
                if (a.satisfaction) {
                    return -1
                }
            })
            return couponsView
        },

        //计算能够使用的优惠券数量
        getSatisfactionCount(couponBos){
            return couponBos.filter(couponBo => couponBo.satisfaction == true).length
        },

        //单选框点击事件
        onChange(detail){
            const checked = detail.detail.checked
            const couponId = detail.detail.key
            this.triggerEvent('choose', {
                couponId,
                checked
            })
        }
    }
})
