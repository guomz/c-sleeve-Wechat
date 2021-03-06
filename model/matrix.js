class Matrix{
    m = []

    constructor(m){
        this.m = m
    }

    _getRowNum(){
        return this.m.length
    }

    _getColumnNum(){
        return this.m[0].length
    }

    traverse(callback){
        for(let j = 0; j < this._getColumnNum(); j ++){
            for(let i = 0; i < this._getRowNum(); i ++){
                let element = this.m[i][j]
                callback(element, i, j)
            }
        }
    }

    traverseVer2(){
        const afterTraverseArr = []
        for(let j = 0; j < this._getColumnNum(); j ++){
            afterTraverseArr[j] = []
            for(let i = 0; i < this._getRowNum(); i ++){
                let element = this.m[i][j]
                afterTraverseArr[j][i] = element
            }
        }
        return afterTraverseArr
    }
}

export{
    Matrix
}