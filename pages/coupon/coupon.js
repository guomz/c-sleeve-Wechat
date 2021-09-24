// pages/coupon/coupon.js
import {Activity} from '../../model/activity'
import {CouponCenterType} from '../../core/enum'
import {Coupon} from '../../model/coupon'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        coupons: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        const themeName = options.theme
        const type = options.type
        const cid = options.cid
        //获取活动的优惠券
        if (type == CouponCenterType.ACTIVITY) {
            const activity = await Activity.getActivityWithCouponByName(themeName)
            this.setData({
                coupons: activity.coupons
            })
        }else{
            //获取分类的优惠券
            const categoryCoupons = await Coupon.getCouponsByCategory(cid)
            //全场券
            const wholeStoreCoupons = await Coupon.getWholeStoreCoupons()
            let coupons = this.data.coupons
            coupons = coupons.concat(categoryCoupons, wholeStoreCoupons)
            //展示分类券与全场券
            this.setData({
                coupons
            })
        }
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})