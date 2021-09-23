import {promisic} from '../miniprogram_npm/lin-ui/utils/util'

class Token{
    getTokenUrl = 'http://localhost:8080/v1/token'
    verifyTokenUrl = 'http://localhost:8080/v1/token/verify'

    async getToken(){
        const r = await wx.login()
        const code = r.code

        const res = await promisic(wx.request)({
            url: this.getTokenUrl,
            method: 'POST',
            data: {
                account: code,
                type: 0
            },
        })
        wx.setStorageSync('token', res.data.token)
        return res.data.token
    }

    async verifyToken(){
        let token = wx.getStorageSync('token');
        if(!token){
            token = await this.getToken()
            wx.setStorageSync('token', token);
        }else{
            await this.verifyFromServer()
        }
    }

    async verifyFromServer(token){
        const res = await promisic(wx.request)({
            url: this.getTokenUrl,
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