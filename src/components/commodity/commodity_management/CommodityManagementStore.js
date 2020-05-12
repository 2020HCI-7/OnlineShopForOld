var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var CommodityManagementStore = assign({}, EventEmitter.prototype,{
    items : {
        userId: null,
        showState: null,
        selectedOrderId: null,
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
        this.items.userId = initInfo.userId;
        this.items.showState = "list";
    },

    toCommodityModify(commodityId){
        this.items.selectedCommodityId = commodityId;
        this.items.showState = "modify";
    },

    toCommodityAdd(){
        this.items.showState = "add";
    },

    toCommodityList(){
        this.items.selectedUserId = null;
        this.items.showState = "list";
    },
});

module.exports = CommodityManagementStore;

