import {Http} from '../utils/http'

class SaleExplain{

    static async getSaleExplainText(){
        const explains = await Http.request({
            url: `/sale_explain/fixed`
        })
        return explains.map(explain => explain.text)
    }
}

export{
    SaleExplain
}