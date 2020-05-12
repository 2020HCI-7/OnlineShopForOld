import OrderFetch from "../../../public_service/order/OrderFetch";
import { message } from 'antd';
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var OrderStatisticsStore = assign({}, EventEmitter.prototype, {
    items: {
        orderAmount: 0,
        priceRatio: [],
        timeRatio: [],
        commoditiesTable: [],
    },

    record: {
        initInfo: null,
        orderList: null,
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
        this.getOrderList();
    },

    getOrderList: function () {
        this.record.orderList = [];
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
                    console.log(data);
                    data.orderList.map((value) => {
                        console.log(value);
                        if(value.status != "UNPAID" && value.status != "INVALID"){
                            console.log(value);
                            t.record.orderList.push(value);
                            return;
                        }
                    });
                    t.items.orderAmount = t.record.orderList.length;
                    t.doStatistics();
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

    doStatistics: function(){
        var lowPrice = 0;
        var middlePrice = 0;
        var highPrice = 0;
        var time1 = 0;//0~8
        var time2 = 0;//9~16
        var time3 = 0;//17~24
        //console.log(this.record);
        var tempCommodity = {};
        for(var i = 0; i < this.items.orderAmount; i++){
            for(var k = 0; k < this.record.orderList[i].orderItems.length; k++){
                //console.log(tempCommodity);
                //console.log(tempCommodity.hasOwnProperty(this.record.orderList[i].orderItems[k].id));
                if(!tempCommodity.hasOwnProperty(this.record.orderList[i].orderItems[k])){
                    tempCommodity[this.record.orderList[i].orderItems[k].id] = {
                        name: this.record.orderList[i].orderItems[k].name,
                        price: this.record.orderList[i].orderItems[k].price,
                        amount: this.record.orderList[i].orderItems[k].amount,
                    }
                }
                else{
                    tempCommodity[this.record.orderList[i].orderItems[k].id].amount += this.record.orderList[i].orderItems[k].amount;
                }
            }

            if(this.record.orderList[i].totalPrice < 50){
                lowPrice++;
            }
            else if(this.record.orderList[i].totalPrice < 200){
                middlePrice++;
            }
            else{
                highPrice++;
            }

            var date = new Date(this.record.orderList[i].time);
            var hour = date.getHours();
            if(hour < 8){
                time1++;
            }
            else if(hour < 16){
                time2++;
            }
            else{
                time3++;
            }

            this.items.priceRatio = [
                lowPrice / this.items.orderAmount,
                middlePrice / this.items.orderAmount,
                1 - lowPrice / this.items.orderAmount - middlePrice / this.items.orderAmount,
            ]

            this.items.timeRatio = [
                time1 / this.items.orderAmount,
                time2 / this.items.orderAmount,
                1 - time1 / this.items.orderAmount - time2 / this.items.orderAmount,
            ]
        }
        
        var singalCommodity = {
            id: 0,
            name: "",
            price: 0,
            amount: 0,
            total: 0,
        }
        Object.getOwnPropertyNames(tempCommodity).map((key) => {
            singalCommodity.id = key;
            singalCommodity.name = tempCommodity[key].name;
            singalCommodity.price = tempCommodity[key].price;
            singalCommodity.amount = tempCommodity[key].amount;
            singalCommodity.total = singalCommodity.price * singalCommodity.amount;
            this.items.commoditiesTable.push(singalCommodity);
        })
        console.log(this.items);

        this.emitChange();
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

export default OrderStatisticsStore;

