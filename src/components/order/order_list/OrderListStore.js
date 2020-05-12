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
        this.items.orderList = [
            {
                time: this.stringTime(123123),
                orderId: 123,
            }
        ];
        var t = this;
        var response = OrderFetch.fetchGetOrderList();
        response.then(
            function (response) {
                console.log(response)
                if (response.status !== 200) {
                    console.log("存在一个问题，状态码为：" + response.status);
                    return;
                }
                return response.json();
            }
        ).then(
            function (data) {
                if (data.success) {
                    for (var i = 0; i < data.orderList.length; i++) {
                        data.orderList[i].time = t.stringTime(data.orderList[i].time);
                        data.orderList[i]["key"] = i + 1;
                        t.items.orderList.push(data.orderList[i]);
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
    }
});
export default OrderListStore;

