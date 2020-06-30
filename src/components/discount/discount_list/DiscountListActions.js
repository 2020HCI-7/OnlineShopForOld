import AppDispatcher from "../../../dispatcher/AppDispatcher";

var DiscountListAction = {
    initAction: function(initInfo){
        
        AppDispatcher.dispatch({
            actionType: "DISCOUNT_LIST_INIT",
            initInfo: initInfo,
        })
    }, 
    
    deleteDiscountAction: function (discount) {
        AppDispatcher.dispatch({
            actionType: "DISCOUNT_LIST_DELETE",
            discount: discount,
        })
    }
}

export default DiscountListAction;