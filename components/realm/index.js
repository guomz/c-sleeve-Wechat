// components/realm/index.js
import {FenceGroup} from '../../model/fence-group'
import {Judger} from '../../model/judger'
import {Spu} from '../../model/spu'

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
        judger: null,
        noSpec: false
    },

    observers: {
        'spu': function(spu){
            if(!spu){
                return
            }
            console.log(spu)
            //处理无规格商品
            if(Spu.hasNoSpecs(spu)){
                this.bindSkuData(spu.sku_list[0])
                this.setData({
                    noSpec: true
                })
                return
            }
            const fenceGroup = new FenceGroup(spu, spu.sku_list)
            fenceGroup.initFences()
            //初始化sku选择框与路径，如果有默认sku则初始化默认sku选择状态
            const judger = new Judger(fenceGroup)
            this.bindInitData(judger, fenceGroup)
            //处理有默认sku显示sku信息，无则显示spu信息
            const defaultSku = fenceGroup.getDefaultSku()
            if(defaultSku){
                this.bindSkuData(defaultSku)
            }else{
                this.bindSpuData()
            }
            this.handleSkuIntact()
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        bindInitData(judger, fenceGroup){
            this.setData({
                judger,
                fences: fenceGroup.fences
            })
        },

        bindSpuData(){
            const spu = this.properties.spu
            this.setData({
                previewImg: spu.img,
                title: spu.title,
                price: spu.price,
                discount: spu.discount_price
            })
        },

        bindSkuData(sku){
            this.setData({
                previewImg: sku.img,
                title: sku.title,
                price: sku.price,
                discount: sku.discount_price,
                stock: sku.stock
            })
        },

        //处理规格选择提示
        handleSkuIntact(){
            const judger = this.data.judger
            const skuIntact = judger.isSkuIntact()
            console.log(skuIntact)
            if(skuIntact){
                this.setData({
                    skuIntact,
                    currentValues: judger.getCurrentValues()
                })
            }else{
                this.setData({
                    skuIntact,
                    missingKeys: judger.getMissingKeys()
                })
            }
        },

        onCellTap(detail){
            const cellInfo = detail.detail
            const judger = this.data.judger
            judger.judge(cellInfo.cell, cellInfo.x, cellInfo.y)
            this.setData({
                fences: judger.fenceGroup.fences
            })
            //判断是否选择了完整sku
            this.handleSkuIntact()
        }
    }
})
