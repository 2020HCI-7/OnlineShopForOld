import AppDispatcher from "../../dispatcher/AppDispatcher";

var AdminAction = {
    initAction: function () {
        AppDispatcher.dispatch({
            actionType: "ADMIN_INIT",
        })
    },
}

export default AdminAction;