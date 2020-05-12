import AppDispatcher from "../../dispatcher/AppDispatcher";

var LoginAction = {
    initAction: function () {
        AppDispatcher.dispatch({
            actionType: "LOGIN_INIT",
        })
    },

    handleChangeAction: function(key, value){
        AppDispatcher.dispatch({
            actionType: "LOGIN_HANDLE_CHANGE",
            key: key,
            value: value,
        })
    },

    finishLoginAction: function(){
        AppDispatcher.dispatch({
            actionType: "LOGIN_FINISH_LOGIN",
        })
    },
}

export default LoginAction;