// page/component/details/details.js
Page({
  onReady: function(e) {
    this.audioContext = wx.createAudioContext("ItemAudio")
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
        image: '/image/goods1.png',
        title: '新鲜梨',
        price: 1.23,
        stock: '有货',
        detail: '这是新鲜梨的详细信息',
        parameter: '一份一个，一个125g',
        service: '不支持退货',
        serviceNumber: "13456789012",
        serviceWechat: "hsc10705581",
      },
      {
        id: 1,
        image: '/image/s5.png',
        title: '芹菜',
        price: 15.23,
        stock: '有货',
        detail: '这是芹菜的详细信息',
        parameter: '一份500g',
        service: '不支持退货',
        serviceNumber: "10002132100",
        serviceWechat: "hsc10705581",
      },
      {
        id: 2,
        image: '/image/s4.png',
        title: '红豆',
        price: 1.23,
        stock: '有货',
        detail: '这是红豆的详细信息',
        parameter: '一份500g',
        service: '不支持退货',
        serviceNumber: "13456789012",
        serviceWechat: "hsc10705581",
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

    audioPoster: "s",
    audioName: "now",
    audioAuthor: "pyq",
    audioSrc: "",

    videoSrc: "",
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
  }
 
})