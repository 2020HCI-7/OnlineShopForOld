import AppDispatcher from "../../dispatcher/AppDispatcher";

var UserAction = {
    initAction: function(initInfo){
        AppDispatcher.dispatch({
            actionType: "USER_INIT",
            initInfo: initInfo,
        })
    },

    exitLoginAction: function(){
        AppDispatcher.dispatch({
            actionType: "USER_EXIT_LOGIN",
        })
    },    
}

export default UserAction;