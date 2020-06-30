import OrderFetch from "../../../public_service/order/OrderFetch";
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var OrderListStore = assign({}, EventEmitter.prototype, {
    items: {
        orderList: null,
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
        this.getOrderList();
    },

    getOrderList() {
        this.items.orderList = [];
        var t = this;
        var response = OrderFetch.fetchGetOrderList();
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
                    for (var i = 0; i < data.content.length; i++) {
                        console.log(data)
                        var temp = {}
                        temp.orderId = data.content[i].order.id
                        temp.consumerId = data.content[i].order.userId
                        temp.time = data.content[i].order.date
                        temp.status = t.stringStatus(data.content[i].order.status)
                        temp.storeId = data.content[i].order.storeId
                        temp.key = i + 1
                        temp.totalPrice = data.content[i].order.finalmoney
                        t.items.orderList.push(JSON.parse(JSON.stringify(temp)));
                    }
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

    stringTime: function (time) {
        var date = new Date(time);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD + " " + hh + mm + ss;
    },

    stringStatus: function (status) {
        switch (status) {
            case 0:
                return "未付款"
            case 1:
                return "已付款"
            case 2:
                return "已发货"
            case 3:
                return "已完成"
            case 4:
                return "用户取消"
            case 5:
                return "商家取消"
            case 6:
                return "管理员取消"
            default:
                return undefined
        }
    }
});
export default OrderListStore;

