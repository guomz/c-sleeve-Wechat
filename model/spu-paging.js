import {Paging} from '../utils/paging'

class SpuPaging{
    static getLatestPaging(){
        return new Paging({
            url:`/spu/latest`,
            start:0,
            count:3
        })
    }
}

export{
    SpuPaging
}