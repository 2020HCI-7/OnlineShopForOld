import AppDispatcher from "../../../dispatcher/AppDispatcher";

var CommodityModifyAction = {
    initAction: function(initInfo){
        AppDispatcher.dispatch({
            actionType: "COMMODITY_MODIFY_INIT",
            initInfo: initInfo,
        });
    },

    handleChangeAction: function(key, value){
        AppDispatcher.dispatch({
            actionType: "COMMODITY_MODIFY_HANDLE_CHANGE",
            key: key,
            value: value,
        });
    },

    finishCommodityInfoModifyAction: function(){
        AppDispatcher.dispatch({
            actionType: "COMMODITY_MODIFY_FINISH_COMMODITY_INFO_MODIFY"
        });
    },
}

export default CommodityModifyAction;
