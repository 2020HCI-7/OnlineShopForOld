var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

const EnglishtoChinese = {
    id: "商品编号",
    name: "商品名",
    amount: "库存",
    introduction: "商品介绍",
    status: "商品状态",
    VALID: "有效",
    INVALID: "无效",
    price: "价格",
}

var CommodityToChinese = assign({}, EventEmitter.prototype,{

    toChinese: function(english){
        if(EnglishtoChinese[english]){
            return EnglishtoChinese[english];
        }
        else{
            return english;
        }
    },

    
});

export default CommodityToChinese;