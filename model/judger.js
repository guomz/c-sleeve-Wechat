import {SkuCode} from './sku-code'
import {SkuPending} from './sku-pending'
import {CellStatus} from '../core/cell-status'
import {Joiner} from  '../utils/joiner'
import {ArrayUtil} from  '../utils/array-util'

class Judger{
    //规则矩阵
    fenceGroup
    pathDict=[]
    //存放选中的cell
    skuPending
    //二维数组，一维为每个可用规格的kv组合
    allSegmentList=[]

    constructor(fenceGroup){
        this.fenceGroup = fenceGroup
        this._initPathDict()
        this.skuPending = new SkuPending()
        // 检查是否有默认sku并初始化
        this._initDefaultSku()
    }

    //初始化默认sku选中状态
    _initDefaultSku(){
        //检查默认sku是否存在
        const defaultSku = this.fenceGroup.getDefaultSku()
        if(defaultSku){
            //执行若干次judge方法来达到默认sku的选中效果
            for(let spec of defaultSku.specs){
                this.fenceGroup.getEach((cell, i, j) => {
                    if(spec.key_id == cell.key_id && spec.value_id == cell.id){
                        this.judge(cell, i, j)
                    }
                })
            }
            
        }
    }

    //初始化路径字典
    _initPathDict(){
        this.fenceGroup.skuList.forEach(sku => {
            const skuCode = new SkuCode(sku.code)
            this.pathDict = this.pathDict.concat(skuCode.segments)
            this.allSegmentList.push(skuCode.codeArr)
        })
    }

    //判断当前是否选中了一组完整的sku
    isSkuIntact(){
        for(let fence of this.fenceGroup.fences){
            const existed = this.skuPending.getCellByKeyId(fence.id)
            if(!existed){
                return false
            }
        }
       
        return true
    }

    //获取当前选中的sku
    getCurrentSelectedSku(){
        const selectedCode = this.skuPending.getCurrentSkuCode()
        for(let sku of this.fenceGroup.skuList){
            if(sku.code.split('$')[1] == selectedCode){
                return sku
            }
        }
        return null
    }

    //获取当前选中的sku的规格
    getCurrentValues(){
        if(!this.isSkuIntact()){
            return null
        }
        const joiner = new Joiner(',')
        for(let cell of this.skuPending.pending){
            joiner.join(cell.spec.value)
        }
        return joiner.getStr()
    }

    //获取没被选中的规格
    getMissingKeys(){
        const joiner = new Joiner(',')
        for(let fence of this.fenceGroup.fences){
            const existed = this.skuPending.getCellByKeyId(fence.id)
            if(!existed){
                joiner.join(fence.value)
            }
        }
        return joiner.getStr()
    }

    //有cell被点击时调用
    judge(cell, x, y){
        this._changeCellStatus(cell, x, y)
        //1-42 2-56 ...
        const inputList = this.skuPending.generateCellCodeList()
        this._refreshAllCell(inputList)
    }

    //每次点击刷新全部cell的可选状态
    _refreshAllCell(inputList){
        let usableLineList=[]
        for(let fence of this.fenceGroup.fences){
            //得出每一行可选元素
            if(this._checkSameLine(inputList, fence.id)){
                const afterRemoveList = this._removeSameLineCell(inputList, fence.id)
                usableLineList = this._getUsableCellByLine(afterRemoveList, fence.id)
            }else{
                usableLineList = this._getUsableCellByLine(inputList, fence.id)
            }
            //更新当前行元素可选状态
            this._changeCellStatusByLine(usableLineList, fence.id)
        }
    }

    //更新当前行元素可选状态
    _changeCellStatusByLine(usableLineList, x){
        const fence = this.fenceGroup.fences.find(item => item.id == x)
        for(let cell of fence.cells){
            if(usableLineList.includes(this._getCellCode(cell))){
                if(!(cell.status === CellStatus.SELECTED)){
                    cell.status = CellStatus.WAITING
                }
            }else{
                if(!(cell.status === CellStatus.SELECTED)){
                    cell.status = CellStatus.FORBIDDEN
                }
            }
        }
    }

    //得出当前行的可选元素
    _getUsableCellByLine(inputList, x){
        const usableLineList = []
        for(let segments of this.allSegmentList){
            //可选sku是否包含当前输入路径
            if(ArrayUtil.checkContainsAll(segments, inputList)){
                for(let cellCode of segments){
                    if(x == cellCode.split('-')[0] && !usableLineList.includes(cellCode)){
                        usableLineList.push(cellCode)
                    }  
                }
            }
        }
        return usableLineList
    }

    //检查输入中是否存在与当前行同行的元素
    _checkSameLine(inputList, x){
        for(let cellCode of inputList){
            if(x == cellCode.split('-')[0]){
                return true
            }
        }
        return false
    }

    //去掉同行元素返回新的list
    _removeSameLineCell(inputList, x){
        const afterRemove = []
        for(let cellCode of inputList){
            if(x == cellCode.split('-')[0]){
                continue
            }
            afterRemove.push(cellCode)
        }
        return afterRemove
    }

    _findInitialPath(cell, x, y){
        const joiner = new Joiner('#')
        for(let i = 0; i < this.fenceGroup.fences.length; i ++){
            //当前遍历到的cell与被选中的cell在同一行
            if(i === x){
                if(cell.status === CellStatus.SELECTED){
                    continue
                }
                
            }else{
                //不在同一行
            }
        }
    }

    _getCellCode(cell){
        return cell.spec.key_id + '-' + cell.spec.value_id
    }

    _changeCellStatus(cell, x, y){
        // if(!cell || !x || !y){
        //     return
        // }
        const realCell = this.fenceGroup.fences[x].cells[y]
        if(cell.status === CellStatus.WAITING){
            //将该行其他被选的元素置为等待
            this.skuPending.resetSelectedCell(x)
            realCell.status = CellStatus.SELECTED
            this.skuPending.insertCell(realCell, x)
        }
        else if(cell.status === CellStatus.SELECTED){
            realCell.status = CellStatus.WAITING
            this.skuPending.removeCell(x)
        }
    }
}

export{
    Judger
}