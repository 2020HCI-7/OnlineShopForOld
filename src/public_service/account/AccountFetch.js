var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

const serverUrl = "http://101.132.98.60:12345";
// const serverUrl = "http://localhost:8080";
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

    fetchLogin: function(username, password){
        var url = serverUrl + "/login/up";
        var params = {
            username: username,
            password: password,
        }

        var response = fetch(url , {
            method: "POST",
            headers: postHeader,
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(params),
        });
        return response;
    },

    fetchRegister: function (username, password) {
        var url = serverUrl + "/register/dealer";
        var params = {
            "username": username,
            "password": password,
            "status": 0,
        }

        var response = fetch(url, {
            method: "POST",
            headers: postHeader,
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(params),
        });
        return response;
    },

    fetchGetSelfUserInfo: function(){
        var url = serverUrl + "/user/info";
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

    fetchCreateSelfShop: function (shopInfo) {
        var params = {
            phonenumber: shopInfo.phone,
            address: shopInfo.address,
            dealer_id: shopInfo.userId,
        };

        var url = serverUrl + "/store/create?address=" + shopInfo.address + "&phone=" + shopInfo.phone;
        var response = fetch(url, {
            method: "POST",
            headers: postHeader,
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(params),
        });
        return response;
    },

    fetchModifySelfShop: function (shopInfo) {
        console.log(shopInfo)
        var params = {
            id: shopInfo.storeId, 
            phonenumber: shopInfo.phone,
            address: shopInfo.address,
            dealer: {
                id: shopInfo.dealerId
            }
        };
        console.log(params)
        
        var url = serverUrl + "/store/edit";
        var response = fetch(url, {
            method: "POST",
            headers: postHeader,
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(params),
        });
        return response;
    },

    fetchModifySelfUserInfo: function (user) {
        console.log(user)
        var url = serverUrl + "/dealer/edit";
        var fetchBody = {
            id: user.id,
            username: user.username,
            password: user.password,
            status: Number(user.status === "isForbidden"),
        }
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

    fetchModifySelfPassword: function(userRole, oldPassword, user, newPassword){
        var url = serverUrl + "/dealer/edit";
        var fetchBody = {
            id: user.userId,
            username: user.username,
            password: newPassword,
            status: Number(user.status === "isForbidden")
        }
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