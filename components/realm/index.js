// components/realm/index.js
import {FenceGroup} from '../../model/fence-group'
import {Judger} from '../../model/judger'

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
        fences: [],
        judger: null
    },

    observers: {
        'spu': function(spu){
            if(!spu){
                return
            }

            const fenceGroup = new FenceGroup(spu, spu.sku_list)
            fenceGroup.initFences()
            this.bindInitData(fenceGroup)

            const judger = new Judger(fenceGroup)
            this.setData({
                judger
            })
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
        },

        onCellTap(detail){
            const cellInfo = detail.detail
            const judger = this.data.judger
            judger.judge(cellInfo.cell, cellInfo.x, cellInfo.y)
            this.setData({
                fences: judger.fenceGroup.fences
            })
        }
    }
})
