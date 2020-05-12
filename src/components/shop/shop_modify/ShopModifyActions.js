import AppDispatcher from "../../../dispatcher/AppDispatcher";

var ShopModifyAction = {
    initAction: function(initInfo){
        AppDispatcher.dispatch({
            actionType: "SHOP_MODIFY_INIT",
            initInfo: initInfo,
        });
    },

    handleChangeAction: function(key, value){
        AppDispatcher.dispatch({
            actionType: "SHOP_MODIFY_HANDLE_CHANGE",
            key: key,
            value: value,
        });
    },

    finishShopInfoModifyAction: function(){
        AppDispatcher.dispatch({
            actionType: "SHOP_MODIFY_FINISH_SHOP_INFO_MODIFY"
        });
    },
}

export default ShopModifyAction;
