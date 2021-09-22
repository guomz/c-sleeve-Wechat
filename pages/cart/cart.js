import {Cart} from '../../model/cart'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartItems: [],
        allChecked: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
         
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
        const cart = new Cart()
        console.log(cart)
        this.setData({
            cartItems: cart.getAllCartItems()
        })
    },

    //处理购物车中某个商品被选中/反选事件
    onSingleCheck(detail){
        const cart = new Cart()
        const skuId = detail.detail.skuId
        const checked = detail.detail.checked
        cart.changeChecked(skuId, checked)
        this.refreshAllCheckedStatus()
    },

    //全选复选框事件
    onSelectAll(detail){
        const cart = new Cart()
        const allChecked = detail.detail.checked
        cart.changeAllChecked(allChecked)
        //刷新状态
        this.refreshAllCheckedStatus()
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

    //监听cart-item删除事件
    onDeleteItem(detail){
        this.refreshAllCheckedStatus()
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