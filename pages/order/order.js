import {Cart} from '../../model/cart'
import { OrderItem } from '../../model/order-item'
import { Order } from '../../model/order'
import {Coupon} from '../../model/coupon'
import {CouponBo} from '../../model/coupon-bo'
import { OrderPost } from '../../model/order-post'
import { ShoppingWay } from '../../core/enum'
import { Sku } from '../../model/sku'
import { CartItem } from '../../model/cart-item'

const cart = new Cart()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: null,
        order: null,
        currentCoupon: null,
        orderItems:[],
        couponBos: [],
        totalPrice: 0,
        discountMoney: 0,
        finalTotalPrice: 0,
        isOk: true,
        orderFail: false,
        orderFailMsg: '生成订单失败',
        submitBtnDisable: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        const type= options.type
        let orderItems = []
        if(type == ShoppingWay.BUY){
            //立即购买
            const skuId = options.skuId
            const count = options.count
            //查询服务器获取sku
            const skus = await Sku.getSkuByIds(skuId)
            const sku = skus[0]
            const orderItem = new OrderItem(new CartItem(sku, count))
            orderItems.push(orderItem)
        }else{
            //购物车
            //请求服务器更新数据
            await cart.refreshCartSkuWithServer()
            const checkedItems = cart.getAllCheckedItems()
            orderItems = this.generateOrderItems(checkedItems)
        }
        
        const order = new Order(orderItems)
        try{
            //进行订单物品库存判断
            order.checkOrderIsOk()
        }catch(e){
            this.setData({
                isOk: false
            })
        }
        const coupons = await Coupon.getMyCouponsWithCategory()
        const couponBos = coupons.map(coupon => {
            let couponBo = new CouponBo(coupon)
            //进行优惠券能否使用的判断
            couponBo.meetCondition(order)
            return couponBo
        })
        this.setData({
            order,
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
            const priceResult = CouponBo.getFinalPrice(this.data.order, currentCoupon)
            this.setData({
                finalTotalPrice: priceResult.finalPrice,
                discountMoney: priceResult.discountMoney,
                currentCoupon
            })
        }
    },

    //选择地址
    onChooseAddress(detail){
        this.setData({
            address: detail.detail.address
        })
    },

    //提交订单
    async onSubmit(detail){
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

        const skuInfoList = this.data.orderItems.map(orderItem => {
            return {
                id: orderItem.skuId,
                count: orderItem.count
            }
        })
        const order = this.data.order
        const currentCoupon = this.data.currentCoupon
        const orderPost = new OrderPost(order.totalPrice, this.data.finalTotalPrice, 
            currentCoupon? currentCoupon.id: null, skuInfoList, this.data.address)
        //执行下单请求
        try{
            const placeResult = await Order.placeOrder(orderPost)
            console.log(placeResult)
            //下单后禁用提交订单按钮
            this.setData({
                submitBtnDisable: true
            })
            //跳转到成功页面
            wx.redirectTo({
                url: '/pages/pay-success/pay-success',
            });
        }catch(e){
            //生成订单失败报错
            console.log(e)
            this.setData({
                orderFail: true,
                orderFailMsg: e.message,
                submitBtnDisable: true
            })
            //跳转到我的订单
            wx.redirectTo({
                url:"/pages/my-order/my-order"
            })
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