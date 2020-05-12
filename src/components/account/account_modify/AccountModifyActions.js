import AppDispatcher from "../../../dispatcher/AppDispatcher";

var AccountModifyAction = {
    initAction: function(initInfo){
        
        AppDispatcher.dispatch({
            actionType: "ACCOUNT_MODIFY_INIT",
            initInfo: initInfo,
        });
    },

    handleChangeAction: function(key, value){
        AppDispatcher.dispatch({
            actionType: "ACCOUNT_MODIFY_HANDLE_CHANGE",
            key: key,
            value: value,
        });
    },

    finishUserInfoModifyAction: function(){
        AppDispatcher.dispatch({
            actionType: "ACCOUNT_MODIFY_FINISH_USER_INFO_MODIFY"
        });
    },

    finishPasswordModifyAction: function(){
        AppDispatcher.dispatch({
            actionType: "ACCOUNT_MODIFY_FINISH_PASSWORD_MODIFY"
        });
    },
}

export default AccountModifyAction;
