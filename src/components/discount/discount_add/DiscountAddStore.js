import DiscountFetch from "../../../public_service/discount/DiscountFetch";
import { message } from 'antd';

var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var DiscountAddStore = assign({}, EventEmitter.prototype,{
    items: {
        discount: {}
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

    init: function (initInfo) {
        console.log("???")
        this.record.initInfo = initInfo;
        this.items.discount["store_id"] = initInfo.storeId
    },

    /*change items*/
    handleChange: function(key, value){
        this.items.discount[key] = value;
    },

    finishDiscountAdd: function () {
        var response = DiscountFetch.fetchAddDiscount(this.items.discount)
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

export default DiscountAddStore;

