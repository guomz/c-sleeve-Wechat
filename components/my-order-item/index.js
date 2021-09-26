// components/my-order-item/index.js
import { Order } from '../../model/order'
import {OrderDetail} from '../../model/order-detail'
import {OrderStatus} from '../../core/enum'
Component({
    /**
     * 组件的属性列表
     */
    externalClasses: ['l-class'],
    properties: {
        order: Object
    },

    /**
     * 组件的初始数据
     */
    data: {
        _item:Object,
        payBtnDisable: false
    },

    observers: {
        'order': function (order) {
            if (!order) {
                return
            }
            const orderDetail = new OrderDetail(order)
            this.setData({
                _item: orderDetail
            })
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //订单详情
        onGotoDetail(detail) {
            const oid = this.data._item.id
            wx.navigateTo({
                url:`/pages/order-detail/order-detail?oid=${oid}`
            })
        },
        //订单倒计时
        onCountdownEnd(detail) {
            this.data._item.correctOrderStatus()
            this.setData({
                _item: this.data._item
            })
        },

        //支付
        onPay(detail){
            try{
                //成功则跳转至订单详情
                const payResult = Order.payOrder(this.properties.order.id)
                this.setData({
                    payBtnDisable: true
                })
                wx.redirectTo({
                    url: '/pages/pay-success/pay-success?oid=' + this.properties.order.id,
                });
            }catch(e){
                //发生失败
                console.log('error: ' + e)
                this.setData({
                    orderFail: true,
                    orderFailMsg: e.message,
                    payBtnDisable: true
                })
                //跳转到我的订单
                wx.redirectTo({
                    url:"/pages/my-order/my-order?status=" + OrderStatus.UNPAID
                })
            }
            
        }
    }
})
