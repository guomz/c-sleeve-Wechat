import {Http} from '../utils/http'

class Category{

    roots=[]
    subs = []

    static async getHomeLocationC(){
        return await Http.request({
            url:'/category/grid/all',
            data:null,
            method: 'GET'
        })
    }

    async getAllCategory(){
        const allCategory = await Http.request({
            url: '/category/all'
        })
        return allCategory
    }

    async initCategory(){
        const allCategory = await this.getAllCategory()
        this.roots = allCategory.roots
        this.subs = allCategory.subs
    }
}

export{
    Category
}