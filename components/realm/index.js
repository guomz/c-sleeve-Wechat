// components/realm/index.js
import {FenceGroup} from '../../model/fence-group'

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        spu: Object
    },

    /**
     * 组件的初始数据
     */
    data: {
        fences: []
    },

    observers: {
        'spu': function(spu){
            if(!spu){
                return
            }

            const fenceGroup = new FenceGroup(spu, spu.sku_list)
            fenceGroup.initFences()
            this.bindInitData(fenceGroup)
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        bindInitData(fenceGroup){
            this.setData({
                fences: fenceGroup.fences
            })
        }
    }
})
