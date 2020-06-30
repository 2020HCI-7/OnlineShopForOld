import AppDispatcher from "../../../dispatcher/AppDispatcher";

var DiscountManagementAction = {
    initAction: function(initInfo){
        AppDispatcher.dispatch({
            actionType: "DISCOUNT_MANAGEMENT_INIT",
            initInfo: initInfo,
        });
    },

    toDiscountAddAction: function(){
        AppDispatcher.dispatch({
            actionType: "DISCOUNT_MANAGEMENT_TO_DISCOUNT_ADD",
        });
    },
    
    toDiscountListAction: function(){
        AppDispatcher.dispatch({
            actionType: "DISCOUNT_MANAGEMENT_TO_DISCOUNT_LIST",
        });
    }
}

export default DiscountManagementAction;