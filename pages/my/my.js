import { CouponStatus, OrderStatus } from "../../core/enum"
import { Address } from "../../model/address"
import { Coupon } from "../../model/coupon"

// pages/my/my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        couponCount: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        const coupons = await Coupon.getMyCouponByStatus(CouponStatus.AVAILABLE)
        this.setData({
            couponCount: coupons.length
        })
    },

    //前往我的订单
    onGotoMyOrder(detail){
        wx.navigateTo({
            url: '/pages/my-order/my-order?status='+ OrderStatus.ALL,
        });
    },

    //前往我的优惠券
    onGotoMyCoupon(detail){
        wx.navigateTo({
            url: '/pages/my-coupon/my-coupon',
        });
    },

    //选择地址
    async onMgrAddress(detail){
        const res = await wx.chooseAddress({});
            if(res){
                this.setData({
                    address: res,
                    hasChosen: true
                })
                Address.setAddress(res)
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