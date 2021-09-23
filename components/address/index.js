// components/address/index.js
import {Address} from '../../model/address'
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        hasChosen: false,
        address: null
    },

    lifetimes:{
        //组件初始化执行
        attached(){
            const address = Address.getAddress()
            this.setData({
                hasChosen: address? true:false,
                address
            })
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {

        //选择地址
        async onChooseAddress(){
            const res = await wx.chooseAddress({});
            this.setData({
                address: res,
                hasChosen: true
            })
            Address.setAddress(res)
        },
    }
})
