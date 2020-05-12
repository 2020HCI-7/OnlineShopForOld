var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

const serverUrl = "http://101.132.98.60:12345";

const homeUrl = "http://localhost:3000";

const postHeader = new Headers({
    "Content-Type": "application/json",
});

const getHeader = new Headers({
});

var AccountFetch = assign({}, EventEmitter.prototype,{

    getHomeUrl: function(){
        return homeUrl;
    },

    fetchLogin: function(username, password, usertype){
        var url = serverUrl + "/login/up";
        var params = {
            username: username,
            password: password,
        }
        var fetchBody = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
        }).join("&");

        var response = fetch(url + "?" + fetchBody, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded",
            }),
            credentials: "include",
            mode: "cors",
            body: params,
        });
        return response;
    },

    fetchRegister: function (username, password) {
        var url = serverUrl + "/register/dealer";
        var params = {
            username: username,
            password: password,
        }
        var fetchBody = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
        }).join("&");

        var response = fetch(url + "?" + fetchBody, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded",
            }),
            credentials: "include",
            mode: "cors",
            body: params,
        });
        return response;
    },

    fetchGetSelfUserInfo: function(userRole){
        var url = serverUrl + "/account/" + userRole + "/info";
        var response = fetch(url,{
            method: "GET",
            headers: getHeader,
            credentials: "include",
            mode: "cors",
        });
        return response;
    },

    fetchGetSelfShop: function () {
        var url = serverUrl + "/store/get";
        var response = fetch(url, {
            method: "GET",
            headers: getHeader,
            credentials: "include",
            mode: "cors",
        });
        return response;
    },

    fetchModifySelfShop: function (shopInfo) {
        var params = shopInfo;
        var fetchBody = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
        }).join("&");
        var url = serverUrl + "/store/create";
        var response = fetch(url + "?" + fetchBody, {
            method: "POST",
            headers: getHeader,
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(shopInfo),
        });
        return response;
    },

    fetchModifySelfUserInfo: function(user){
        var url = serverUrl + "/account/" + user.userRole + "/info";
        var fetchBody = {
            user: user,
        };
        var response = fetch(url,{
            method: "POST",
            headers: postHeader,
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(fetchBody),
            }
        );
        return response;
    },

    fetchModifySelfPassword: function(userRole, oldPassword, newPassword){
        var url = serverUrl + "/account/" + userRole + "/password";
        var fetchBody = {
            password: {
                oldPassword: oldPassword,
                newPassword: newPassword,
            }
        }
        console.log(fetchBody);
        var response = fetch(url,{
            method: "POST",
            headers: postHeader,
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(fetchBody),
        });
        return response;
    },
});

export default AccountFetch;