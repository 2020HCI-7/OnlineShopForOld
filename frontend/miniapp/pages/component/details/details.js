// page/component/details/details.js
const app = getApp();
//引入插件：微信同声传译
const plugin = requirePlugin('WechatSI');

var innerAudioContext = wx.createInnerAudioContext();

Page({
  onReady: function(e) {
    //this.innerAudioContext = wx.createAudioContext("ItemAudio")
    this.videoContext = wx.createVideoContext("VirtualAvatar")
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
    goods: [
      {
        id: 0,
        image: '../../../image/goods1.png',
        title: '新鲜梨',
        price: 1.23,
        stock: '有货',
        detail: '这是新鲜梨的详细信息',
        parameter: '一份一个，一个125g',
        service: '不支持退货',
        serviceNumber: "13456789012",
        serviceWechat: "hsc10705581",
        speech: "",
      },
      {
        id: 1,
        image: '../../../image/s5.png',
        title: '芹菜',
        price: 15.23,
        stock: '有货',
        detail: '这是芹菜的详细信息',
        parameter: '一份500g',
        service: '不支持退货',
        serviceNumber: "10002132100",
        serviceWechat: "hsc10705581",
        speech: "",
      },
      {
        id: 2,
        image: '../../../image/s4.png',
        title: '红豆',
        price: 1.23,
        stock: '有货',
        detail: '这是红豆的详细信息',
        parameter: '一份500g',
        service: '不支持退货',
        serviceNumber: "13456789012",
        serviceWechat: "hsc10705581",
        speech: "",
      }
    ],
    curGoodIndex: 0,
    goodAutoPlay: false,
    goodSwiperInterval: 5000,

    tabIndex: 0,

    goodsAmount: 1,
    inCartNum: 0,
    showToCartAnim: false,
    scaleCart: false,
    hasCarts: false,

    videoSrc: "",
  },

  onLoad() {
    // 将来改成从后端获取数据
    var goods = this.data.goods 
    for (var i = 0; i < goods.length; i++) {
      var good = goods[i]
      var text = "商品名称：" + good.title + ";商品详情：" + good.detail + ";"
      var saved_index = i
    }
  },

  onShow() {

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
    if (e.currentTarget.dataset.type === "left") {
      result = result - 1
    }
    else if (e.currentTarget.dataset.type === "right") {
      result = result + 1
    }
    if (result < 0) {
      result = 0
    }
    else if (result >= amount)
    {
      result = amount-1
    }
    this.setData({
      curGoodIndex: result
    })
  },

  bindTapPlaySpeech(e) {
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
  }
 
})