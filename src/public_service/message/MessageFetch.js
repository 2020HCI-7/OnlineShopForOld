

var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

const serverUrl = "http://202.120.40.8:30495";

const postHeader = new Headers({
    "Content-Type": "application/json",
});

const getHeader = new Headers({
    "Access-Control-Allow-Origin":"*",
    "Content-Type":"text/plain",
    "Authorization" : "BasicCustom"
});
var CommodityFetch = assign({}, EventEmitter.prototype,{

    fetchGetMessageList: function(){
        var url = serverUrl + "/message/customer_service/list";
        var response = fetch(url,{
            method: "GET",
            headers: getHeader,
            credentials: "include",
            mode: "cors",
        });
        return response;
    },

    fetchGetMessageInfo: function(id){
        var url = serverUrl + "/message/customer_service/get?id=" + id;
        console.log(url);
        var response = fetch(url,{
            method: "GET",
            headers: getHeader,
            credentials: "include",
            mode: "cors",
        });
        return response;
    },

    fetchComfirmMessage: function(id){
        var url = serverUrl + "/message/customer_service/tab";
        var fetchBody = {
            consumerId: id,
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

    fetchSendMessage: function(message){
        var url = serverUrl + "/message/customer_service/add";
        var fetchBody = {
            consumerId: message.consumerId,
            content: message.content,
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

export default CommodityFetch;