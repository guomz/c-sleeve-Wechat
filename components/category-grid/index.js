// components/category-grid/index.js
import {SpuListType} from '../../core/enum'


Component({
    /**
     * 组件的属性列表
     */
    properties: {
        grid: Array
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        itemTap(detail){
            const cell = detail.detail.cell
            this.triggerEvent('gridtap',{
                cid: cell.category_id? cell.category_id:cell.root_category_id,
                type: cell.category_id? SpuListType.SUB_CATEGORY: SpuListType.ROOT_CATEGORY
            },{bubbles: true})
        }
    }
})
