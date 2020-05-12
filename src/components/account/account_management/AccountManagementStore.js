var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var AccountManagementStore = assign({}, EventEmitter.prototype,{
    items : {
        showState: null,
        selectedUserId: null,
        userRoleMaster: null,
        userRoleModify: null,
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
        this.items.userRoleMaster = this.record.initInfo.userRoleMaster;
        this.items.userRoleModify = this.record.initInfo.userRoleModify;
    },

    toAccountModify(userId){
        console.log(userId);
        this.items.selectedUserId = userId;
        this.items.showState = "modify";
    },

    toAccountAdd(){
        this.items.showState = "add";
    },

    toAccountList(){
        this.items.selectedUserId = null;
        this.items.showState = "list";
    },
});

module.exports = AccountManagementStore;

