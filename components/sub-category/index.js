// components/sub-category/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        categories: Array,
        bannerImg: null
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTapGridItem(detail){
            this.triggerEvent('itemtap', {
                subId: detail.detail.key
            })
        }
    }
})
