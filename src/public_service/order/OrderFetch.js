var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

const serverUrl = "http://202.120.40.8:30495";

const homeUrl = "http://localhost:3000";

const postHeader = new Headers({
    "Content-Type": "application/json",
});

const getHeader = new Headers({
    "Access-Control-Allow-Origin":"*",
    "Content-Type":"text/plain",
    "Authorization" : "BasicCustom"
});

var OrderFetch = assign({}, EventEmitter.prototype,{

    getHomeUrl: function(){
        return homeUrl;
    },

    fetchGetOrderList: function(){
        var url = serverUrl + "/order/list";
        var response = fetch(url,{
            method: "GET",
            headers: getHeader,
            credentials: "include",
            mode: "cors",
        });
        return response;
    },

    fetchGetOrderInfo: function(id){
        
        var url = serverUrl + "/order/info?id=" + id;
        var response = fetch(url,{
            method: "GET",
            headers: getHeader,
            credentials: "include",
            mode: "cors",
        });
        return response;
    },

    fetchModifyOrderInfo: function(order){
        var url = serverUrl + "/order/modify";
        var fetchBody = {
            order: order,
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
});

export default OrderFetch;