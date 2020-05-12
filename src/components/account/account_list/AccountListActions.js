import AppDispatcher from "../../../dispatcher/AppDispatcher";

var AccountListAction = {
    initAction: function(initInfo){
        
        AppDispatcher.dispatch({
            actionType: "ACCOUNT_LIST_INIT",
            initInfo: initInfo,
        })
    },  
}

export default AccountListAction;