import {Http} from '../utils/http'

class Spu{

    static async getSpuDetail(id){
        return await Http.request({
            url: `/spu/id/${id}/detail`
        })
    }
}

export{
    Spu
}