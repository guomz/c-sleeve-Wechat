import {Search} from '../../model/search'
import {HistoryKeyword} from '../../model/history-keyword'
import {Tag} from  '../../model/tag'

const historyKeyword = new HistoryKeyword()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        search: false,
        items: [],
        historyTags: [],
        hotTags: [],
        loadingType: 'loading',
        paging: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        const historyTags = historyKeyword.get()
        const hotTags = await Tag.getSearchTags()
        this.setData({
            historyTags,
            hotTags: hotTags
        })
    },

    //点击搜索触发事件
    async onSearch(detail){
        const keyword = detail.detail.value || detail.detail.name
        //防止空输入
        if(!keyword || keyword.length === 0 || keyword.match(/^[ ]*$/)){
            return
        }
        //刷新搜索历史
        historyKeyword.set(keyword)
        //请求搜索
        const paging = Search.doSearch(keyword)
        const searchResult = await paging.getMoreData()
        this.setData({
            historyTags: historyKeyword.get(),
            search: true,
            items: searchResult.currentData,
            paging,
            loadingType: paging.moreData? 'loading':'end'
        })

    },

    //取消搜索
    onCancel(){
        this.setData({
            search: false,
            items: []
        })
    },

    //清空搜索历史
    onDeleteHistory(){
        historyKeyword.clear()
        this.setData({
            historyTags: []
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: async function () {
        const paging = this.data.paging
        if(paging && paging.moreData){
            const searchResult = await paging.getMoreData()
            this.setData({
                items: searchResult.currentData
            })
            if(!paging.moreData){
                this.setData({
                    loadingType: 'end'
                })
            }
        }else{
            this.setData({
                loadingType: 'end'
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})