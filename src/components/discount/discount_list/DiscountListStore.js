import DiscountFetch from "../../../public_service/discount/DiscountFetch"
import AppDispatcher from "../../../dispatcher/AppDispatcher";
import { message } from "antd"

var EventEmitter = require("events").EventEmitter
var assign = require("object-assign")

var DiscountListStore = assign({}, EventEmitter.prototype,{
    items: {
        discountList: null,
    },

    record: {
        initInfo: null,
    },

    emitChange: function () {
        this.emit("change")
    },
    
    addChangeListener: function(callback) {
        this.on("change", callback)
    },
    
    removeChangeListener: function(callback) {
        this.removeListener("change", callback)
    },

    getItems: function(){
        return this.items
    },

    init: function(initInfo){
        this.record.initInfo = initInfo
        this.getDiscountList(this.record.initInfo.storeId)
    },

    getDiscountList(storeId) {
        var response = DiscountFetch.fetchGetDiscountList(storeId)
        var t=this
        response.then(
            function(response){
                console.log(response)
                if(response.status !== 200){
                    console.log("存在一个问题，状态码为：" + response.status)
                    return
                }
                return response.json()
            }
        ).then(
            function(data){
                console.log(data)
                if(data.success){
                    t.items.discountList = data.content.map((item, index) => {
                        console.log(item)
                        item["key"] = index
                        item["id"] = item.id
                        item["up"] = item.man
                        item["dis"] = item.jian
                        return item
                    })
                    t.emitChange()
                }
                else{
                    console.log(data.errmsg)
                }
                return data.success
            }
        ).catch(function(err){
            console.log(err)
        })
        return
    },

    deleteDiscount(discount) {
        var t = this
        var response = DiscountFetch.fetchDeleteDiscount(discount)
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
                    message.success("删除成功", 1)
                    AppDispatcher.dispatch({
                        actionType: "DISCOUNT_LIST_INIT",
                        initInfo: t.record.initInfo,
                    })

                } else {
                    console.log(data.errmsg)
                    message.error("删除失败", 1)
                }
                return data.success
            }
        ).catch(function (err) {
            console.log(err)
        })
    }
})

export default DiscountListStore

