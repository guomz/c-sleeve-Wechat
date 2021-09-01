import {Matrix} from '../model/matrix'
import {Fence} from '../model/fence'

class FenceGroup{
    spu
    skuList=[]
    fences=[]

    constructor(spu, skuList){
        this.spu = spu
        this.skuList = skuList
    }

    initFences(){
        const matrix = this._createMatrix()
        const fences = []
        const AT = matrix.traverseVer2()
        for(let specs of AT){
            const fence = this._createFence(specs)
            fence.init()
            fences.push(fence)
        }
        this.fences = fences
    }

    getEach(callback){
        for(let i = 0; i < this.fences.length; i ++){
            for(let j = 0; j < this.fences[i].cells.length; j ++){
                callback(this.fences[i].cells[j], i, j)
            }
        }
    }

    getDefaultSku(){
        if(this.spu.default_sku_id){
            return this.skuList.find(sku => sku.id === this.spu.default_sku_id)
        }
        return null
    }

    _createFence(specs){
        const fence = new Fence(specs)
        return fence
    }

    _createMatrix(){
        const m = []
        for(let sku of this.skuList){
            m.push(sku.specs)
        }
        return new Matrix(m)
    }
}

export{
    FenceGroup
}