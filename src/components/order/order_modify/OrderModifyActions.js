import AppDispatcher from "../../../dispatcher/AppDispatcher";

var OrderModifyAction = {
    initAction: function(initInfo){
        AppDispatcher.dispatch({
            actionType: "ORDER_MODIFY_INIT",
            initInfo: initInfo,
        });
    },

    handleChangeAction: function(key, value){
        AppDispatcher.dispatch({
            actionType: "ORDER_MODIFY_HANDLE_CHANGE",
            key: key,
            value: value,
        });
    },

    finishOrderInfoModifyAction: function(){
        AppDispatcher.dispatch({
            actionType: "ORDER_MODIFY_FINISH_ORDER_INFO_MODIFY"
        });
    },
}

export default OrderModifyAction;
