// page/component/orders/orders.js
import { cookieRequest } from "../../../api/cookieRequest"
import { hostUrl, imageUrl, userCart, cartClean, addressGet } from "../../../api/url"
const app = getApp();

Page({
  data:{
    address:{},
    hasAddress: false,
    total:0,
    // orders:[
    //     {id:1,title:'新鲜芹菜 半斤',image:'/image/s5.png',num:4,price:0.01},
    //     {id:2,title:'素米 500g',image:'/image/s6.png',num:1,price:0.03}
    //   ]
    orders: [],
    addressId: -1
  },
  
  onShow:function(){
    const self = this;
    // wx.getStorage({
    //   key:'address',
    //   success(res) {
    //     self.setData({
    //       address: res.data,
    //       hasAddress: true
    //     })
    //   }
    // })
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
          self.setData({
            address: temp,
            addressId: address.id,
            hasAddress: true
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {}
    }
    cookieRequest(requestInfo);

    requestInfo = {
      clearCookie: false,
      url: hostUrl + userCart,
      method: "POST",
      success: function(res) {
        var carts = res.data.content;
        var orders = []

        for (var i = 0; i < carts.length; i++) {
          var cart = carts[i].cart
          var good = carts[i].good
          if (cart.selected) {
            var temp = {}
            temp.id = cart.id
            temp.title = good.goodname
            temp.image = hostUrl + imageUrl + "?id=" + good.id.toString() + '0'
            temp.num = cart.number
            temp.price = good.normalPrice
            orders.push(temp)
          }
        }
        self.setData({
          orders: orders
        })
        self.getTotalPrice();
      },
      fail: function(res) {},
      complete: function(res) {}
    }
    cookieRequest(requestInfo);

  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let orders = this.data.orders;
    let total = 0;
    for(let i = 0; i < orders.length; i++) {
      total += orders[i].num * orders[i].price;
    }
    this.setData({
      total: total.toFixed(2)
    })
  },

  toPay() {
    // var cartIds = []
    // var orders = this.data.orders
    // for (var i = 0; i < orders.length; i++) {
    //   cartIds.push(orders[i].id)
    // }

    if (!this.data.hasAddress) {
      wx.showModal({
        title:'提示',
        content:'您还没有填写地址',
        showCancel:false
      })
      return;
    }

    var requestInfo = {
      clearCookie: false,
      url: hostUrl + cartClean,
      method: "POST",
      data: {
        //cartIds: cartIds,
        discountIds: [],
        addressId: this.data.addressId
      },
      success: function(res) {
        wx.switchTab({
          url: '../user/user'
        })
      },
      fail: function(res) {},
      complete: function(res) {}
    }
    cookieRequest(requestInfo);
  }
})