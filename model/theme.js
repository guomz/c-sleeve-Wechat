import {Http} from '../utils/http'

class Theme{
    static homeLocationA = 't-1'
    static homeLocationE = 't-2'
    static homeLocationF = 't-3'
    static homeLocationH = 't-4'

    themes = []

    async getThemes(){
        this.themes = await Http.request({
            url: `/theme/by/names`,
            data: {
                names: `${Theme.homeLocationA},${Theme.homeLocationE},${Theme.homeLocationF},${Theme.homeLocationH}`
            }
        })
    }

     getHomeLocationA(){
        return this.themes.find(theme => theme.name === Theme.homeLocationA)
    }

     getHomeLocationE(){
        return this.themes.find(theme => theme.name === Theme.homeLocationE)
    }

}

export{
    Theme
}