// pages/my-order/my-order.js
import {OrderStatus} from '../../core/enum'
import { Order } from '../../model/order'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeKey: OrderStatus.ALL,
        empty: false,
        loadingType: 'loading',
        paging: null,
        items: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        //设置进入时选项卡位置
        const status = options.status
        this.setData({
            activeKey: status
        })
        await this.getOrderByStatus(status)

    },

    //选项卡切换事件
    async onSegmentChange(detail){
        const status = detail.detail.activeKey
        await this.getOrderByStatus(status)
    },

    //按照状态获取订单
    async getOrderByStatus(status){
        const paging = Order.getOrderByPage(status)
        const pagingData = await paging.getMoreData()
        this.setData({
            paging,
            items: pagingData.currentData,
            loadingType: pagingData.moreData?'loading': 'end'
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //刷新订单状态
        this.getOrderByStatus(this.data.activeKey)
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
    onReachBottom: async function () {
        const paging = this.data.paging
        if(paging.moreData){
            const pagingData = await paging.getMoreData()
            this.setData({
                paging,
                items: pagingData.currentData,
                loadingType: pagingData.moreData?'loading': 'end'
            })
        }else{
            this.setData({
                loadingType: 'end'
            })
        }
        
    },

    //支付成功回调监听
    onPaySuccess(detail){
        console.log(detail.detail)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})