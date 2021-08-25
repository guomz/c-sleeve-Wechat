import {Http} from '../utils/http'

class Category{

    static async getHomeLocationC(){
        return await Http.request({
            url:'/category/grid/all',
            data:null,
            method: 'GET'
        })
    }
}

export{
    Category
}