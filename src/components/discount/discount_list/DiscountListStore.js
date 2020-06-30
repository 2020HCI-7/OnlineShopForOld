import DiscountFetch from "../../../public_service/discount/DiscountFetch"
import DiscountToChinese from "../../../public_service/discount/DiscountToChinese"
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
        console.log(initInfo)
        this.record.initInfo = initInfo
        this.getDiscountList(this.record.initInfo.storeId)
    },

    getDiscountList(storeId) {
        
        this.items.discountList = [{
            id: 1,
            up: 10,
            dis: 1,
            key: 1,
        }]
        this.emitChange()
        return
        
        
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
                    t.items.userList = data.content.map((item, index) =>{
                        item["key"] = index
                        item["userRole"] = DiscountToChinese.toChinese(item.userRole)
                        item["status"] = DiscountToChinese.toChinese(item.status)
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
        var response = DiscountFetch.fetchDeleteDiscount(discount)
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
                if (data.success) {
                    message.success("删除成功", 1)
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

