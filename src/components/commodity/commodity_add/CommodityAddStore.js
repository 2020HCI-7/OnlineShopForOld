import CommodityFetch from "../../../public_service/commodity/CommodityFetch";
import { message } from 'antd';
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var CommodityAddStore = assign({}, EventEmitter.prototype,{
    items: {
        commodityInfo: null
    },

    record:{
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
        this.items.commodityInfo = {
            name: "",
            price: 0,
            amount: 0,
            introduction: "",
        }
    },

    /*change items*/
    handleChange: function(key, value){
        this.items.commodityInfo[key] = value;
    },

    finishCommodityAdd: function(){
        console.log(this.items);
        var response = CommodityFetch.fetchAddCommodityInfo(this.items.commodityInfo)
        response.then(
            function(response){
                if(response.status !== 200){
                    console.log("存在一个问题，状态码为：" + response.status);
                    return;
                }
                return response.json();
            }
        ).then(
            function(data){
                if(data.success){
                    message.success("添加成功", 1);
                }
                else{
                    message.error("添加失败", 1);
                }
            }
        ).catch(function(err){
            console.log(err);
        });
    },
});

export default CommodityAddStore;

