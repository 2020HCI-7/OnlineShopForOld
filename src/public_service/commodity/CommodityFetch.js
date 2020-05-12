

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

    fetchGetCommodityList: function(){
        var url = serverUrl + "/commodities/dealer/list";
        var response = fetch(url,{
            method: "GET",
            headers: getHeader,
            credentials: "include",
            mode: "cors",
        });
        return response;
    },

    fetchGetCommodityInfo: function(id){
        var url = serverUrl + "/commodities/dealer/info?id=" + id;
        console.log(url);
        var response = fetch(url,{
            method: "GET",
            headers: getHeader,
            credentials: "include",
            mode: "cors",
        });
        return response;
    },

    fetchGetCommodityComment: function(id){
        var url = serverUrl + "/commodities/comment/singal?id=" + id;
        console.log(url);
        var response = fetch(url,{
            method: "GET",
            headers: getHeader,
            credentials: "include",
            mode: "cors",
        });
        return response;
    },

    fetchModifyCommodityInfo: function(commodity){
        var url = serverUrl + "/commodities/dealer/modify";
        var fetchBody = {
            commodity: commodity,
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

    fetchAddCommodityInfo: function(commodity){
        var url = serverUrl + "/commodities/dealer/add";
        var fetchBody = {
            commodity: commodity,
        };
        var response = fetch(url,{
            method: "POST",
            headers: postHeader,
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(fetchBody),
        });
        return response;
    },

    fetchGetTagList: function(){
        var url = serverUrl + "/tag/list";
        var response = fetch(url,{
            method: "GET",
            headers: postHeader,
            credentials: "include",
            mode: "cors",
        });
        return response;
    },

    fetchModifyTag: function(tag){
        var url = serverUrl + "/tag";
        var fetchBody = {
            tag: tag,
        };
        var response = fetch(url,{
            method: "POST",
            headers: postHeader,
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(fetchBody),
        });
        return response;
    }
});

export default CommodityFetch;