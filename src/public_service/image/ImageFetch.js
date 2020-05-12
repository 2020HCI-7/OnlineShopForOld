var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

const serverUrl = "http://202.120.40.8:30495";

const serverImgUrl = "http://202.120.40.8:30492/image/";

const imageHeader = new Headers({
    
});

var ImageFetch = assign({}, EventEmitter.prototype,{
    getServerImgUrl: function(){
        return serverImgUrl;
    },

    fetchUpdateShopImage: function(formData){
        var url = serverUrl + "/file/dealer/cover";
        var response = fetch(url,{
            method: "POST",
            headers: imageHeader,
            credentials: "include",
            mode: "cors",
            body: formData,
            }
        );
        return response;
    },

    fetchUpdateCommodityImage: function(formData, id){
        var url = serverUrl + "/file/commodity/picture?commodityid=" + id;
        console.log(url);
        var response = fetch(url,{
            method: "POST",
            headers: imageHeader,
            credentials: "include",
            mode: "cors",
            body: formData,
            }
        );
        return response;
    },
});

export default ImageFetch;