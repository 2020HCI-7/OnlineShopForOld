import AccountFetch from "../../../public_service/account/AccountFetch"
import ImageFetch from "../../../public_service/image/ImageFetch"
import { message } from 'antd'
var EventEmitter = require("events").EventEmitter
var assign = require("object-assign")

const ShopInfoModifyAccess = {
    storeId: "read",
    address: "modify",
    phone: "modify",
}

var ShopModifyStore = assign({}, EventEmitter.prototype, {
    items: {
        shopInfo: null,
        shopInfoModifyAccess: null,
    },

    record: {
        initInfo: null,
    },

    emitChange: function () {
        this.emit("change")
    },

    addChangeListener: function (callback) {
        this.on("change", callback)
    },

    removeChangeListener: function (callback) {
        this.removeListener("change", callback)
    },

    getItems: function () {
        return this.items
    },

    init: function (initInfo) {
        console.log(initInfo)
        this.record.initInfo = initInfo
        this.getShopInfo()
        this.items.shopInfoModifyAccess = this.getShopInfoModifyAccess()
    },

    getShopInfo: function () {
        var response = null
        var t = this
        //del
        t.items.shopInfo = {}
        t.items.shopInfo.phone = ""
        t.items.shopInfo.address = ""
        t.items.shopInfo.shopImageSize = 100
        t.items.shopInfo.updateImage = (data, dealerId) => {
            t.items.shopInfo.imageState = "loading"
            t.emitChange()
            setTimeout(() => {
                t.items.shopInfo.imageState = "finished"
                t.emitChange()
            }, 120000);
            return ImageFetch.fetchUpdateDealerImage(data, dealerId)
        }
        t.items.shopInfo.dealerId = this.record.initInfo.userId
        t.items.shopInfo.storeId = this.record.initInfo.storeId
        t.items.shopInfo.imageUrl = {
            origin: ImageFetch.getVirtualDealerUrl() + "/getImage?name=" + this.record.initInfo.storeId + "&action=origin",
            idle: ImageFetch.getVirtualDealerUrl() + "/getImage?name=" + this.record.initInfo.storeId + "&action=idle",
            turn_left: ImageFetch.getVirtualDealerUrl() + "/getImage?name=" + this.record.initInfo.storeId + "&action=turn_left",
            turn_right: ImageFetch.getVirtualDealerUrl() + "/getImage?name=" + this.record.initInfo.storeId + "&action=turn_right",
            speak: ImageFetch.getVirtualDealerUrl() + "/getImage?name=" + this.record.initInfo.storeId + "&action=speak",
            nod: ImageFetch.getVirtualDealerUrl() + "/getImage?name=" + this.record.initInfo.storeId + "&action=nod",
            shake: ImageFetch.getVirtualDealerUrl() + "/getImage?name=" + this.record.initInfo.storeId + "&action=shake",
        }
        t.items.shopInfo.imageState = "finished"

        response = AccountFetch.fetchGetSelfShop()
        response.then(
            function (response) {
                if (response.status !== 200) {
                    console.log("存在一个问题，状态码为：" + response.status)
                    return
                }
                return response.json()
            }
        ).then(
            function (data) {
                if (data.success) {
                    console.log(data.content)
                    if (data.content.length === 0) {
                        var new_res = AccountFetch.fetchCreateSelfShop({
                            address: "",
                            phone: "",
                        })
                        new_res.then(
                            function (response) {
                                if (response.status !== 200) {
                                    console.log("存在一个问题，状态码为：" + response.status)
                                    return
                                }
                                return response.json()
                            }
                        ).catch(function (err) {
                            console.log(err)
                        })
                        t.items.shopInfo.address = " "
                        t.items.shopInfo.phone = " "
                        t.emitChange()
                    }
                    else {
                        var end = data.content.length - 1
                        t.items.shopInfo.storeId = data.content[end].id
                        t.items.shopInfo.phone = data.content[end].phonenumber
                        t.items.shopInfo.address = data.content[end].address
                        t.emitChange()
                    }
                }
                else {
                    console.log(data.errmsg, 1)
                }
            }
        ).catch(function (err) {
            console.log(err)
        })
    },

    getShopInfoModifyAccess: function () {
        return ShopInfoModifyAccess
    },

    /*change items*/
    handleChange: function (key, value) {
        this.items.shopInfo[key] = value
    },

    finishShopInfoModify: function () {
        var response = null
        console.log(this.items.shopInfo)
        response = AccountFetch.fetchModifySelfShop(this.items.shopInfo)
        response.then(
            function (response) {
                console.log(response)
                if (response.status !== 200) {
                    console.log("存在一个问题，状态码为：" + response.status)
                    return
                }
                return response.json()
            }
        ).then(
            function (data) {
                console.log(data)
                if (data.success) {
                    message.success("修改成功", 1)
                }
                else {
                    message.error("修改失败", 1)
                }
            }
        ).catch(function (err) {
            console.log(err)
        })
    },
})

export default ShopModifyStore

