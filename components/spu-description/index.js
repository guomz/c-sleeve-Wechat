// components/spu-description/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        spu: Object
    },

    observers: {

        "spu": function(spu){
            if(spu && spu.tags){
                const tags = spu.tags.split('$')
                this.setData({
                    tags
                })
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
