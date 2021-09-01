class ArrayUtil{

    static checkContainsAll(array1, array2){
        if(array2.length === 0){
            return true
        }

        for(let item of array2){
            if(!array1.includes(item)){
                return false
            }
        }
        return true
    }
}

export{
    ArrayUtil
}