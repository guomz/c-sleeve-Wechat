import {CellStatus} from '../core/cell-status'

class SkuPending{

    pending=[]

    insertCell(cell, x){
        this.pending[x] = cell
    }

    removeCell(x){
        this.pending[x] = null
    }

    // initDefaultSkuPending(sku, fenceGroup){
    //     for(let i = 0; i < sku.specs.length; i ++){
    //         const spec = sku.specs[i]
    //         fenceGroup.getEach((cell, x, y) => {
    //             if(cell.key_id == spec.key_id && cell.id == spec.value_id){
    //                 cell.status = CellStatus.SELECTED
    //                 this.insertCell(cell, i)
    //             }
    //         })
    //     }
    // }

    getCellByKeyId(keyId){
        for(let cell of this.pending){
            if(cell && cell.key_id === keyId){
                return cell
            }
        }
        return null
    }

    //1-42#2-78...
    getCurrentSkuCode(){
        const cellCodeArr = this.generateCellCodeList()
        return cellCodeArr.join('#')
    }

    //[1-42,2-45,...]
    generateCellCodeList(){
        const cellCodeArr=[]
        for(let i = 0; i < this.pending.length; i ++){
            if(this.pending[i]){
                cellCodeArr.push(this.pending[i].spec.key_id + '-' + this.pending[i].spec.value_id)
            }
        }
        return cellCodeArr
    }

    resetSelectedCell(x){
        if(this.pending[x]){
            this.pending[x].status = CellStatus.WAITING
        }
    }
}

export{
    SkuPending
}