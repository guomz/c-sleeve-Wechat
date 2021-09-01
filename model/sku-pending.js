import {CellStatus} from '../core/cell-status'

class SkuPending{

    pending=[]

    insertCell(cell, x){
        this.pending[x] = cell
    }

    removeCell(x){
        this.pending[x] = null
    }

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