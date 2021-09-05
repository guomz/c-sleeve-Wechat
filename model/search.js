import {Paging} from '../utils/paging'

class Search{

    static doSearch(keyword){
        return new Paging({
            req: {
                url: `/search?q=${keyword}`
            }
        })
    }
}

export{
    Search
}