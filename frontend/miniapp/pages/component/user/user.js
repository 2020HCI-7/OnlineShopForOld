// page/component/new-pages/user/user.js
import { cookieRequest } from "../../../api/cookieRequest"
import { hostUrl, imageUrl, addressGet, ordersGet, editOrder } from "../../../api/url"
const app = getApp()
//引入插件：微信同声传译
const plugin = requirePlugin('WechatSI');

var innerAudioContext = wx.createInnerAudioContext();

Page({
  data:{    
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),

    // orders:[
    //   {
    //     number: 12345,
    //     goods: [
    //       {   
    //         thumb: "/image/s4.png",
    //         name: "红豆",
    //         count: 2,
    //       },
    //       {   
    //         thumb: "/image/s4.png",
    //         name: "绿豆",
    //         count: 2,
    //       },
    //     ],
    //     status: "待付款",
    //     money: 123.4,
    //     showPay: true,
    //     logistics: ""
    //   },
    //   {
    //     number: 12345666,
    //     goods: [
    //       {   
    //         thumb: "/image/s4.png",
    //         name: "红豆",
    //         count: 2,
    //       },
    //     ],
    //     status: "已付款",
    //     money: 123.4,
    //     showPay: false,
    //     logistics: "待发货"
    //   }
    // ],
    orders: [],
    saved_orders: [],
    hasAddress:false,
    address:{},
    addressToString: "",
  },
  onLoad(){
    var self = this;
    /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success: function(res){
        self.setData({
          thumb: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
        })
      }
    })

    /**
     * 发起请求获取订单列表信息
     */
    // wx.request({
    //   url: 'http://www.gdfengshuo.com/api/wx/orders.txt',
    //   success(res){
    //     self.setData({
    //       orders: res.data
    //     })
    //   }
    // })

  },
  onShow(){
    var self = this;
    /**
     * 获取本地缓存 地址信息
     */
    // wx.getStorage({
    //   key: 'address',
    //   success: function(res){
    //     var addressToString =
    //       "姓名:" + res.data.name + 
    //       " 手机号:" + res.data.phone + 
    //       " 地址:" + res.data.detail
    //     var len = 40
    //     if (addressToString.length > len) {
    //       addressToString = addressToString.substring(0, len);
    //       addressToString = addressToString + "..."
    //     }
        
    //     self.setData({
    //       hasAddress: true,
    //       address: res.data,
    //       addressToString: addressToString
    //     })
    //   }
    // })

    // 得到地址信息
    var requestInfo = {
      clearCookie: false,
      url: hostUrl + addressGet,
      method: "GET",
      success: function(res) { 
        var addresses = res.data.content
        if (addresses.length != 0) {
          var address = addresses[0]
          var temp = {}
          temp.name = address.receivername
          temp.phone = address.phonenumber
          temp.detail = address.address

          var addressToString =
            "姓名:" + temp.name + 
            " 手机号:" + temp.phone + 
            " 地址:" + temp.detail
          var len = 40
          if (addressToString.length > len) {
            addressToString = addressToString.substring(0, len);
            addressToString = addressToString + "..."
          }

          self.setData({
            address: temp,
            hasAddress: true,
            addressToString: addressToString
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {}
    }
    cookieRequest(requestInfo);

    //得到订单信息
    requestInfo = {
      clearCookie: false,
      url: hostUrl + ordersGet,
      method: "GET",
      success: function(res) {
        var orders = res.data.content;
        console.log(res)
        // console.log(orders)
        var saved_orders = []

        var tempOrders = []
        for (var i = 0; i < orders.length; i++) {
          var order = orders[i].order;
          var goods = orders[i].goods;
          var items = orders[i].items;
          var temp = {}

          temp.number = order.id
          temp.status = self.translateStatus(order.status)
          temp.money = order.finalmoney
          temp.showPay = (order.status == 0)
          temp.logistics = order.comment

          var tempGoods = []
          for (var j = 0; j < goods.length; j++) {
            tempGoods.push({
              thumb: hostUrl + imageUrl + "?id=" + goods[j].id.toString() + '0',
              name: goods[j].goodname,
              count: items[j].number
            })
          }
          temp.goods = tempGoods

          tempOrders.push(temp)
          saved_orders.push(order)
        }
        
        self.setData({
          orders: tempOrders,
          saved_orders: saved_orders
        })
      },
      fail: function(res) {},
      complete: function(res) {}

    }
    cookieRequest(requestInfo);

    //得到用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  translateStatus: function(status) {
    if (status == 0) {
      return "待付款";
    }
    else if (status == 1) {
      return "已付款";
    }
    else if (status == 2) {
      return "已发货";
    }
    else if (status == 3) {
      return "已完成";
    }
    else if (status == 4) {
      return "客户取消"
    }
    else if (status == 5) {
      return "商家取消"
    }
    else if (status == 6) {
      return "管理员取消"
    }
  },

  /**
   * 发起支付请求
   */
  payOrders(e){
    var self = this
    var id = e.target.id
    var target_order = null

    for (var i = 0; i < self.data.saved_orders.length; i++) {
      var order = self.data.saved_orders[i]
      if (order.id == id) {
        target_order = order
      }
    }
    target_order.status = 1

    var requestInfo = {
      clearCookie: false,
      url: hostUrl + editOrder,
      method: "POST",
      data: target_order,
      success: function(res) {
        wx.showModal({
          title:'支付提示',
          content:'支付成功',
          showCancel: false
        })
        self.onShow()
      },
      fail: function(res) {},
      complete: function(res) {}
    }
    cookieRequest(requestInfo);
  },

  //尝试获得用户信息
  getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
  // 播报订单信息
  bindTapBroadcast(e) {
    if (innerAudioContext.src === "") {
      var self = this

      var text = "接下来为您播报订单数据："
      for (var i = 0; i < this.data.orders.length; i++) {
        text += "第" + (i+1).toString() + "个订单,"
        var order = this.data.orders[i]
        console.log(order)
        text += "订单编号：Y" + order.number.toString() + ";"
        var goods = order.goods
        for (var j = 0; j < goods.length; j++) {
          var good = goods[j]
          text += "商品名称：" + good.name + ";"
          text += "商品数量：" + good.count.toString() + "个;"
        }
        text += "商品总价：" + order.money.toString() + "元;"
      }

      plugin.textToSpeech({
        lang: "zh_CN",
        tts: true,
        content: text,
        success: function(res) {
          innerAudioContext.src = res.filename
          innerAudioContext.play()
        },
        fail: function(res) {
            //console.log("fail tts", res)
            console.log("translate speech fail:", ReadableStream)
        }
      })
    }
    else {
      innerAudioContext.play()
    }
  },

})