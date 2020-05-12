import AppDispatcher from "../../dispatcher/AppDispatcher";

var TabBarAction = {
    initAction: function(functionList){
        AppDispatcher.dispatch({
            actionType: "TABBAR_INIT",
            functionList: functionList,
        })
    },

    onFunctionButtonClickAction: function(e){
        AppDispatcher.dispatch({
            actionType: "TABBAR_FUNCTION_BUTTON_CLICK",
            e : e,
        })
    },    
}

export default TabBarAction;