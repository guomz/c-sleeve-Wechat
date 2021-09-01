import {combination} from '../utils/util'

class SkuCode{
    code
    spuId
    segments=[]
    codeArr=[]

    constructor(code){
        this.code = code
        this._splitToSegment()
        this._initSegmentSet()
    }

    _splitToSegment(){
        const spuIdAndCode = this.code.split('$')
        this.spuId = spuIdAndCode[0]
        const codeArr = spuIdAndCode[1].split('#')
        for(let i = 1; i <= codeArr.length; i ++){
            //得出全部规格的排列组合
            const segment = combination(codeArr, i)
            //将组合用#连接
            const tempArr = []
            segment.forEach(item => {
                tempArr.push(item.join('#'))
            })
            //收集当前sku的所有组合
            this.segments = this.segments.concat(tempArr)
        }
    }

    _initSegmentSet(){
        const spuIdAndCode = this.code.split('$')
        const codeArr = spuIdAndCode[1].split('#') 
        this.codeArr = codeArr
    }
}

export{
    SkuCode
}