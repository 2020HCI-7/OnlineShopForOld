import AccountFetch from "../../../public_service/account/AccountFetch";
import AppDispatcher from "../../../dispatcher/AppDispatcher";
import { message } from 'antd';
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

const adminAccess = {
    id: "read",
    username: "modify",
    status: "read",
};

const dealerAccess = {
    id: "read",
    status: "read",
    username: "modify",
};

const adminToDealerAccess = {
    id: "read",
    username: "modify",
    password: "read",
    status: [
        "isForbidden",
        "isNotForbidden",
    ],
};

const remindText = {
    oldPasswordRemindText: "密码应为6~15个字符",
    newPasswordRemindText: "密码应为6~15个字符",
    newPasswordConfirmRemindText: "两次输入的密码不相同",
}

var AccountModifyStore = assign({}, EventEmitter.prototype,{
    items: {
        userInfo: null,
        userInfoModifyAccess: null,
        password: null,
        remindText: null,
    },

    record:{
        initInfo: null,
        password: {
            oldPassword: "",
            newPassword: "",
            newPasswordConfirm: "",
        },
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
        this.record.initInfo = initInfo;
        console.log(initInfo);
        this.getUserInfo(this.record.initInfo.userRoleMaster, this.record.initInfo.userRoleModify, this.record.initInfo.userId);
        this.items.userInfoModifyAccess = this.getUserInfoModifyAccess(this.record.initInfo.userRoleMaster, this.record.initInfo.userRoleModify);
        if(initInfo.userRoleModify === initInfo.userRoleMaster){
            this.items.remindText = JSON.parse(JSON.stringify(remindText));
        }
    },

    getUserInfo: function(userRoleMaster, userRoleModify, userId){
        var response = null;
        var t=this;
        console.log(userRoleMaster, userRoleModify);
        // del
        t.items.userInfo = {
            id: 1,
            username: 2,
            status: "isNotForbidden",
        }
        this.emitChange();
        return;
        if(userRoleMaster === userRoleModify){
            response = AccountFetch.fetchGetSelfUserInfo(userRoleMaster);
            response.then(
                function(response){
                    if(response.status !== 200){
                        console.log("存在一个问题，状态码为：" + response.status);
                        return;
                    }
                    return response.json();
                }
            ).then(
                function(data){ 
                    if(data.success){
                        t.items.userInfo = data.user;
                        t.emitChange();
                    }
                    else{
                        console.log(data.errmsg, 1);
                    }
                }
            ).catch(function(err){
                console.log(err);
            });
            // del
            
        }
        else{
            response = AccountFetch.fetchGetSubordinateUserInfo(userRoleMaster, userRoleModify, userId);
            response.then(
                function(response){
                    if(response.status !== 200){
                        console.log("存在一个问题，状态码为：" + response.status);
                        return;
                    }
                    return response.json();
                }
            ).then(
                function(data){
                    if(data.success){
                        t.items.userInfo = data.user;
                        t.emitChange();
                    }
                    else{
                        console.log(data.errmsg);
                    }
                }
            ).catch(function(err){
                console.log(err);
            });
        }
    },

    getUserInfoModifyAccess: function(userRoleMaster, userRoleModify){
        var returnAccess = null;
        if(userRoleMaster === userRoleModify)
        {
            switch(userRoleMaster){
                case "admin":
                    returnAccess = adminAccess;
                    break;
                case "dealer":
                    returnAccess = dealerAccess;
                    break;
                default:
                    break;
            }
        }
        else{
            returnAccess = adminToDealerAccess;
        }
        return returnAccess;
    },

    /*change items*/
    handleChange: function(key, value){
        switch(key){
            case "oldPassword":
            case "newPassword":
            case "newPasswordConfirm":
                this.record.password[key] = value;
                this.handleOldPasswordInputChange();
                this.handleNewPasswordInputChange();
                this.handleNewPasswordConfirmInputChange();
                break;
            default:
                this.items.userInfo[key] = value;
                break;
        }
    },

    finishUserInfoModify: function(){
        var response = null;
        var t=this;
        if(this.record.initInfo.userRoleMaster === this.record.initInfo.userRoleModify){
            // console.log(this.items.userInfo);
            response = AccountFetch.fetchModifySelfUserInfo(this.items.userInfo);
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
                function(data){ console.log(data)
                    if(data.success){
                        message.success("修改成功");
                        switch(t.record.initInfo.userRoleMaster){
                            case "superAdmin":
                                AppDispatcher.dispatch({
                                    actionType: "SUPER_ADMIN_FLUSH",
                                });
                                break;
                            case "dealerAdmin":
                                AppDispatcher.dispatch({
                                    actionType: "DEALER_ADMIN_FLUSH",
                                });
                                break;
                            case "consumerAdmin":
                                AppDispatcher.dispatch({
                                    actionType: "CONSUMER_ADMIN_FLUSH",
                                });
                                break;
                            case "customerService":
                                AppDispatcher.dispatch({
                                    actionType: "CUSTOMER_SERVICE_FLUSH",
                                });
                                break;
                            case "dealer":
                                AppDispatcher.dispatch({
                                    actionType: "DEALER_FLUSH",
                                });
                                break;
                            default:
                                break;
                        }
                    }
                    else{
                        message.error("修改失败", 1);
                    }
                }
            ).catch(function(err){
                console.log(err);
            });
        }
        else{
            response = AccountFetch.fetchModifySubordinateUserInfo(this.record.initInfo.userRoleMaster, this.record.initInfo.userRoleModify, this.items.userInfo);
            response.then(
                function(response){
                    console.log(response);
                    if(response.status !== 200){
                        message.error("修改失败", 1);
                        console.log("存在一个问题，状态码为：" + response.status);
                        return;
                    }
                    return response.json();
                }
            ).then(
                function(data){ 
                    if(data.success){
                        message.success("修改成功", 1);
                    }
                    else{
                        message.error("修改失败", 1);
                    }
                }
            ).catch(function(err){
                console.log(err);
            });
        }
    },

    finishPasswordModify: function(){
        if(this.items.remindText.oldPasswordRemindText !== ""
        || this.items.remindText.newPasswordRemindText !== ""
        || this.items.remindText.newPasswordConfirmRemindText !== ""){
            message.error("密码格式错误", 1);
            return;
        }

        var response = null;
        response = AccountFetch.fetchModifySelfPassword(this.record.initInfo.userRoleMaster, this.record.password.oldPassword, this.record.password.newPassword);
        response.then(
            function(response){
                if(response.status !== 200){
                    message.error("修改失败", 1);
                    console.log("存在一个问题，状态码为：" + response.status);
                    return;
                }
                return response.json();
            }
        ).then(
            function(data){ 
                console.log(data)
                if(data.success){
                    message.success("修改成功", 1);
                }
                else{
                    message.error("修改失败", 1);
                }
            }
        ).catch(function(err){
            console.log(err);
        });    
    },

    handleOldPasswordInputChange: function(){
        if(this.record.password.oldPassword.length>=6 && this.record.password.oldPassword.length<=15){
            this.items.remindText.oldPasswordRemindText = "";
        }
        else{
            this.items.remindText.oldPasswordRemindText = remindText.oldPasswordRemindText;
        }
        return;
    },

    handleNewPasswordInputChange: function(){
        if(this.record.password.newPassword.length>=6 && this.record.password.newPassword.length<=15){
            this.items.remindText.newPasswordRemindText = "";
        }
        else{
            this.items.remindText.newPasswordRemindText = remindText.newPasswordRemindText;
        }

        if(this.record.password.newPassword === this.record.password.newPasswordConfirm){
            this.items.remindText.newPasswordConfirmRemindText = "";
        }
        else{
            this.items.remindText.newPasswordConfirmRemindText = remindText.newPasswordConfirmRemindText;
        }
        return;
    },

    handleNewPasswordConfirmInputChange: function(){
        if(this.record.password.newPassword === this.record.password.newPasswordConfirm && this.record.password.newPassword !== ""){
            this.items.remindText.newPasswordConfirmRemindText = "";
        }
        else{
            this.items.remindText.newPasswordConfirmRemindText = remindText.newPasswordConfirmRemindText;
        }
        return;
    },
});

export default AccountModifyStore;

