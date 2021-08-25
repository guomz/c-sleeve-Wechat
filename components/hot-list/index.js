// components/hot-list/index.js
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

    }
})
