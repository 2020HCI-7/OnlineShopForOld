import AppDispatcher from "../../../dispatcher/AppDispatcher";

var DiscountAddAction = {
    initAction: function(initInfo){
        console.log(initInfo)
        AppDispatcher.dispatch({
            actionType: "DISCOUNT_ADD_INIT",
            initInfo: initInfo,
        });
    },

    handleChangeAction: function(key, value){
        AppDispatcher.dispatch({
            actionType: "DISCOUNT_ADD_HANDLE_CHANGE",
            key: key,
            value: value,
        });
    },

    finishDiscountAddAction: function(){
        AppDispatcher.dispatch({
            actionType: "DISCOUNT_ADD_FINISH_DISCOUNT_ADD"
        });
    },
}

export default DiscountAddAction;
