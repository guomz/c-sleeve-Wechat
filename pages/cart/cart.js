import {Cart} from '../../model/cart'
import {Calculator} from '../../model/calculator'
import { ShoppingWay } from '../../core/enum'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartItems: [],
        allChecked: true,
        totalPrice: 0,
        totalSkuCount: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //刷新服务器sku数据
        const cart = new Cart()
        cart.refreshCartSkuWithServer()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        const cart = new Cart()
        this.setData({
            cartItems: cart.getAllCartItems()
        })
        //刷新价格
        this.refreshCountAndPrice()
    },

    //处理购物车中某个商品被选中/反选事件
    onSingleCheck(detail){
        const cart = new Cart()
        const skuId = detail.detail.skuId
        const checked = detail.detail.checked
        cart.changeChecked(skuId, checked)
        this.refreshAllCheckedStatus()
        this.refreshCountAndPrice()
    },

    //全选复选框事件
    onSelectAll(detail){
        const cart = new Cart()
        const allChecked = detail.detail.checked
        cart.changeAllChecked(allChecked)
        //刷新状态
        this.refreshAllCheckedStatus()
        //刷新价格
        this.refreshCountAndPrice()
    },

    //刷新购物车物品与全选按钮状态
    refreshAllCheckedStatus(){
        const cart = new Cart()
        const allChecked = cart.isAllChecked()
        this.setData({
            allChecked: allChecked,
            cartItems: cart.getAllCartItems()
        })
    },

    //刷新总数量与价格
    refreshCountAndPrice(){
        const cart = new Cart()
        const calculator = new Calculator(cart.getAllCheckedItems())
        const totalCount = calculator.getTotalCount()
        const totalPrice = calculator.getTotalPrice()
        this.setData({
            totalPrice,
            totalSkuCount: totalCount
        })
    },

    //监听cart-item删除事件
    onDeleteItem(detail){
        this.refreshAllCheckedStatus()
        this.refreshCountAndPrice()
    },

    //调整counter事件监听
    onCountFloat(detail){
        this.refreshCountAndPrice()
    },

    //点击结算跳转到订单预览
    onSettle(){
        wx.navigateTo({
            url: `/pages/order/order?type=${ShoppingWay.CART}`,
        });
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