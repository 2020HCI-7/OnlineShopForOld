import OrderFetch from "../../../public_service/order/OrderFetch";
import { message } from 'antd';
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

const DealerAdminToAllOrderAccess = {
    orderId: false,
    status: false,
    consumerId: false,
    dealerId: false,
    time: false,
    adressee: false,
    adresseePhone: false,
    freightCharge: false,
    destination: false,
    deliveryFirm: false,
    id: false,
    amount: false,
    price: false,
};

const DealerToUnpaidOrderAccess = {
    orderId: false,
    status: ["INVALID"],
    consumerId: false,
    dealerId: false,
    time: false,
    adressee: false,
    adresseePhone: false,
    freightCharge: true,
    destination: true,
    deliveryFirm: true,
    id: false,
    amount: true,
    price: true,
};

const DealerToUnshppedOrderAccess = {
    orderId: false,
    status: ["INVALID", "SHIPPING"],
    consumerId: false,
    dealerId: false,
    time: false,
    adressee: false,
    adresseePhone: false,
    freightCharge: true,
    destination: false,
    deliveryFirm: true,
    id: false,
    amount: false,
    price: false,
};

const DealerToDefaultOrderAccess = {
    orderId: false,
    status: false,
    consumerId: false,
    dealerId: false,
    time: false,
    adressee: false,
    adresseePhone: false,
    freightCharge: false,
    destination: false,
    deliveryFirm: false,
    id: false,
    amount: false,
    price: false,
}
/*
"order:"
*/
var OrderModifyStore = assign({}, EventEmitter.prototype, {
    items: {
        orderInfo: null,
        deliveryInfo: null,
        orderItems: null,
        orderInfoModifyAccess: null,
    },

    record: {
        initInfo: null,
    },

    emitChange: function () {
        this.emit("change");
    },

    addChangeListener: function (callback) {
        this.on("change", callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener("change", callback);
    },

    getItems: function () {
        return this.items;
    },

    init: function (initInfo) {
        this.record.initInfo = initInfo;
        console.log(initInfo);

        this.getOrderInfo();
        this.items.orderInfoModifyAccess = this.getOrderInfoModifyAccess(this.record.initInfo.userRole, this.items.orderInfo.status);
    },

    getOrderInfo: function () {
        this.items.orderInfo = {
            orderId: 1,
            status: "",
            consumerId: 1,
            dealerId: 1,
            time: "",
        }
        this.items.deliveryInfo = {}
        this.items.orderItems = [
            /*{
                key: "0",
                id: 1,
                amount: 1,
                price: 1,
            }*/
        ]
        var t = this;
        var response = OrderFetch.fetchGetOrderInfo(this.record.initInfo.orderId);
        response.then(
            function (response) {
                if (response.status !== 200) {
                    console.log("存在一个问题，状态码为：" + response.status);
                    return;
                }
                return response.json();
            }
        ).then(
            function (data) {
                if (data.success) {
                    t.items.deliveryInfo = data.order.deliveryInfo;
                    t.items.orderItems = data.order.orderItems.map((item, index) =>{
                        item["key"] = index;
                        return item;
                    });
                    t.items.orderInfo["orderId"] = data.order["orderId"];
                    t.items.orderInfo["status"] = data.order["status"];
                    t.items.orderInfo["consumerId"] = data.order["consumerId"];
                    t.items.orderInfo["dealerId"] = data.order["dealerId"];
                    t.items.orderInfo["time"] = t.stringTime(data.order["time"]);
                    t.items.orderInfoModifyAccess = t.getOrderInfoModifyAccess(t.record.initInfo.userRole, t.items.orderInfo.status);
                    t.emitChange();
                }
                else {
                    console.log(data.errmsg);
                }
            }
        ).catch(function (err) {
            console.log(err);
        });
    },

    getOrderInfoModifyAccess: function (userRole, status) {
        var returnAccess = null;
        console.log(status);
        if (userRole === "dealerAdmin") {
            returnAccess = DealerAdminToAllOrderAccess;
        }
        else {
            switch (status) {
                case "UNPAID":
                    returnAccess = DealerToUnpaidOrderAccess;
                    break;
                case "PAID":
                    returnAccess = DealerToUnshppedOrderAccess;
                    break;
                default:
                    returnAccess = DealerToDefaultOrderAccess;
                    break;
            }
        }
        return returnAccess;
    },

    /*change items key:orderItems-2*/
    handleChange: function (key, value) {
        
        console.log(key);
        var object = key.slice(0, key.lastIndexOf('-'));
        var object_key = key.slice(key.lastIndexOf('-') + 1);
        console.log(value);
        switch (object) {
            case "orderInfo":
                this.items.orderInfo[object_key] = value;
                break;
            case "deliveryInfo":
                //console.log("?????");
                this.items.deliveryInfo[object_key] = value;
                break;
            case "orderItems":
                this.items.orderItems[object_key].price = value;
                break;
            default:
                break;
        }
    },

    finishOrderInfoModify: function () {
        console.log(this.items);

        var response = null;
        var t = this;
        var temp = JSON.parse(JSON.stringify(this.items.orderInfo));
        temp["deliveryInfo"] = t.items.deliveryInfo;
        temp["orderItems"] = t.items.orderItems;
        console.log(t.items.deliveryInfo);
        response = OrderFetch.fetchModifyOrderInfo(temp);
        response.then(
            function (response) {
                console.log(response);
                if (response.status !== 200) {
                    console.log("存在一个问题，状态码为：" + response.status);
                    return;
                }
                return response.json();
            }
        ).then(
            function (data) {
                console.log(data)
                if (data.success) {
                    message.success("修改成功", 1);
                }
                else {
                    message.error("修改失败", 1);
                }
            }
        ).catch(function (err) {
            console.log(err);
        });

    },

    stringTime: function (time) {
        var date = new Date(time);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD + " " + hh + mm + ss;
    }
});

export default OrderModifyStore;

