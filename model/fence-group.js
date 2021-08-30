import {Matrix} from '../model/matrix'
import {Fence} from '../model/fence'

class FenceGroup{
    spu
    skuList

    constructor(spu, skuList){
        this.spu = spu
        this.skuList = skuList
    }

    initFences(){
        const matrix = this._createMatrix()
        const fences = []
        let currentJ = -1
        matrix.traverse((element, i, j)=> {
            if(currentJ != j){
                currentJ = j
                fences[currentJ] = this._createFence(element)
            }
            fences[currentJ].pushValueTitle(element.value)
        })
        console.log(fences)
    }

    _createFence(element){
        const fence = new Fence()
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