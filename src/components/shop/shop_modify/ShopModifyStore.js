import AccountFetch from "../../../public_service/account/AccountFetch";
import ImageFetch from "../../../public_service/image/ImageFetch";
import { message } from 'antd';
import CommodityFetch from "../../../public_service/commodity/CommodityFetch";
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

const ShopInfoModifyAccess = {
    address: "modify",
    phone: "modify",
};

var ShopModifyStore = assign({}, EventEmitter.prototype, {
    items: {
        shopInfo: null,
        shopInfoModifyAccess: null,
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
        this.getShopInfo();
        this.items.shopInfoModifyAccess = this.getShopInfoModifyAccess();
    },

    getShopInfo: function () {
        var response = null;
        var t = this;
        response = AccountFetch.fetchGetSelfShop();
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
                    console.log(data.content);
                    if (data.content.length === 0) {
                        console.log("????");
                        var new_res = AccountFetch.fetchModifySelfShop({
                            address: "",
                            phone: "",
                        });
                        new_res.then(
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
                                    t.items.shopInfo = {
                                        address: " ",
                                        phone: " ",
                                    }
                                    t.emitChange();
                                }
                                else {
                                    console.log(data.errmsg, 1);
                                }
                            }
                        ).catch(function (err) {
                            console.log(err);
                        });
                    }
                    else {
                        t.items.shopInfo = {};
                        var end = data.content.length - 1;
                        CommodityFetch.id = data.content[end].dealer.id;
                        console.log(CommodityFetch.id)
                        t.items.shopInfo.phone = data.content[end].phonenumber;
                        t.items.shopInfo.address = data.content[end].address;
                        t.emitChange();
                    }
                }
                else {
                    console.log(data.errmsg, 1);
                }
            }
        ).catch(function (err) {
            console.log(err);
        });
    },

    getShopInfoModifyAccess: function () {
        return ShopInfoModifyAccess;
    },

    /*change items*/
    handleChange: function (key, value) {
        this.items.shopInfo[key] = value;
    },

    finishShopInfoModify: function () {
        var response = null;
        console.log(this.items.shopInfo);
        response = AccountFetch.fetchModifySelfShop(this.items.shopInfo);
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
});

export default ShopModifyStore;

