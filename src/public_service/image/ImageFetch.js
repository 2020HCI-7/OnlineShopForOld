var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

const serverUrl = "http://101.132.98.60:12345";

const virtualDealerUrl = "http://113.88.252.27:10000"

const imageHeader = new Headers({
    
});

var ImageFetch = assign({}, EventEmitter.prototype,{
    getServerImgUrl: function(){
        return serverUrl;
    },

    getVirtualDealerUrl: function(){
        return virtualDealerUrl;
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

    fetchUpdateDealerImage: function (formData, dealerId) {
        var url = virtualDealerUrl + "/setImage?name=" + dealerId;
        var response = fetch(url, {
            method: "POST",
            headers: imageHeader,
            credentials: "include",
            mode: "cors",
            body: formData,
        });
        return response;
    },

    fetchGetDealerImage: function (dealerId) {
        var url = virtualDealerUrl + "/setImage?name=" + dealerId + "&action=idle";
        var response = fetch(url, {
            method: "GET",
            credentials: "include",
            mode: "cors",
        });
        return response;
    },

    fetchUpdateCommodityImage: function(formData, id){
        var url = serverUrl + "/image/upload?id=" + id + "0";
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