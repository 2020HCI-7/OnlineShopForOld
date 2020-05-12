import AppDispatcher from "../../../dispatcher/AppDispatcher";

var CommodityManagementAction = {
    initAction: function(initInfo){
        AppDispatcher.dispatch({
            actionType: "COMMODITY_MANAGEMENT_INIT",
            initInfo: initInfo,
        });
    },

    toCommodityModifyAction: function(commodityId){
        AppDispatcher.dispatch({
            actionType: "COMMODITY_MANAGEMENT_TO_COMMODITY_MODIFY",
            commodityId : commodityId,
        });
    },

    toCommodityAddAction: function(){
        AppDispatcher.dispatch({
            actionType: "COMMODITY_MANAGEMENT_TO_COMMODITY_ADD",
        });
    },
    
    toCommodityListAction: function(){
        AppDispatcher.dispatch({
            actionType: "COMMODITY_MANAGEMENT_TO_COMMODITY_LIST",
        });
    }
}

export default CommodityManagementAction;