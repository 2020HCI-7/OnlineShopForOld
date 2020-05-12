import AppDispatcher from "../../../dispatcher/AppDispatcher";

var AccountManagementAction = {
    initAction: function(initInfo){
        AppDispatcher.dispatch({
            actionType: "ACCOUNT_MANAGEMENT_INIT",
            initInfo: initInfo,
        });
    },

    toAccountModifyAction: function(userId){
        console.log(userId);
        AppDispatcher.dispatch({
            actionType: "ACCOUNT_MANAGEMENT_TO_ACCOUNT_MODIFY",
            userId : userId,
        });
    },

    toAccountAddAction: function(){
        AppDispatcher.dispatch({
            actionType: "ACCOUNT_MANAGEMENT_TO_ACCOUNT_ADD",
        });
    },
    
    toAccountListAction: function(){
        AppDispatcher.dispatch({
            actionType: "ACCOUNT_MANAGEMENT_TO_ACCOUNT_LIST",
        });
    }
}

export default AccountManagementAction;