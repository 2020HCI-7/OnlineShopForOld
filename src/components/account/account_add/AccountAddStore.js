import AccountFetch from "../../../public_service/account/AccountFetch";
import { message } from 'antd';

var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

const remindText = {
    usernameRemindText: "用户名应为3~15个字符",
    passwordRemindText: "密码应为6~15个字符",
    passwordConfirmRemindText: "两次输入的密码不相同",
}

var AccountAddStore = assign({}, EventEmitter.prototype,{
    items: {
        remindText: null,
    },

    record:{
        initInfo: null,
        account: {
            username: "",
            password: "",
            passwordConfirm: "",
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
        this.items.remindText = JSON.parse(JSON.stringify(remindText));
    },

    /*change items*/
    handleChange: function(key, value){
        this.record.account[key] = value;
        this.handleUsernameInputChange();
        this.handlePasswordInputChange();
        this.handlePasswordConfirmInputChange();
    },

    finishAccountAdd: function(){
        if(this.items.remindText.usernameRemindText !== ""
        || this.items.remindText.passwordRemindText !== ""
        || this.items.remindText.passwordConfirmRemindText !== ""){
            message.error("用户名或密码格式错误", 1);
            return;
        };
        console.log(this.record.account);
        var user = {
            id: null,
            username: this.record.account.username,
            password: this.record.account.password,
            userRole: this.record.initInfo.userRoleModify,
            status: "isNotForbidden",
        };
        var response = AccountFetch.fetchAddSubordinateUserInfo(this.record.initInfo.userRoleMaster, this.record.initInfo.userRoleModify, user)
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
                    message.success("添加成功", 1);
                }
                else{
                    message.error("添加失败", 1);
                }
            }
        ).catch(function(err){
            console.log(err);
        });
    },

    handleUsernameInputChange: function(){
        if(this.record.account.username.length>=3 && this.record.account.username.length<=15){
            this.items.remindText.usernameRemindText = "";
        }
        else{
            this.items.remindText.usernameRemindText = remindText.usernameRemindText;
        }
        return;
    },

    handlePasswordInputChange: function(){
        if(this.record.account.password.length>=6 && this.record.account.password.length<=15){
            this.items.remindText.passwordRemindText = "";
        }
        else{
            this.items.remindText.passwordRemindText = remindText.passwordRemindText;
        }

        if(this.record.account.password === this.record.account.passwordConfirm){
            this.items.remindText.passwordConfirmRemindText = "";
        }
        else{
            this.items.remindText.passwordConfirmRemindText = remindText.passwordConfirmRemindText;
        }
        return;
    },

    handlePasswordConfirmInputChange: function(){
        if(this.record.account.password === this.record.account.passwordConfirm && this.record.account.password !== ""){
            this.items.remindText.passwordConfirmRemindText = "";
        }
        else{
            this.items.remindText.passwordConfirmRemindText = remindText.passwordConfirmRemindText;
        }
        return;
    },
});

export default AccountAddStore;

