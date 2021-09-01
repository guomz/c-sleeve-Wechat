import {CellStatus} from '../core/cell-status'

class Cell{

    title
    id
    status = CellStatus.WAITING
    spec

    constructor(spec){
        this.title = spec.value
        this.id = spec.value_id
        this.spec = spec
    }

    changeStatus(){
        if(this.status === CellStatus.WAITING){
            this.status = CellStatus.SELECTED
        }
        else if(this.status === CellStatus.SELECTED){
            this.status = CellStatus.WAITING
        }
    }
}

export{
    Cell
}