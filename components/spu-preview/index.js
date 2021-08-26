// components/spu-preview/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        data:Object
    },

    observers: {
        'data': function(data){
            if(data && data.tags){
                this.data.tags = data.tags.split('$')
            }
            
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        tags: []
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
