

var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

const serverUrl = "http://101.132.98.60:12345";

const postHeader = new Headers({
    // "Content-Type": "application/json",
});

const getHeader = new Headers({
});
var CommodityFetch = assign({}, EventEmitter.prototype,{

    fetchGetCommodityList: function () {
        console.log(this.id);
        var url = serverUrl + "/goods/getbydealerid";
        var response = fetch(url + "?" + "dealerid=" + 25, {
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
        var url = serverUrl + "/goods/addgood";
        var fetchBody = Object.keys(commodity).map((key) => {
            return encodeURIComponent(key) + "=" + encodeURIComponent(commodity[key]);
        }).join("&");
        var response = fetch(url + "?" + fetchBody,{
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