const ShoppingWay = {
    CART: 'cart',
    BUY: 'buy'
}

const SpuListType = {
    THEME: 'theme',
    ROOT_CATEGORY: 'root_category',
    SUB_CATEGORY: 'sub_category',
    LATEST: 'latest'
}

const CouponCenterType = {
    ACTIVITY: 'activity',
    SPU_CATEGORY: 'spu_category'
}

const CouponType = {
    FULL_MINUS: 1,
    FULL_OFF: 4,
    NO_THRESHOLD_MINUS: 3,
    NO_THRESHOLD_OFF: 2
}

const AuthAddress = {
    DENY: 'deny',
    NOT_AUTH: 'not_auth',
    AUTHORIZED: 'authorized'
}

const CouponOperate = {
    PICK: 'pick',
    UNPICK: 'unpick'
}


const OrderStatus = {
    ALL: 0,
    UNPAID: 1,
    PAID: 2,
    DELIVERED: 3,
    FINISHED: 4,
    CANCELED: 5,
}

const BannerItemType = {
  SPU: 1,
  THEME: 2,
  SPU_LIST: 3
}

const OrderExceptionType = {
    BEYOND_STOCK: 'beyond_stock',
    BEYOND_SKU_MAX_COUNT: 'beyond_sku_max_count',
    BEYOND_ITEM_MAX_COUNT: 'beyond_item_max_count',
    SOLD_OUT: 'sold_out',
    NOT_ON_SALE: 'not_on_sale',
    EMPTY: 'empty'
}

const CouponStatus = {
    CAN_COLLECT: 0,
    AVAILABLE: 1,
    USED: 2,
    EXPIRED: 3
}

export {
    ShoppingWay,
    SpuListType,
    AuthAddress,
    OrderExceptionType,
    CouponCenterType,
    CouponStatus,
    CouponType,
    CouponOperate,
    OrderStatus,
  BannerItemType
}