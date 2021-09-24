// pages/spu-list/spu-list.js
import {Paging} from '../../utils/paging'
import {SpuPaging} from '../../model/spu-paging'
import {SpuListType} from '../../core/enum'


Page({

    /**
     * 页面的初始数据
     */
    data: {
        loadMoreType: 'loading',
        paging: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        const cid = options.cid
        const type = options.type
        const isRoot = (type == SpuListType.SUB_CATEGORY? false:true)
        const paging = SpuPaging.getCategorySpuPaging(cid, isRoot)
        const pagingData = await paging.getMoreData()
        if (pagingData) {
            wx.lin.renderWaterFlow(pagingData.items)
        }
        this.setData({
            paging,
            loadMoreType: paging.moreData? 'loading':'end'
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
    async onReachBottom(){ 
        let paging = this.data.paging
        if(paging.moreData){
            let newPaging = await paging.getMoreData()
            wx.lin.renderWaterFlow(newPaging.items)
            if(!paging.moreData){
                this.setData({
                    loadMoreType: 'end'
                })
            }
        }else{
            this.setData({
                loadMoreType: 'end'
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})