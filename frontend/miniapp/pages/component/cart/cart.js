// page/component/new-pages/cart/cart.js
import { cookieRequest } from "../../../api/cookieRequest"
import { hostUrl, imageUrl, userCart, cartEdit, cartDelete } from "../../../api/url"
const app = getApp();

Page({
  data: {
    carts:[],               // 购物车列表
    hasList:false,          // 列表是否有数据
    totalPrice:0,           // 总价，初始为0
    selectAllStatus:true,    // 全选状态，默认全选
    obj:{
        name:"hello"
    }
  },
  onShow() {
    // this.setData({
    //   hasList: true,
    //   carts:[
    //     {id:1,title:'芹菜',image:'/image/s5.png',num:4,price:0.01,selected:true},
    //     {id:2,title:'大米',image:'/image/s6.png',num:1,price:0.03,selected:true},
    //     {id:2,title:'大米',image:'/image/s6.png',num:1,price:0.03,selected:true},
    //     {id:2,title:'大米',image:'/image/s6.png',num:1,price:0.03,selected:true},
    //     {id:2,title:'大米',image:'/image/s6.png',num:1,price:0.03,selected:true},
    //     {id:2,title:'大米',image:'/image/s6.png',num:1,price:0.03,selected:true},
    //     {id:2,title:'大米',image:'/image/s6.png',num:1,price:0.03,selected:true},
    //     {id:2,title:'大米',image:'/image/s6.png',num:1,price:0.03,selected:true},
    //     {id:2,title:'大米',image:'/image/s6.png',num:1,price:0.03,selected:true},
    //     {id:2,title:'大米',image:'/image/s6.png',num:1,price:0.03,selected:true},
    //     {id:2,title:'大米',image:'/image/s6.png',num:1,price:0.03,selected:true},
    //     {id:2,title:'大米',image:'/image/s6.png',num:1,price:0.03,selected:true}
    //   ]
    // });
    var that = this;
    var requestInfo = {
      clearCookie: false,
      url: hostUrl + userCart,
      method: "POST",
      success: function(res) {
        //console.log(res)
        var goods = res.data.content;

        var carts = []
        for (var i = 0; i < goods.length; i++) {
          var cart = goods[i].cart
          var good = goods[i].good

          var temp = {}
          temp.id = cart.id
          temp.num = cart.number
          temp.image = hostUrl + imageUrl + "?id=" + good.id.toString() + '0'
          temp.selected = cart.selected

          temp.title = good.goodname
          temp.price = good.normalPrice

          temp.userId = cart.userId
          temp.goodId = cart.goodId

          carts.push(temp)
        }
        that.setData({
          carts: carts
        })
        if (carts.length != 0) {
          that.setData({
            hasList: true
          })
        }
        else {
          that.setData({
            hasList: false
          })
        }
        that.getTotalPrice();
      },
      fail: function(res) {},
      complete: function(res) {}
    }
    cookieRequest(requestInfo)

  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();

    var requestInfo = {
      clearCookie: false,
      url: hostUrl + cartEdit,
      method: "POST",
      data: {
        id: carts[index].id,
        userId: carts[index].userId,
        goodId: carts[index].goodId,
        selected: !selected,
        number: carts[index].num
      },
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {}
    }
    cookieRequest(requestInfo)
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const cart = carts[index]
    carts.splice(index,1);
    this.setData({
      carts: carts
    });
    if(!carts.length){
      this.setData({
        hasList: false
      });
    }else{
      this.getTotalPrice();
    }
    
    var requestInfo = {
      clearCookie: false,
      url: hostUrl + cartDelete + "?cartId=" + cart.id,
      method: "GET",
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {}
    }
    cookieRequest(requestInfo)
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
      var requestInfo = {
        clearCookie: false,
        url: hostUrl + cartEdit,
        method: "POST",
        data: {
          id: carts[i].id,
          userId: carts[i].userId,
          goodId: carts[i].goodId,
          selected: selectAllStatus,
          number: carts[i].num
        },
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {}
      }
      cookieRequest(requestInfo)
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();

    var requestInfo = {
      clearCookie: false,
      url: hostUrl + cartEdit,
      method: "POST",
      data: {
        id: carts[i].id,
        userId: carts[i].userId,
        goodId: carts[i].goodId,
        selected: carts[i].selected,
        number: num
      },
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {}
    }
    cookieRequest(requestInfo)
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts;
    let num = carts[index].num;
    if(num <= 1){
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();

    var requestInfo = {
      clearCookie: false,
      url: hostUrl + cartEdit,
      method: "POST",
      data: {
        id: carts[i].id,
        userId: carts[i].userId,
        goodId: carts[i].goodId,
        selected: carts[i].selected,
        number: num
      },
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {}
    }
    cookieRequest(requestInfo)
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for(let i = 0; i<carts.length; i++) {         // 循环列表得到每个数据
      if(carts[i].selected) {                     // 判断选中才会计算价格
        total += carts[i].num * carts[i].price;   // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },

  bindMakeOrder(e) {
    wx.navigateTo({
      url: "/pages/component/orders/orders",
    })
  }

})