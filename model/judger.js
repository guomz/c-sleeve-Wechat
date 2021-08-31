import {SkuCode} from './sku-code'

class Judger{
    fenceGroup
    pathDict=[]

    constructor(fenceGroup){
        this.fenceGroup = fenceGroup
        this._initPathDict()
        console.log(this.pathDict)
    }

    _initPathDict(){
        this.fenceGroup.skuList.forEach(sku => {
            const skuCode = new SkuCode(sku.code)
            this.pathDict = this.pathDict.concat(skuCode.segments)
        })
    }

    judge(cell, x, y){
        this.fenceGroup.fences[x].cells[y].changeStatus()
    }
}

export{
    Judger
}