// components/coupon/index.js
import {CouponStatus} from '../../core/enum'
import {CouponData} from './coupon-data'
import {Coupon} from '../../model/coupon'

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        coupon: Object,
        status: Number
    },

    /**
     * 组件的初始数据
     */
    data: {
        _coupon: Object,
        _status: CouponStatus.CAN_COLLECT,
        userCollected: false
    },

    observers: {
        'coupon': function (coupon) {
            console.log(coupon)
            if (!coupon) {
                return
            }
            this.setData({
                _coupon: new CouponData(coupon),
            })
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //领取优惠券
        async onGetCoupon(detail){
            //用户已领取则跳转至分类页面
            if(this.data.userCollected){
                wx.switchTab({
                    url: '/pages/category/category',
                });
                return
            }
            //领取优惠券
            const resp =await  Coupon.collectCoupon(this.properties.coupon.id)
            if (resp.code == 0) {
                wx.showToast({
                    title: '成功领取',
                    icon: 'none',
                    image: '',
                    duration: 1500,
                    mask: false,
                });
            }else{
                console.log('领取失败')
            }

            this.setData({
                userCollected: true,
                _status: CouponStatus.AVAILABLE
            })
        }
    }
})
