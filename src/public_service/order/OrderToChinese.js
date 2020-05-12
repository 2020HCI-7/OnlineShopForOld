var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

const EnglishtoChinese = {
    orderId: "订单编号",
    status: "订单状态",
    consumerId: "消费者编号",
    dealerId: "联系电话",
    time: "订单创建时间",
    adressee: "收件人",
    adresseePhone: "收件电话",
    freightCharge: "运费",
    destination: "收件地址",
    deliveryFirm: "快递公司",
}

var OrderToChinese = assign({}, EventEmitter.prototype,{

    toChinese: function(english){
        if(EnglishtoChinese[english]){
            return EnglishtoChinese[english];
        }
        else{
            return english;
        }
    },

    
});

export default OrderToChinese;