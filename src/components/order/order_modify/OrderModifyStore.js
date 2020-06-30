import OrderFetch from "../../../public_service/order/OrderFetch"
import { message } from 'antd'
var EventEmitter = require("events").EventEmitter
var assign = require("object-assign")

const AdminToAllOrderAccess = {
    orderId: false,
    status: false,
    consumerId: false,
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

const DealerToUnpaidOrderAccess = {
    orderId: false,
    status: ["商家取消"],
    consumerId: false,
    time: false,
    adressee: false,
    adresseePhone: false,
    freightCharge: true,
    destination: true,
    deliveryFirm: true,
    id: false,
    amount: true,
    price: true,
}

const DealerToPaidOrderAccess = {
    orderId: false,
    status: ["已发货", "商家取消"],
    consumerId: false,
    time: false,
    adressee: false,
    adresseePhone: false,
    freightCharge: true,
    destination: false,
    deliveryFirm: true,
    id: false,
    amount: false,
    price: false,
}

const DealerToDefaultOrderAccess = {
    orderId: false,
    status: false,
    consumerId: false,
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
        this.record.initInfo = initInfo
        console.log(initInfo)

        this.getOrderInfo()
        this.getOrderInfoModifyAccess(this.record.initInfo.userRole, this.items.orderInfo.status)
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
        var t = this
        var response = OrderFetch.fetchGetOrderList()
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
                    console.log(data)
                    // t.items.orderItems = data.order.orderItems.map((item, index) =>{
                    //     item["key"] = index
                    //     return item
                    // })
                    data.content.map((item) => {
                        if (item.order.id === t.record.initInfo.orderId) {
                            t.items.orderInfo["orderId"] = item.order.id
                            t.items.orderInfo["status"] = t.stringStatus(item.order.status)
                            t.items.orderInfo["consumerId"] = item.order.userId
                            t.items.orderInfo["time"] = item.order.date
                            t.record.order = item.order

                            t.items.deliveryInfo = {}
                            t.items.deliveryInfo["consumerId"] = item.address.userId
                            t.items.deliveryInfo["adressee"] = item.address.receivername
                            t.items.deliveryInfo["adresseePhone"] = item.address.phonenumber
                            t.items.deliveryInfo["destination"] = item.address.address
                            
                            t.items.orderItems = []
                            item.goods.map((good, index) => {
                                var temp = {}
                                temp["id"] = good.id
                                temp["name"] = good.goodname
                                temp["amount"] = item.items[index].number
                                temp["price"] = good.leastPrice
                                t.items.orderItems.push(temp)
                            })
                            

                            t.items.orderInfoModifyAccess = t.getOrderInfoModifyAccess(t.record.initInfo.userRole, t.items.orderInfo.status)
                        }
                        return item
                    })
                    t.emitChange()
                }
                else {
                    console.log(data.errmsg)
                }
            }
        ).catch(function (err) {
            console.log(err)
        })
    },

    getOrderInfoModifyAccess: function (userRole, status) {
        var returnAccess = null
        if (userRole === "admin") {
            returnAccess = AdminToAllOrderAccess
        }
        else {
            switch (status) {
                case "未付款":
                    returnAccess = DealerToUnpaidOrderAccess
                    break
                case "已付款":
                    returnAccess = DealerToPaidOrderAccess
                    break
                default:
                    returnAccess = DealerToDefaultOrderAccess
                    break
            }
        }
        console.log(userRole, status)
        this.items.orderInfoModifyAccess = returnAccess
        return returnAccess
    },

    /*change items key:orderItems-2*/
    handleChange: function (key, value) {
        
        console.log(key)
        var object = key.slice(0, key.lastIndexOf('-'))
        var object_key = key.slice(key.lastIndexOf('-') + 1)
        console.log(value)
        switch (object) {
            case "orderInfo":
                this.items.orderInfo[object_key] = value
                break
            case "deliveryInfo":
                //console.log("?????")
                this.items.deliveryInfo[object_key] = value
                break
            case "orderItems":
                this.items.orderItems[object_key].price = value
                break
            default:
                break
        }
    },

    finishOrderInfoModify: function () {
        console.log(this.items.orderInfo)

        var response = null
        var t = this
        t.record.order.status = this.numberStatus(this.items.orderInfo.status)
        
        response = OrderFetch.fetchModifyOrderInfo(t.record.order)
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

    stringTime: function (time) {
        var date = new Date(time)
        var YY = date.getFullYear() + '-'
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
        return YY + MM + DD + " " + hh + mm + ss
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
    },

    numberStatus: function (status) {
        switch (status) {
            case "未付款":
                return 0
            case "已付款":
                return 1
            case "已发货":
                return 2
            case "已完成":
                return 3
            case "用户取消":
                return 4
            case "商家取消":
                return 5
            case "管理员取消":
                return 6
            default:
                return undefined
        }
    }
})

export default OrderModifyStore

