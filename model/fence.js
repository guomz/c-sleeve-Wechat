import {Cell} from './cell'

class Fence{

    cells=[]
    specs = []
    title
    id

    constructor(specs){
        this.specs = specs
        this.title = specs[0].key
        this.id = specs[0].key_id
    }

    init(){
        this._initCell()
    }

    _initCell(){
        for(let spec of this.specs){
            const existed = this.cells.find(cell => {
                return cell.id === spec.value_id
            })
            //去重
            if(existed){
                continue
            }
            const cell = new Cell(spec)
            this.cells.push(cell)
        }
    }

}

export{
    Fence
}