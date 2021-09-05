// components/spu-preview-r/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        data: Object
    },

    observers: {
        'data': function(data){
            if(data && data.tags){
                this.setData({
                    tags: data.tags.split('$')
                })
            }
            
        }
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
        onTap(event){
            wx.navigateTo({
                url: `/pages/detail/detail?id=${event.currentTarget.dataset.id}`
                
            });
        }
    }
})
