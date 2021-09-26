import { Theme } from "../../model/theme"

// pages/theme-spu-list/theme-spu-list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        topImg: null,
        descriptions: [],

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        const themeName = options.tname
        const theme = new Theme()
        const themeWithSpu = await theme.getThemeSpuByName(themeName)
        this.setData({
            topImg: themeWithSpu.internal_top_img,
            descriptions: themeWithSpu.description.split('#')
        })
        if(themeWithSpu.spu_list){
            wx.lin.renderWaterFlow(themeWithSpu.spu_list)
        }
    },

    //图片加载
    onLoadImg(event) {
        const {height, width} = event.detail
        console.log(height,width)
        this.setData({
            h: height,
            w: width,
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