import { message } from 'antd';
import AccountFetch from "../../public_service/account/AccountFetch";

var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var RegisterStore = assign({}, EventEmitter.prototype,{
    items : {
        constText: {
            title: "欢迎注册",
            username: "用户名",
            usernamePlaceholder: "请输入用户名",
            password: "密码",
            passwordPlaceholder: "请输入密码",
            passwordConfirm: "确认密码",
            passwordConfirmPlaceholder: "请确认密码",
            register: "注册",
        },
        registerState: false,
        url: null,
        usernameRemindText: "用户名应为3~30个字符",
        passwordRemindText: "密码应为6~15个字符",
        passwordConfirmRemindText: "两次输入密码应相同",
        switch: {
            url: AccountFetch.getHomeUrl(),
            text: "登录"
        }
    },

    record : {
        username: "",
        password: "",
        passwordConfirm: "",
        itemscp : {
            usernameRemindText: "用户名应为3~30个字符",
            passwordRemindText: "密码应为6~15个字符",
            passwordConfirmRemindText: "两次输入密码应相同",
        },
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

    init(){
        this.emitChange();
    },

    handleChange: function(key, value){
        this.record[key] = value;
        switch(key){
            case "username":
                this.handleUsernameInputChange();
                break;
            case "password":
                this.handlePasswordInputChange();
                break;
            case "passwordConfirm":
                this.handlePasswordConfirmInputChange();
                break;
            default:
                break;
        }
        this.emitChange();
    },

    handleUsernameInputChange: function(){
        if(this.record.username.length>=3 && this.record.username.length<=30){
            this.items.usernameRemindText = "";
        }
        else{
            this.items.usernameRemindText = this.record.itemscp.usernameRemindText;
        }
        return;
    },

    
    handlePasswordInputChange: function(){
        if(this.record.password.length>=6 && this.record.password.length<=15){
            this.items.passwordRemindText = ""
        }
        else{
            this.items.passwordRemindText = this.record.itemscp.passwordRemindText;
        }

        if (this.record.passwordConfirm === this.record.password && this.record.passwordConfirm !== "") {
            this.items.passwordConfirmRemindText = ""
        } else {
            this.items.passwordConfirmRemindText = this.record.itemscp.passwordConfirmRemindText;
        }
        return;
    },

    handlePasswordConfirmInputChange: function () {
        if (this.record.passwordConfirm === this.record.password && this.record.passwordConfirm !== "") {
            this.items.passwordConfirmRemindText = ""
        } else {
            this.items.passwordConfirmRemindText = this.record.itemscp.passwordConfirmRemindText;
        }
        return;
    },

    finishRegister: function(){
        if(this.items.usernameRemindText !== ""){
            message.error("请检查用户名格式");
            return;
        }
        if(this.items.passwordRemindText !== ""){
            message.error("请检查密码格式");
            return;
        }
        if (this.items.passwordConfirmRemindText !== "") {
            message.error("两次密码输入不一致");
            return;
        }
        
        var t = this;
        var response = AccountFetch.fetchRegister(this.record.username, this.record.password)
        response.then(function(response){
          
            if(response.status !== 200){
                console.log("存在一个问题，状态码为：" + response.status);
                return;
            }
            return response.json();
        }).then(function (data) {
            if(data.success){
                message.success("注册成功", 1);
                t.items.registerState = true;
                t.items.url = "/";
                t.emitChange();
                return;
            }
            else{
                if(data.errmsg === "user is forbidden"){
                    message.error("该用户已被禁用");
                }
                else{
                    message.error("注册失败");
                }
                return;
            }
        }).catch(function(err){
            message.error("注册失败");
            console.log(err);
        });
    },
});
export default RegisterStore;