// pages/detail/detail.js
import {Spu} from '../../model/spu'
import {ShoppingWay} from '../../core/enum'
import {SaleExplain} from '../../model/sale-explain'
import {getWindowHeightRpx} from '../../utils/system'
import {Cart} from '../../model/cart'
import {CartItem} from '../../model/cart-item'
import {Coupon} from '../../model/coupon'
import {CouponCenterType} from '../../core/enum'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        spu: null,
        showRealm: false,
        orderWay: null,
        skuIntact: null,
        currentValues: null,
        missingKeys: null,
        noSpec: false,
        explain: [],
        h: null,
        cartItemsCount: 0,
        coupons: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        const spu = await Spu.getSpuDetail(options.id)
        const explain = await SaleExplain.getSaleExplainText()
        const windowHeightRpx = await getWindowHeightRpx()
        const coupons = await Coupon.getTop2CouponsByCategory(spu.category_id)
        this.setData({
            spu,
            explain,
            h: windowHeightRpx- 100,
            coupons
        })
    },

    //前往优惠券页面
    onGoToCouponCenter(){
        wx.navigateTo({
            url: `/pages/coupon/coupon?cid=${this.data.spu.category_id}&type=${CouponCenterType.SPU_CATEGORY}`,
        });
    },

    //监听realm组件的购买或购物车事件
    onShopping(detail){
        const cart = new Cart()
        const sku = detail.detail.sku
        const count = detail.detail.count
        const orderWay = detail.detail.orderWay
        //如果realm中点击加入购物车则隐藏realm
        if(orderWay == ShoppingWay.CART){
            const newItem = new CartItem(sku, count)
            cart.addItem(newItem)
            //更新购物车商品数量
            this.setData({
                showRealm: false,
                cartItemsCount: cart.getAllItemsCount()
            })
        }else{

        }
    },

    //接收规格选择情况
    onSkuIntact(detail){
        this.setData({
            skuIntact: detail.detail.skuIntact,
            currentValues: detail.detail.currentValues,
            missingKeys: detail.detail.missingKeys,
            noSpec: detail.detail.noSpec
        })
    },

    onGoToHome(){
        wx.switchTab({
            url: '/pages/home/home'
        })
    },

    onGoToCart(){
        wx.switchTab({
            url: '/pages/cart/cart'
        })
    },

    //点击加入购物车或点击请选择时触发事件,弹出realm
    onAddToCart(){
        this.setData({
            showRealm: true,
            orderWay: ShoppingWay.CART
        })
    },

    //点击立即购买弹出realm
    onBuy(detail){
        this.setData({
            showRealm: true,
            orderWay: ShoppingWay.BUY
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
        //刷新购物车商品数量
        const cart = new Cart()
        this.setData({
            cartItemsCount: cart.getAllItemsCount()
        })
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