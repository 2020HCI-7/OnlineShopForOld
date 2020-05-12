var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

const EnglishtoChinese = {
    id: "用户编号",
    username: "用户名",
    name: "店铺名称",
    password: "密码",
    status: "用户状态",
    longitude: "经度",
    latitude: "纬度",
    phone: "联系电话",
    isNotForbidden: "未被禁用",
    isForbidden: "被禁用",
    superAdmin: "平台管理员",
    dealerAdmin: "经销商管理员",
    consumerAdmin: "消费者管理员",
    dealer: "经销商",
    customerService: "客服",
}

var AccountToChinese = assign({}, EventEmitter.prototype,{

    toChinese: function(english){
        if(EnglishtoChinese[english]){
            return EnglishtoChinese[english];
        }
        else{
            return english;
        }
    },

    
});

export default AccountToChinese;