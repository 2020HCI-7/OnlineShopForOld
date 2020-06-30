var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

const serverUrl = "http://101.132.98.60:12345";

const homeUrl = "http://localhost:3000";

const postHeader = new Headers({
    "Content-Type": "application/json",
});

const getHeader = new Headers({
});

var OrderFetch = assign({}, EventEmitter.prototype,{

    getHomeUrl: function(){
        return homeUrl;
    },

    fetchGetOrderList: function(){
        var url = serverUrl + "/order/getbydealerid";
        var response = fetch(url,{
            method: "GET",
            headers: getHeader,
            credentials: "include",
            mode: "cors",
        });
        return response;
    },

    fetchGetOrderInfo: function(id){
        
        var url = serverUrl + "/order/getbyorderid?orderid=" + id;
        var response = fetch(url,{
            method: "POST",
            headers: postHeader,
            credentials: "include",
            mode: "cors",
            body: JSON.stringify({
                orderid: id 
            })
        });
        return response;
    },

    fetchGetDeliveryInfo: function (addressId) {
        var url = serverUrl + "/order/getbyorderid?orderid=" + addressId;
        var response = fetch(url, {
            method: "POST",
            headers: postHeader,
            credentials: "include",
            mode: "cors",
            body: JSON.stringify({
                orderid: addressId
            })
        });
        return response;
    },

    fetchModifyOrderInfo: function(order){
        var url = serverUrl + "/order/edit";
        console.log(order)
        var response = fetch(url,{
            method: "POST",
            headers: postHeader,
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(order),
            }
        );
        return response;
    },
});

export default OrderFetch;