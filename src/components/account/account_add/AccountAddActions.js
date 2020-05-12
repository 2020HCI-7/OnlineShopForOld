import AppDispatcher from "../../../dispatcher/AppDispatcher";

var AccountAddAction = {
    initAction: function(initInfo){
        
        AppDispatcher.dispatch({
            actionType: "ACCOUNT_ADD_INIT",
            initInfo: initInfo,
        });
    },

    handleChangeAction: function(key, value){
        AppDispatcher.dispatch({
            actionType: "ACCOUNT_ADD_HANDLE_CHANGE",
            key: key,
            value: value,
        });
    },

    finishAccountAddAction: function(){
        AppDispatcher.dispatch({
            actionType: "ACCOUNT_ADD_FINISH_ACCOUNT_ADD"
        });
    },
}

export default AccountAddAction;
