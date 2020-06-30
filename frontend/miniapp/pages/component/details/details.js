// page/component/details/details.js
import { cookieRequest } from "../../../api/cookieRequest"
import { getAllGood, hostUrl, imageUrl, getStoreById, addToCart, userCart, goodSearchByTag, storeDiscount, addDiscount } from "../../../api/url"
const app = getApp();
//引入插件：微信同声传译
const plugin = requirePlugin('WechatSI');

var innerAudioContext = wx.createInnerAudioContext();

Page({
  onReady: function(e) {
    //this.innerAudioContext = wx.createAudioContext("ItemAudio")
    // this.videoContext = wx.createVideoContext("VirtualAvatar")
  },

  data:{
    // goods: {
    //   id: 1,
    //   image: '/image/goods1.png',
    //   title: '新鲜梨',
    //   price: 0.01,
    //   stock: '有货',
    //   detail: '这是新鲜梨的详细信息',
    //   parameter: '一份一个，一个125g',
    //   service: '不支持退货',
    //   serviceNumber: "13456789012",
    //   serviceWechat: "hsc10705581",
    // },
    tag: "",
    goods: [
      {
        id: 0,
        storeId: 0,
        normalPrice: 0.0,
        leastPrice: 0.0,

        image: '../../../image/goods1.png',
        title: '新鲜梨',
        //price: 1.23,
        stock: 30,
        detail: '这是新鲜梨的详细信息',
        parameter: '一份一个，一个125g',
        speech: "",
      },
      {
        id: 1,
        storeId: 0,
        normalPrice: 0.0,
        leastPrice: 0.0,

        image: '../../../image/s5.png',
        title: '芹菜',
        //price: 15.23,
        stock: 30,
        detail: '这是芹菜的详细信息',
        parameter: '一份500g',
        speech: "",
      },
      {
        id: 2,
        storeId: 0,
        normalPrice: 0.0,
        leastPrice: 0.0,

        image: '../../../image/s4.png',
        title: '红豆',
        //price: 1.23,
        stock: 30,
        detail: '这是红豆的详细信息',
        parameter: '一份500g',
        speech: "",
      }
    ],
    stores: {},
    curGoodIndex: 0,
    goodAutoPlay: false,
    goodSwiperInterval: 5000,

    tabIndex: 0,

    goodsAmount: 1,
    inCartNum: 0,
    showToCartAnim: false,
    scaleCart: false,
    hasCarts: false,

    currentStoreId: 0,
    vdealerState: "idle",
  },

  onLoad(options) {
    if (options.id !== undefined) {
      this.setData({
        navigateID: options.id
      })
    }
    if (options.tag !== undefined) {
      this.setData({
        tag: options.tag
      })
    }
    else {
      this.setData({
        tag: ""
      })
    }
  },

  onShow() {
    var that = this;
    var successFunc = function (res) {
      // console.log(res)
      var tempGoods = []
      var goods = res.data.content;
      for (var i = 0; i < goods.length; i++) {
        var tempGood = {}
        var good = goods[i]

        if (good.id == that.data.navigateID) {
          that.setData({
            curGoodIndex: i
          })
        }
        
        tempGood.id = good.id;
        tempGood.storeId = good.storeId;
        tempGood.normalPrice = good.normalPrice;
        tempGood.leastPrice = good.leastPrice;

        tempGood.image = hostUrl + imageUrl + "?id=" + good.id.toString() + '0';
        tempGood.title = good.goodname;
        tempGood.stock = good.storage;
        tempGood.detail = good.description;
        tempGood.parameter = "temp parameter";
        tempGood.speech = "";

        var storeId = good.storeId
        var store = that.data.stores[good.storeId];
        if (store == null) {
          var storeRequestInfo = {
            clearCookie: false,
            url: hostUrl + getStoreById + "?storeid=" + storeId,
            method: "GET",
            success: function(res) {
              var stores = that.data.stores;
              stores[res.data.content.id] = res.data.content;
              that.setData({
                stores: stores,
                currentStoreId: storeId,
                vdealerState: "idle"
              });
              // console.log(that.data.stores);
            },
            fail: function(res) {console.log("get store error")},
            complete: function(res) {}
          }
          cookieRequest(storeRequestInfo)
        }
        tempGoods.push(tempGood);
      }
      that.setData({
        goods: tempGoods
      })
        
      that.getDiscounnt()
    };

    if (this.data.tag == "") {
      var requestInfo = {
        clearCookie: false,
        url: hostUrl + getAllGood,
        method: "GET",
        success: successFunc,
        fail: function (res) {
          console.log(res)
        },
        complete: function (res) {
          //console.log(res)
        }
      }
      cookieRequest(requestInfo);
    }
    else
    {
      var requestInfo = {
        clearCookie: false,
        url: hostUrl + goodSearchByTag,
        method: "POST",
        data: that.data.tag,
        success: successFunc,
        fail: function (res) {
          console.log(res)
        },
        complete: function (res) {
          //console.log(res)
        }
      }
      cookieRequest(requestInfo);
    }
    requestInfo = {
      clearCookie: false,
      url: hostUrl + userCart,
      method: "POST",
      success: function (res) {
        var carts = res.data.content;
        that.setData({
          inCartNum: carts.length
        })
        if (carts.length != 0) {
          that.setData({
            hasCarts : true,
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {}
    }
    cookieRequest(requestInfo);
  },

  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num : num
    })
  },

  addToCart() {
    const self = this;
    const num = this.data.goodsAmount;
    let total = this.data.inCartNum;

    var requestInfo = {
      clearCookie: false,
      url: hostUrl + addToCart,
      method: "POST",
      data: {
        goodId: self.data.goods[self.data.curGoodIndex].id,
        number: 1
      },
      success: function (res) {
        //console.log(res)
        self.setData({
          showToCartAnim: true
        })
        setTimeout( function() {
          self.setData({
            showToCartAnim: false,
            scaleCart : true
          })
          setTimeout( function() {
            self.setData({
              scaleCart: false,
              hasCarts : true,
              inCartNum: num + total
            })
          }, 200)
        }, 300)
      },
      fail: function (res) {
        wx.showToast({
          title: "加入购入车失败",
          icon: "none",
          duration: 2000//持续的时间
        });
      },
      complete: function (res) {}
    }
    cookieRequest(requestInfo)

    var that = this
    this.setData({
      vdealerState: "nod",
    },setTimeout(
      ()=>{
        that.setData({
          vdealerState: "idle"
        })
      },
      1000
    ))
  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      tabIndex: index
    })
  },

  goodSwiperChange(e) {
    this.setData({
      curGoodIndex: e.detail.current
    })
    innerAudioContext.pause()
  },

  bindTapSwitch(e) {
    let result = this.data.curGoodIndex
    let amount = this.data.goods.length
    var changeVdealer = true
    var newState = ""
    if (e.currentTarget.dataset.type === "left") {
      result = result - 1
      newState = "turn_right"
    }
    else if (e.currentTarget.dataset.type === "right") {
      result = result + 1
      newState = "turn_left"
    }
    if (result < 0) {
      result = 0
      changeVdealer = false
    }
    else if (result >= amount)
    {
      result = amount-1
      changeVdealer = false
    }

    this.setData({
      curGoodIndex: result
    })

    var that = this
    if(changeVdealer) {
      this.setData({
        vdealerState: newState,
      },setTimeout(
        ()=>{
          that.setData({
            vdealerState: "idle"
          })
        },
        1000
      ))
    }
  },

  bindTapPlaySpeech(e) {
    var that = this
    innerAudioContext.onEnded(
      () => {
        that.setData({
          vdealerState: "idle"
        })
      }
    )

    this.setData({
      vdealerState: "speak"
    })

    if (this.data.goods[this.data.curGoodIndex].speech === "") {
      var self = this
      var goods = this.data.goods
      var good = goods[self.data.curGoodIndex]
      var text = "商品名称：" + good.title + ";商品详情：" + good.detail + ";"
      plugin.textToSpeech({
        lang: "zh_CN",
        tts: true,
        content: text,
        success: function(res) {
          innerAudioContext.src = res.filename
          innerAudioContext.play()
          goods[self.data.curGoodIndex].speech = res.filename
          self.setData({
            goods: goods
          })
        },
        fail: function(res) {
            //console.log("fail tts", res)
            console.log("translate speech fail:", ReadableStream)
        }
      })
    }
    else {
      innerAudioContext.src = this.data.goods[this.data.curGoodIndex].speech
      innerAudioContext.play()
    }
  },

  getDiscounnt() {
    var requestInfo = {
      clearCookie: false,
      url: hostUrl + storeDiscount + "?storeid=" + this.data.goods[this.data.curGoodIndex].storeId,
      method: "GET",
      success: function (res) {
        if (res.data.content.length == 0)
        {
          // wx.showToast({
          //   title: '没有可以获取的优惠券',
          //   icon: 'none',
          //   duration: 2000
          // })
        }
        else
        {
          for (var i = 0; i < res.data.content.length; i++) 
          {
            var discount = res.data.content[i]
            var req = {
              clearCookie: false,
              url: hostUrl + addDiscount,
              method: "POST",
              data: discount,
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {}
            }
            cookieRequest(req)
          }
          wx.showToast({
            title: '自动获取优惠券',
            icon: 'success',
            duration: 2000
          })
        }
      },
      fail: function (res) {},
      complete: function (res) {}
    }
    cookieRequest(requestInfo)
  }
 
})