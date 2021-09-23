import {Cart} from '../../model/cart'
import { OrderItem } from '../../model/order-item'
import { Order } from '../../model/order'

const cart = new Cart()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderItems:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        //请求服务器更新数据，得到被选中的
        await cart.refreshCartSkuWithServer()
        const checkedItems = cart.getAllCheckedItems()
        const orderItems = this.generateOrderItems(checkedItems)
        const order = new Order(orderItems)
        this.setData({
            orderItems
        })
    },

    //生成订单商品
    generateOrderItems(checkedItems){
        const orderItems = []
        checkedItems.forEach(item => {
            let orderItem = new OrderItem(item)
            orderItems.push(orderItem)
        })
        return orderItems
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