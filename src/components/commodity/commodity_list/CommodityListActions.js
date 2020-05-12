import AppDispatcher from "../../../dispatcher/AppDispatcher";

var CommodityListAction = {
    initAction: function(initInfo){
        
        AppDispatcher.dispatch({
            actionType: "COMMODITY_LIST_INIT",
            initInfo: initInfo,
        })
    },  
}

export default CommodityListAction;