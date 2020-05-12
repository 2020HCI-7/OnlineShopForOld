import CommodityFetch from "../../../public_service/commodity/CommodityFetch";
import ImageFetch from "../../../public_service/image/ImageFetch";
import { message } from 'antd';
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

const dealerToCommodityInfoAccess = {
    id: "read",
    name: "modify",
    price: "modify",
    introduction: "modify",
    status: ["VALID", "INVALID"],
    amount: "modify",
};

var CommodityModifyStore = assign({}, EventEmitter.prototype, {
    items: {
        commodityInfo: null,
        commodityInfoModifyAccess: null,
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

        this.getCommodityInfo(this.record.initInfo.commodityId);
        this.getCommodityInfoModifyAccess();
    },

    getCommodityInfo: function (commodityId) {
        this.items.commodityInfo = {};

        var response = null;
        var t = this;
        response = CommodityFetch.fetchGetCommodityInfo(commodityId);
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
                    console.log(data);
                    t.items.commodityInfo = data.commodity;
                    t.items.commodityInfo["commodityImageSize"] = 130;
                    t.items.commodityInfo["updataImage"] = ImageFetch.fetchUpdateCommodityImage;
                    t.emitChange();
                }
                else {
                    console.log(data.errmsg, 1);
                }
            }
        ).catch(function (err) {
            console.log(err);
        });

        response = CommodityFetch.fetchGetCommodityComment(commodityId);
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
                    console.log(data);
                    t.items.commodityComment = data.comments.map((item) => {
                        item.time = t.stringTime(item.time);
                        return item;
                    });
                    t.emitChange();
                }
                else {
                    console.log(data.errmsg, 1);
                }
            }
        ).catch(function (err) {
            console.log(err);
        });

    },

    getCommodityInfoModifyAccess: function () {
        this.items.commodityInfoModifyAccess = dealerToCommodityInfoAccess;
        return;
    },

    /*change items*/
    handleChange: function (key, value) {
        this.items.commodityInfo[key] = value;
    },

    finishCommodityInfoModify: function () {
        console.log(this.items);

        var response = null;
        console.log(this.items.userInfo);
        response = CommodityFetch.fetchModifyCommodityInfo(this.items.commodityInfo);
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
    },
});

export default CommodityModifyStore;

