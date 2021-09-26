import { OrderStatus } from "../../core/enum"
import { Order } from "../../model/order"

// components/my-order-panel/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        unpaidCount: 0,
        paidCount: 0,
        deliveredCount: 0,
    },

      pageLifetimes: {
        show: async function() {
            // 页面被展示
            const unpaidPaging = Order.getOrderByPage(OrderStatus.UNPAID)
            const paidPaging = Order.getOrderByPage(OrderStatus.PAID)
            const deliveredPaging = Order.getOrderByPage(OrderStatus.DELIVERED)

            const unpaidResult = await unpaidPaging.getMoreData()
            const paidResult = await paidPaging.getMoreData()
            const deliveredResult = await deliveredPaging.getMoreData()

            this.setData({
                unpaidCount: unpaidResult.total,
                paidCount: paidResult.total,
                deliveredCount: deliveredResult.total
            })
          },
      },

    /**
     * 组件的方法列表
     */
    methods: {
        onGotoMyOrder(detail){
            const status = detail.currentTarget.dataset.key
            wx.navigateTo({
                url: '/pages/my-order/my-order?status=' + status,
            });
        }
    }
})
