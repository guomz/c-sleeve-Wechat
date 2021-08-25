import {config} from '../config/config'
import {promisic} from '../miniprogram_npm/lin-ui/utils/util'

class Http{
    static async request({url, data, method = 'GET'}){
        var res = await promisic(wx.request)({
            url: `${config.baseUrl}${url}`,
            data,
            method,
            header:{
                appKey: config.appKey
            }
        })
        return res.data

        // wx.request({
        //     url: `${config.baseUrl}${url}`,
        //     method: method,
        //     data: data,
        //     header:{
        //         appKey: config.appKey
        //     },
        //     success: res=>{
        //         callback(res.data)
        //     }
        //   })
    }
}

export{
    Http
}