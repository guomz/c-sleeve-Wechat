import {Http} from '../utils/http'

class Banner{
    static locationB = 'b-1'
    static locationG = 'b-2'
    static async getHomeLocationB(){
        return Http.request({
            url:`/banner/name/${Banner.locationB}`,
            data: null,
            method: 'GET'
        })
    }
    static async getHomeLocationG(){
        return Http.request({
            url: `/banner/name/${Banner.locationG}`
        })
    }
}

export{
    Banner
}