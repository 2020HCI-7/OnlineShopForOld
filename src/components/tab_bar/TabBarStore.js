import AccountFetch from "../../public_service/account/AccountFetch";
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var TabBarStore = assign({}, EventEmitter.prototype,{
    items : {},

    getItems: function(){
        return this.items;
    },

    init: function(functionList){
        this.items = functionList;
        this.emitChange();
    },

    onFunctionButtonClick: function(e) {
        var homeHref = AccountFetch.getHomeUrl();
        if (window.location.href !== homeHref + e.key) {
            window.location.href = homeHref + e.key;
        }
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
});

export default TabBarStore;

