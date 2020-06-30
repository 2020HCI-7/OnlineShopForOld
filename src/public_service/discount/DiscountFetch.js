var EventEmitter = require("events").EventEmitter
var assign = require("object-assign")

const serverUrl = "http://101.132.98.60:12345"
// const serverUrl = "http://localhost:8080"
const homeUrl = "http://localhost:3000"

const postHeader = new Headers({
    "Content-Type": "application/json",
})

const getHeader = new Headers({
})

var DiscountFetch = assign({}, EventEmitter.prototype,{

    getHomeUrl: function(){
        return homeUrl
    },

    fetchLogin: function(username, password){
        var url = serverUrl + "/login/up"
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
        })
        return response
    },

    fetchGetDiscountList: function (storeId) {
        console.log(storeId)
        var url = serverUrl + "/store/alldiscount?storeid="+ storeId

        var response = fetch(url, {
            method: "POST",
            headers: postHeader,
            credentials: "include",
            mode: "cors",
            body: {},
        })
        return response
    },

    fetchAddDiscount: function (discount) {
        var url = serverUrl + "/store/adddiscount"
        var params = {
            storeId: discount.store_id,
            man: discount.up,
            jian: discount.dis
        }

        var response = fetch(url, {
            method: "POST",
            headers: postHeader,
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(params),
        })
        return response
    },

    fetchDeleteDiscount: function (discount) {
        var url = serverUrl + "/store/removediscount"
        var params = {
            id: discount.id,
            man: discount.up,
            jian: discount.dis,
        }

        var response = fetch(url, {
            method: "POST",
            headers: postHeader,
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(discount),
        })
        return response
    },


})

export default DiscountFetch