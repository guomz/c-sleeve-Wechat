import {Http} from './http'

class Paging{
    start
    count
    url
    req
    moreData = true
    isLocked = false
    currentData = []

    constructor({req, start=0, count=5}){
        this.start = start
        this.count = count
        this.req = req
        this.url = req.url
    }

    async getMoreData(){
        if(!this._getLock()){
            return null
        }
        if(!this.moreData){
            return null
        }
        const currentUrl = this._initUrl()
        const data = await Http.request({
            url: currentUrl,
            data: this.req.data
        })
        this.currentData = this.currentData.concat(data.items)
        this.start = this.start + data.count
        if(data.page >= data.total_page-1){
            this.moreData = false
        }
        this._releaseLock()

        return {
            items: data.items,
            currentData: this.currentData,
            moreData: this.moreData,
            total: data.total
        }
    }

    _initUrl(){
        let args = `start=${this.start}&count=${this.count}`
        if(this.url.indexOf('?') === -1){
            return this.url.concat('?' + args)
        }else{
            return this.url.concat('&' + args)
        }
    }

    _getLock(){
        if(!this.isLocked){
            this.isLocked = true
            return true
        }
        return false
    }

    _releaseLock(){
        if(this.isLocked){
            this.isLocked = false
        }
    }
}

export{
    Paging
}