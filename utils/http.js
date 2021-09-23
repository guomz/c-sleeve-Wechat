import {config} from '../config/config'
import {promisic} from '../miniprogram_npm/lin-ui/utils/util'
import {Token} from '../model/token'

class Http{
    static async request({url, data, method = 'GET',refetch = true}){
        let res
        try{
             res = await promisic(wx.request)({
                url: `${config.baseUrl}${url}`,
                data,
                method,
                header:{
                    appKey: config.appKey,
                    'authorization': `Bearer ${wx.getStorageSync('token')}`
                }
            })
        }catch(e){

        }
        //判断http状态码
        const code = res.statusCode.toString()
        if(code.startsWith('2')){
            //200表示成功
            return res.data
        }else{
            //token问题
            if(code == '401'){
                if (data.refetch) {
                    Http._refetch({
                        url,
                        data,
                        method
                    })
                }
            }
        }
        return res.data
    }

    //重发请求
    static async _refetch(data) {
        const token = new Token()
        await token.getToken()
        //防止多次重发
        data.refetch = false
        return await Http.request(data)
    }

}

export{
    Http
}