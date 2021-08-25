import {Http} from '../utils/http'

class Banner{
    static locationB = 'b-1'
    static async getHomeLocationB(){
        return Http.request({
            url:`/banner/name/${Banner.locationB}`,
            data: null,
            method: 'GET'
        })
    }
}

export{
    Banner
}