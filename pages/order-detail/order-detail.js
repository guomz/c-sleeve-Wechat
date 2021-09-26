// pages/order-detail/order-detail.js
import { OrderStatus } from '../../core/enum'
import {Order} from '../../model/order'
import { OrderDetail } from '../../model/order-detail'
import { Joiner } from '../../utils/joiner'
import { accSubtract } from '../../utils/number'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order: null,
        orderItems: [],
        payBtnDisable: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        const orderId = options.oid
        const order = await Order.getOrderDetail(orderId)
        const orderDetail = new OrderDetail(order)
        //order.discountPrice = accSubtract(order.total_price, order.final_total_price)
        const orderItems = order.snap_items.map(snapItem => {
            return this.generateFakeOrderItem(snapItem)
        })
        this.setData({
            order: orderDetail,
            orderItems
        })
    },

    //生成订单商品对象
    generateFakeOrderItem(snapItem){
        const fakeItem = {
            count: snapItem.count,
            img: snapItem.img,
            skuId: snapItem.id,
            singleFinalPrice: snapItem.single_price,
            singleFinalTotalPrice: snapItem.final_price,
            specValuesText: this.getValuesText(snapItem.spec_values)
        }

        return fakeItem
    },

    //规格值数组
    getValuesText(specValues){
        if(!specValues){
            return
        }
        const joiner = new Joiner(',')
        specValues.forEach(value => {
            joiner.join(value)
        })
        return joiner.getStr()
    },

    //支付
    onPay(detail){
        try{
            //成功则跳转至订单详情
            const payResult = Order.payOrder(this.data.order.id)
            this.setData({
                payBtnDisable: true
            })
            wx.redirectTo({
                url: '/pages/pay-success/pay-success?oid=' + this.data.order.id,
            });
        }catch(e){
            //发生失败
            console.log('error: ' + e)
            this.setData({
                orderFail: true,
                orderFailMsg: e.message,
                payBtnDisable: true
            })
            //跳转到我的订单
            wx.redirectTo({
                url:"/pages/my-order/my-order?status=" + OrderStatus.UNPAID
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