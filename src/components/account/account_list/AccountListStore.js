import AccountFetch from "../../../public_service/account/AccountFetch";
import AccountToChinese from "../../../public_service/account/AccountToChinese";

var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var AccountListStore = assign({}, EventEmitter.prototype,{
    items: {
        userList: null,
        toAccountModify: false,
    },

    record: {
        initInfo: null,
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

    init: function(initInfo){
        console.log(initInfo);
        this.record.initInfo = initInfo;
        this.getUserList(this.record.initInfo.userRoleMaster, this.record.initInfo.userRoleList);
    },

    getUserList(userRoleMaster, userRoleList) {
        
        this.items.userList = [{
            id: 1,
            username: "hhh",
            key: 1,
            userRole: userRoleList,
            status: "禁用",
        }];
        this.emitChange();
        return;
        
        
        var response = AccountFetch.fetchGetSubordinateUserList(userRoleMaster, userRoleList);
        var responseUserList = [];
        var t=this;
        response.then(
            function(response){
                console.log(response);
                if(response.status !== 200){
                    console.log("存在一个问题，状态码为：" + response.status);
                    return;
                }
                return response.json();
            }
        ).then(
            function(data){
                console.log(data);
                if(data.success){
                    
                    responseUserList = data.userList;
                    console.log(responseUserList);
                    t.items.userList = responseUserList.map((item, index) =>{
                        item["key"] = index;
                        item["userRole"] = AccountToChinese.toChinese(item.userRole);
                        item["status"] = AccountToChinese.toChinese(item.status);
                        return item;
                    })
                    console.log(t.items.userList)
                    t.emitChange();
                }
                else{
                    alert(data.errmsg);
                }
                return data.success;
            }
        ).catch(function(err){
            console.log(err);
        });
        return;
    },
});

export default AccountListStore;

