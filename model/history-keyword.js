class HistoryKeyword{

    history=[]
    storageKey = 'History'

    constructor(){
        this.history = this._getStorage()
    }

    get(){
        return this.history
    }

    set(keyword){
        if(this.history.includes(keyword)){
            return
        }else if(this.history.length >= 20){
            this.history.pop()
        }

        this.history.unshift(keyword)
        this._setStorage()
    }

    clear(){
        this.history = []
        this._setStorage()
    }

    _getStorage(){
        const storage = wx.getStorageSync(this.storageKey)
        if(!storage){
            return []
        }
        return storage;
    }

    _setStorage(){
        wx.setStorageSync(this.storageKey, this.history);
    }
}

export{
    HistoryKeyword
}