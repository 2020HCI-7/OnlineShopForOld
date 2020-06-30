import AccountFetch from "../../../public_service/account/AccountFetch"
import AppDispatcher from "../../../dispatcher/AppDispatcher"
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var DiscountManagementStore = assign({}, EventEmitter.prototype,{
    items : {
        showState: null,
    },

    record : {
        initInfo : null,
    },

    getItems: function(){
        return this.items;
    },

    emitChange: function () {

        this.emit("change");
    },
    
    addChangeListener: function(callback) {
        this.on("change", callback);
    },
    
    removeChangeListener: function(callback) {
        this.removeListener("change", callback);
    },

    init: function(initInfo){
        this.record.initInfo = initInfo;
        this.items.showState = "list";
        this.getStoreId()
    },

    toDiscountAdd(){
        this.items.showState = "add";
    },

    toDiscountList(){
        this.items.showState = "list";
    },

    getStoreId: function () {
        var t = this
        var response = AccountFetch.fetchGetSelfShop()
        response.then(
            function (response) {
                if (response.status !== 200) {
                    console.log("存在一个问题，状态码为：" + response.status)
                    return
                }
                return response.json()
            }
        ).then(
            function (data) {
                if (data.success) {
                    if (data.content.length === 0) {
                        var new_res = AccountFetch.fetchCreateSelfShop({
                            address: "",
                            phone: "",
                        })
                        new_res.then(
                            function (response) {
                                if (response.status !== 200) {
                                    console.log("存在一个问题，状态码为：" + response.status)
                                    return
                                }
                                return response.json()
                            }
                        ).then(
                            function (data) {
                                if (data.success) {
                                    t.getStoreId()
                                }
                            }
                        ).catch(function (err) {
                            console.log(err)
                        })
                    } else {
                        var end = data.content.length - 1
                        t.items.storeId = data.content[end].id
                        AppDispatcher.dispatch({
                            actionType: "DISCOUNT_LIST_INIT",
                            initInfo: {
                                storeId: t.items.storeId
                            },
                        });
                    }
                } else {
                    console.log(data.errmsg, 1)
                }
            }
        ).catch(function (err) {
            console.log(err)
        })
    },
});

export default DiscountManagementStore;

