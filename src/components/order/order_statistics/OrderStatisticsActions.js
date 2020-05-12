import AppDispatcher from "../../../dispatcher/AppDispatcher";

var OrderStatisticsAction = {
    initAction: function(initInfo){
        AppDispatcher.dispatch({
            actionType: "ORDER_STATISTICS_INIT",
            initInfo: initInfo,
        });
    },
}

export default OrderStatisticsAction;
