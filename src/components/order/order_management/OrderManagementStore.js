var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var OrderManagementStore = assign({}, EventEmitter.prototype,{
    items : {
        showState: null,
        selectedOrderId: null,
        userId: null,
        userRole: null,
    },

    record : {
        initInfo : null,
    },

    getItems: function(){
        return this.items;
    },

    emitChange: function () {
        //alert("change");
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
        this.items.userId = this.record.initInfo.userId;
        this.items.userRole = this.record.initInfo.userRole;
    },

    toOrderModify(orderId){
        console.log(orderId);
        
        this.items.selectedOrderId = orderId;
        this.items.showState = "modify";
    },

    toOrderList(){
        this.items.selectedOrderId = null;
        this.items.showState = "list";
    },
});

module.exports = OrderManagementStore;

