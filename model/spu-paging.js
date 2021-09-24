import {Paging} from '../utils/paging'

class SpuPaging{
    static getLatestPaging(){
        return new Paging({
            req: {url:`/spu/latest`},
            start:0,
            count:3
        })
    }

    static getCategorySpuPaging(id, isRoot){
        return new Paging({
            req: {
                url: `/spu/by/category/${id}`,
                data: {
                    is_root: isRoot
                }
            },
            start: 0,
            count: 3
        })
    }
}

export{
    SpuPaging
}