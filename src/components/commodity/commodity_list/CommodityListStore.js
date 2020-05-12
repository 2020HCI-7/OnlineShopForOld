import CommodityFetch from "../../../public_service/commodity/CommodityFetch";
import CommodityToChinese from "../../../public_service/commodity/CommodityToChinese";
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");



var CommodityListStore = assign({}, EventEmitter.prototype,{
    items: {
        commodityList: null,
        toCommodityModify: false,
    },

    record: {
        initInfo: null,
    },

    emitChange: function () {
        this.emit("change");
    },
    
    addChangeListener: function(callback) {
        this.on("change", callback);
    },
    
    removeChangeListener: function(callback) {
        this.removeListener("change", callback);
    },

    getItems: function(){
        return this.items;
    },

    init: function(initInfo){
        this.record.initInfo = initInfo;
        this.getCommodityList();
    },

    getCommodityList(){
        
        var response = CommodityFetch.fetchGetCommodityList();
        var responseCommodityList = [];
        var t=this;
        response.then(
            function(response){
                console.log(response);
                if(response.status !== 200){
                    console.log("存在一个问题，状态码为：" + response.status);
                    return;
                }
                return response.json();
            }
        ).then(
            function(data){
                console.log(data);
                if(data.success){
                    responseCommodityList = data.commodities;
                    t.items.commodityList = responseCommodityList.map((item, index) =>{
                        item["status"] = CommodityToChinese.toChinese(item.status);
                        item["key"] = index;
                        return item;
                    })
                    console.log(t.items.commodityList)
                    t.emitChange();
                }
                else{
                    alert(data.errmsg);
                }
                return data.success;
            }
        ).catch(function(err){
            console.log(err);
        });
        return;
    },
});

export default CommodityListStore;

