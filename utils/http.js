import {config} from '../config/config'
import {promisic} from '../miniprogram_npm/lin-ui/utils/util'
import {Token} from '../model/token'
import { codes } from '../config/exception-config'

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
                if (refetch) {
                    Http._refetch({
                        url,
                        data,
                        method
                    })
                }
            }else if (code == '404') {
                return res.data
            }else{
                Http.showError(res.data)
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

    //显示后端发送的异常
    static showError(errResponse){
        const code = errResponse.code
        const message = errResponse.code
        let tip
        //后端返回信息不包含code
        if (!code) {
            tip = codes[9999]
        }else{
            //包含code
            if(codes[code]){
                tip = codes[code]
            }else{
                tip = message
            }
        }
        
        wx.showToast({
            title: tip,
            icon: 'none',
            image: '',
            duration: 1500,
        });
    }

}

export{
    Http
}