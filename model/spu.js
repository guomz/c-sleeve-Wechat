import {Http} from '../utils/http'

class Spu{

    static hasNoSpecs(spu){
        if(spu.sku_list.length === 1 && (!spu.sku_list[0].specs || spu.sku_list[0].specs.length === 0)){
            return true
        }

        return false
    }

    static async getSpuDetail(id){
        return await Http.request({
            url: `/spu/id/${id}/detail`
        })
    }
}

export{
    Spu
}