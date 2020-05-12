import { message } from 'antd';
import AccountFetch from "../../public_service/account/AccountFetch";

var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var LoginStore = assign({}, EventEmitter.prototype,{
    items : {
        constText: {
            title: "欢迎登录",
            username: "用户名",
            usernamePlaceholder: "请输入用户名",
            password: "密码",
            passwordPlaceholder: "请输入密码",
            usertype: "身份",
            usertypePlaceholder: "请选择身份",
            login: "登录",
        },
        loginState: false,
        url: null,
        usernameRemindText: "用户名应为3~30个字符",
        passwordRemindText: "密码应为6~15个字符",
        usertypes: [
            {
                value: "admin",
                label: "管理员"
            },
            {
                value: "dealer",
                label: "经销商"
            },
        ],
        switch: {
            url: AccountFetch.getHomeUrl() + "/register",
            text: "注册"
        }
    },

    record : {
        username: "",
        password: "",
        usertype: "",
        itemscp : {
            usernameRemindText: "用户名应为3~30个字符",
            passwordRemindText: "密码应为6~15个字符",
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
            case "usertype":
                this.handleUsertypesInputChange();
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
        return;
    },

    handleUsertypesInputChange: function(){
        if(this.record.usertype === undefined){
            this.record.usertype = "";
            return;
        }
        return;
    },

    finishLogin: function(){
        if(this.items.usernameRemindText !== ""){
            message.error("请检查用户名格式");
            return;
        }
        if(this.items.passwordRemindText !== ""){
            message.error("请检查密码格式");
            return;
        }
        if(this.record.usertype === ""){
            message.error("请选择身份");
            return;
        }
        
        var t = this;
        console.log(this.record);
        var response = AccountFetch.fetchLogin(this.record.username, this.record.password, this.record.usertype)
        response.then(function(response){
            console.log(response);
            if(response.status !== 200){
                console.log("存在一个问题，状态码为：" + response.status);
                message.error("登录失败");
                return;
            }
            return response.json();
        }).then(function(data){
            if(data.success){
                message.success("登录成功", 1);
                t.items.loginState = true;
                t.items.url = "/" + t.record.usertype;
                t.emitChange();
                return;
            }
            else{
                if(data.errmsg === "user is forbidden"){
                    message.error("该用户已被禁用");
                }
                else{
                    message.error("登录失败");
                }
                return;
            }
        }).catch(function(err){
            message.error("登录失败");
            console.log(err);
        });
    },
});
export default LoginStore;