import AppDispatcher from "../../dispatcher/AppDispatcher";

var RegisterAction = {
    initAction: function(){
        AppDispatcher.dispatch({
            actionType: "REGISTER_INIT",
        })
    },

    handleChangeAction: function(key, value){
        AppDispatcher.dispatch({
            actionType: "REGISTER_HANDLE_CHANGE",
            key: key,
            value: value,
        })
    },

    finishRegisterAction: function(){
        AppDispatcher.dispatch({
            actionType: "REGISTER_FINISH_REGISTER",
        })
    },
}

export default RegisterAction;