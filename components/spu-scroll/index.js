// components/spu-scroll/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        theme: Object,
        spuList: Array
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
        //进入商品详情
        onTap(detail){
            const id = detail.currentTarget.dataset.id
            wx.navigateTo({
                url: '/pages/detail/detail?id='+ id,
            });
        },

        //前往主题页面
        onMore(detail){
            const themeName = this.properties.theme.name
            wx.navigateTo({
                url: '/pages/theme/theme?tname=' + themeName,
                success: (result)=>{
                    
                },
                fail: ()=>{},
                complete: ()=>{}
            });
        }
    }
})
