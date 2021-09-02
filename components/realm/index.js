// components/realm/index.js
import {FenceGroup} from '../../model/fence-group'
import {Judger} from '../../model/judger'
import {Spu} from '../../model/spu'
import {Cart} from '../../model/cart'

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        spu: Object,
        orderWay: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        fences: [],
        judger: null,
        noSpec: false,
        currentCount: Cart.SKU_MIN_COUNT,
        stock: 0,
        outStock: false
    },

    observers: {
        'spu': function(spu){
            if(!spu){
                return
            }
            console.log(spu)
            //处理无规格商品
            if(Spu.hasNoSpecs(spu)){
                this.handleNoSpecsSpu(spu)
            }else{
                //处理含规格商品
                this.handleNormalSpu(spu)
                //处理已选或未选的规格
                this.handleSkuIntact()
            }
            //检查库存
            this.checkOutStock()
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {

        //处理无规格
        handleNoSpecsSpu(spu){
            this.bindSkuData(spu.sku_list[0])
            this.setData({
                noSpec: true
            })
            return
        },

        //处理有规格
        handleNormalSpu(spu){
            //处理含规格商品
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
        },

        //监听counter组件的数量变化
        onCounterChange(detail){
            console.log(detail.detail.count)
            const count = detail.detail.count
            this.setData({
                currentCount: count,
            })
            //检查库存
            this.checkOutStock()
        },

        //检查是否超库存
        checkOutStock(){
            this.setData({
                outStock: this.data.currentCount > this.data.stock
            })
        },

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
                discount: spu.discount_price,
                stock: spu.sku_list[0].stock
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
            if(skuIntact){
                //选中一组sku后展示图片
                const currentSku = judger.getCurrentSelectedSku()
                this.setData({
                    skuIntact,
                    currentValues: judger.getCurrentValues()
                })
                this.bindSkuData(currentSku)
            }else{
                this.setData({
                    skuIntact,
                    missingKeys: judger.getMissingKeys()
                })
            }
        },

        //点击cell事件监听
        onCellTap(detail){
            const cellInfo = detail.detail
            const judger = this.data.judger
            judger.judge(cellInfo.cell, cellInfo.x, cellInfo.y)
            this.setData({
                fences: judger.fenceGroup.fences
            })
            //判断是否选择了完整sku
            this.handleSkuIntact()
            //判断库存
            this.checkOutStock()
        }
    }
})
