// components/hot-list/index.js
import {Banner} from '../../model/banner'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        banner: Object
    },

    observers: {
         'banner': function(banner){
             if(banner && banner.items && banner.items.length > 0){
                 const left = banner.items.find(item => item.name === 'left')
                 const rightTop = banner.items.find(item => item.name === 'right-top')
                 const rightBottom = banner.items.find(item => item.name === 'right-bottom')
                 this.setData({
                     left,
                     rightTop,
                     rightBottom
                 })
             }
         }
    },

    /**
     * 组件的初始数据
     */
    data: {
        left:null,
        rightTop:null,
        rightBottom:null
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onGotToTheme(detail){
            const themeName = detail.currentTarget.dataset.tname
            wx.navigateTo({
                url: '/pages/theme/theme?tname=' + themeName,
            });
        },

        onGotoDetail(detail){
            const keyword = detail.currentTarget.dataset.keyword
            const type = detail.currentTarget.dataset.type
            Banner.goToTarget(type, keyword)
        }
    }
})
