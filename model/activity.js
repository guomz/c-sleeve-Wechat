import {Http} from '../utils/http'

class Activity{

    static async getHomeLocationD(){
        return await Http.request({
            url: `/activity/name/a-2`,
            data: null,
            method: 'GET'
        })
    }

    static async getActivityWithCouponByName(themeName){
        return await Http.request({
            url: `/activity/name/${themeName}/with_coupon`,
            data: null,
            method: 'GET'
        }) 
    }
}

export {
    Activity
}