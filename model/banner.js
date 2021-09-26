import { BannerItemType } from '../core/enum'
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

    static async goToTarget(type, keyword){
        switch(type){
            case BannerItemType.SPU:
                wx.navigateTo({
                    url: `/pages/detail/detail?id=${keyword}`
                  })
                  return
            case BannerItemType.THEME:
                wx.navigateTo({
                    url: `/pages/theme/theme?tname=${keyword}`
                  })
                return
            case BannerItemType.SPU_LIST:
                wx.navigateTo({
                    url: `/pages/theme-spu-list/theme-spu-list?tname=${keyword}`
                  })
                return
        }
    }
}

export{
    Banner
}