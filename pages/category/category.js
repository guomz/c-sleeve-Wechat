// pages/category/category.js
import {getWindowHeightRpx} from '../../utils/system'
import {Category} from '../../model/category'
import {SpuListType} from '../../core/enum'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        segHeight: null,
        defaultRootId: 2,
        roots: [],
        subs: [],
        currentSubs: [],
        currentBannerImg: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        //设置左侧边栏长度
        this.setSegmentHeight()
        //获取全部分类
        const category = new Category()
        await category.initCategory()
        //获取默认分类
        const defaultRoot = this.getCurrentRoot(category.roots, this.data.defaultRootId)
        //获取默认分类的二级分类
        const currentSubs = this.getCurrentSubs(category.subs, this.data.defaultRootId)
        this.setData({
            roots: category.roots,
            subs: category.subs,
            currentBannerImg: defaultRoot.img,
            currentSubs
        })
    },

    //获取指定分类的二级分类
    getCurrentSubs(subs,rootId){
        return subs.filter(sub => sub.parent_id == rootId)
    },

    //获取当前主分类
    getCurrentRoot(roots,rootId){
        return roots.find(root => root.id == rootId)
    },

    //设置左侧栏高度
    async setSegmentHeight(){
        const windowHeight = await getWindowHeightRpx()
        this.setData({
            segHeight: windowHeight - 60-20-2
        })
    },

    //主分类点击事件
    onSegChange(detail){
        const rootId = detail.detail.activeKey
        const currentRoot = this.getCurrentRoot(this.data.roots, rootId)
        //获取对应的二级分类
        const currentSubs = this.getCurrentSubs(this.data.subs, rootId)
        this.setData({
            currentSubs,
            currentBannerImg: currentRoot.img
        })
    },

    //二级分类点击事件监听，跳转到商品列表
    onJumpToSpuList(detail){
        const subId = detail.detail.subId
        wx.navigateTo({
            url: `/pages/spu-list/spu-list?cid=${subId}&type=${SpuListType.SUB_CATEGORY}`
            
        });
    },

    //搜索框点击事件
    onGotoSearch(detail){
        wx.navigateTo({
            url: `/pages/search/search`
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
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})