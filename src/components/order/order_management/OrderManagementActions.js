import AppDispatcher from "../../../dispatcher/AppDispatcher";

var OrderManagementAction = {
    initAction: function(initInfo){
        AppDispatcher.dispatch({
            actionType: "ORDER_MANAGEMENT_INIT",
            initInfo: initInfo,
        });
    },

    toOrderModifyAction: function(orderId){
        
        AppDispatcher.dispatch({
            actionType: "ORDER_MANAGEMENT_TO_ORDER_MODIFY",
            orderId : orderId,
        });
    },
    
    toOrderListAction: function(){
        AppDispatcher.dispatch({
            actionType: "ORDER_MANAGEMENT_TO_ORDER_LIST",
        });
    }
}

export default OrderManagementAction;