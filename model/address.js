class Address{

    static ADDRESS_KEY='address'

    static getAddress(){
        const address = wx.getStorageSync(Address.ADDRESS_KEY);
        return address
    }

    static setAddress(address){
        wx.setStorageSync(Address.ADDRESS_KEY, address);
    }

}

export{
    Address
}