import AppDispatcher from "../../../dispatcher/AppDispatcher";

var CommodityAddAction = {
    initAction: function(initInfo){
        
        AppDispatcher.dispatch({
            actionType: "COMMODITY_ADD_INIT",
            initInfo: initInfo,
        });
    },

    handleChangeAction: function(key, value){
        AppDispatcher.dispatch({
            actionType: "COMMODITY_ADD_HANDLE_CHANGE",
            key: key,
            value: value,
        });
    },

    finishCommodityAddAction: function(){
        AppDispatcher.dispatch({
            actionType: "COMMODITY_ADD_FINISH_COMMODITY_ADD"
        });
    },
}

export default CommodityAddAction;
