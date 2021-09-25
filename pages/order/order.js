import {Cart} from '../../model/cart'
import { OrderItem } from '../../model/order-item'
import { Order } from '../../model/order'
import {Coupon} from '../../model/coupon'
import {CouponBo} from '../../model/coupon-bo'

const cart = new Cart()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: null,
        orderItems:[],
        couponBos: [],
        totalPrice: 0,
        discountMoney: 0,
        finalTotalPrice: 0
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
        const coupons = await Coupon.getMyCouponsWithCategory()
        const couponBos = coupons.map(coupon => {
            let couponBo = new CouponBo(coupon)
            //进行优惠券能否使用的判断
            couponBo.meetCondition(order)
            return couponBo
        })
        this.setData({
            orderItems,
            couponBos,
            totalPrice: order.totalPrice,
            finalTotalPrice: order.totalPrice
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

    //监听优惠券的选择
    onChooseCoupon(detail){
        console.log(detail.detail)
        const couponId = detail.detail.couponId
        const checked = detail.detail.checked
        if(!checked){
            //未选择优惠券
            this.setData({
                discountMoney: 0,
                finalTotalPrice: this.data.totalPrice
            })
        }else{
            const couponBos = this.data.couponBos
            const currentCoupon = couponBos.find(couponBo => couponBo.id == couponId)
            if(!currentCoupon.satisfaction){
                return
            }
            //计算优惠后金额

        }
    },

    //选择地址
    onChooseAddress(detail){
        this.setData({
            address: detail.detail.address
        })
    },

    //提交订单
    onSubmit(detail){
        const address = this.data.address
        if(!address){
            wx.showToast({
                title: '请选择地址',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
            });
            return
        }

        
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