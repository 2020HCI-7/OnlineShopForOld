// page/component/details/details.js
Page({
  onReady: function(e) {
    this.audioContext = wx.createAudioContext("ItemAudio")
    this.videoContext = wx.createVideoContext("VirtualAvatar")
  },

  data:{
    goods: {
      id: 1,
      image: '/image/goods1.png',
      title: '新鲜梨',
      price: 0.01,
      stock: '有货',
      detail: '这是新鲜梨的详细信息',
      parameter: '一份一个，一个125g',
      service: '不支持退货',
      serviceNumber: "13456789012",
      serviceWechat: "hsc10705581",
    },
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false,
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
    const num = this.data.num;
    let total = this.data.totalNum;

    self.setData({
      show: true
    })
    setTimeout( function() {
      self.setData({
        show: false,
        scaleCart : true
      })
      setTimeout( function() {
        self.setData({
          scaleCart: false,
          hasCarts : true,
          totalNum: num + total
        })
      }, 200)
    }, 300)

  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  }
 
})