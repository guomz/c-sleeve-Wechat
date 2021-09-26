import { config } from '../config/config'
import {promisic} from '../miniprogram_npm/lin-ui/utils/util'

class Token{
    getTokenUrl = '/token'
    verifyTokenUrl = '/token/verify'

    //获取新的token
    async getToken(){
        const r = await wx.login()
        const code = r.code

        const res = await promisic(wx.request)({
            url: config.tokenBaseUrl + this.getTokenUrl,
            method: 'POST',
            data: {
                account: code,
                type: 0
            },
        })
        wx.setStorageSync('token', res.data.token)
        return res.data.token
    }

    //验证token，如果失效则重新获取
    async verifyToken(){
        let token = wx.getStorageSync('token');
        if(!token){
            token = await this.getToken()
            wx.setStorageSync('token', token);
        }else{
            await this.verifyFromServer(token)
        }
    }

    async verifyFromServer(token){
        const res = await promisic(wx.request)({
            url: config.tokenBaseUrl + this.verifyTokenUrl,
            method: 'POST',
            data: {
                token
            },
        })
        const valid = res.data.is_valid
        if(!valid){
            this.getToken()
        }
    }
}

export{
    Token
}