

var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

const serverUrl = "http://101.132.98.60:12345";

const postHeader = new Headers({
    "Content-Type": "application/json",
});

const getHeader = new Headers({
});
var CommodityFetch = assign({}, EventEmitter.prototype,{

    fetchGetCommodityList: function (storeId) {
        var url = serverUrl + "/goods/getbystoreid";
        var response = fetch(url + "?" + "storeId=" + storeId, {
            method: "POST",
            headers: postHeader,
            credentials: "include",
            mode: "cors",
            body: JSON.stringify({
                storeId: storeId
            })
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
        var url = serverUrl + "/goods/editgood";
        console.log(commodity)

        var response = fetch(url,{
            method: "POST",
            headers: postHeader,
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(commodity),
            }
        );
        return response;
    },

    fetchAddCommodityInfo: function (commodity) {
        console.log(commodity)
        var url = serverUrl + "/goods/addgood";
        var response = fetch(url,{
            method: "POST",
            headers: postHeader,
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(commodity),
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