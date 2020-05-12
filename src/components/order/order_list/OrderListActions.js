import AppDispatcher from "../../../dispatcher/AppDispatcher";

var OrderListAction = {
    initAction: function(initInfo){
        
        AppDispatcher.dispatch({
            actionType: "ORDER_LIST_INIT",
            initInfo: initInfo,
        })
    },  
}

export default OrderListAction;