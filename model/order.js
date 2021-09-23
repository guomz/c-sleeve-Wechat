class Order{

    orderItems=[]

    constructor(orderItems){
        this.orderItems = orderItems
    }

    checkOrderIsOk(){
        this.orderItems.forEach(item => {
            item.isOk()
        })
    }
}

export{
    Order
}