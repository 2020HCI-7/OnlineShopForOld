import AccountFetch from "../../public_service/account/AccountFetch";
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

const tabBar = {
    "账户系统-/admin/account" : {
        "我的账户" : "/admin/account/my_account",
        "其他账户管理-/admin/account/account_management": {
            "经销商管理": "/admin/account/account_management/dealer",
        }
    },
    "订单系统-/admin/order" : {
        "查看订单" : "/admin/order/all_order",
    },
}

var AdminStore = assign({}, EventEmitter.prototype,{
    items : {
        tabBar : null,
        account: null,
        content : null,
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

    getItems: function(){
        return this.items;
    },

    init(){
        this.items.tabBar = tabBar;
        this.initAccount();
        this.parseContent();
        this.emitChange();
    },

    initAccount(){
        this.items.account = {
            userId: 2,
            username: "hahaha",
            userRole: "admin",
        }

        // var response = AccountFetch.fetchGetSelfUserInfo(this.items.account.userRole);
        // var t=this;
        // response.then(function(response){
        //     console.log(response);
        //     if(response.status !== 200){
        //         console.log("存在一个问题，状态码为：" + response.status);
        //         window.location.href = AccountFetch.getHomeUrl();
        //         return;
        //     }
        //     return response.json();
        // }).then(function(data){
        //     if(data.success){
        //         t.items.account["userId"] = data.user.id;
        //         t.items.account["username"] = data.user.username;
        //         t.emitChange();
        //         return;
        //     }
        //     else{
        //         console.log(data.errorMassage);
        //         return;
        //     }
        // }).catch(function(err){
        //     console.log("获取用户信息失败");
        //     console.log(err);
        // });
    },

    flush(){
        this.initAccount();
        var temp = window.location.href;
        window.location.href = temp;
    },

    parseContent(){
        var homeHref = AccountFetch.getHomeUrl();
        homeHref = homeHref.slice(7, homeHref.length);
        var href = window.location.href;
        var content = "";
        var temp = "";

        while((temp = href.slice(href.lastIndexOf('/') + 1)) !== homeHref) {
            content = "/" + temp + content;
            href = href.slice(0, href.lastIndexOf('/'));
        }

        this.items.content = content;
    }
});

export default AdminStore;