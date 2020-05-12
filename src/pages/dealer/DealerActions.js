import AppDispatcher from "../../dispatcher/AppDispatcher";

var DealerAction = {
    initAction: function(){
        AppDispatcher.dispatch({
            actionType: "DEALER_INIT",
        })
    },
}

export default DealerAction;