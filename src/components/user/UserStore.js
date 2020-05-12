import AccountFetch from "../../public_service/account/AccountFetch";

var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var UserStore = assign({}, EventEmitter.prototype,{
    items : {
        constText: {
            exitLogin: "退出登录",
        },
        username: "",
    },

    record : {
        initInfo: null,
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
        this.items.username = initInfo.username;
        this.items.loginState= true;
        this.emitChange();
    },

    exitLogin: function() {
        this.items.username = "";
        window.location.href = AccountFetch.getHomeUrl();
    },
});

export default UserStore;

