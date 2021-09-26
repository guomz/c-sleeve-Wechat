// pages/my-coupon/my-coupon.js
import {Coupon} from '../../model/coupon'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        coupons: [],
        activeKey: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        const status = this.data.activeKey
        await this.getCouponsByStatus(status)
    },

    //切换选项卡
    async onSegmentChange(detail){
        const status = detail.detail.activeKey
        console.log(status)
        this.setData({
            activeKey: status
        })

        await this.getCouponsByStatus(status)
    },

    //按状态获取优惠券
    async getCouponsByStatus(status){
        const coupons = await Coupon.getMyCouponByStatus(status)
        this.setData({
            coupons
        })
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