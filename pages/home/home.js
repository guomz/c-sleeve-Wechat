// pages/home/home.js
import {Theme} from '../../model/theme'
import {Banner} from '../../model/banner'
import {Category} from '../../model/category'
import {Activity} from '../../model/activity'
import {SpuPaging} from '../../model/spu-paging'
import {Paging} from '../../utils/paging'


Page({

    /**
     * 页面的初始数据
     */
    data: {
        topThemeA:null,
        topThemeE:null,
        topThemeF:null,
        bannerG:null,
        topThemeH: null,
        themeESpuList:[],
        bannerB: null,
        categoryGrid: [],
        activityD: null,
        latestPaging:null,
        loadMoreType: 'loading'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        await this.initHomeData()
    },

    async initHomeData(){
        var theme = new Theme()
        await theme.getThemes()
        var topThemeA = theme.getHomeLocationA()
        var topThemeE = theme.getHomeLocationE()
        var topThemeF = theme.getHomeLocationF()
        var bannerG = await Banner.getHomeLocationG()
        var topThemeH = theme.getHomeLocationH()
        var themeEWithSpu = await theme.getHomeLocationEWithSpu()
        var themeESpuList = []
        if(themeEWithSpu){
            themeESpuList = themeEWithSpu.spu_list.slice(0,8)
        }
        var bannerB = await Banner.getHomeLocationB()
        var categoryGrid = await Category.getHomeLocationC()
        var activityD = await Activity.getHomeLocationD()

        await this.initBottomSpuList()

        this.setData({
            topThemeA,
            topThemeE,
            topThemeF,
            bannerG,
            topThemeH,
            themeESpuList,
            bannerB: bannerB,
            categoryGrid,
            activityD
        })
    },

    async initBottomSpuList(){
        let latestPaging = SpuPaging.getLatestPaging()
        let pagingData = await latestPaging.getMoreData()
        if(!pagingData){
            return
        }
        wx.lin.renderWaterFlow(pagingData.items)
        this.setData({
            paging: latestPaging
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
    onReachBottom: async function () {
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