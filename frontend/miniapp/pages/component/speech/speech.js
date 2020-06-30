// pages/component/speech/speech.js
import { cookieRequest } from "../../../api/cookieRequest"
import { hostUrl, soundBuy } from "../../../api/url"

const app = getApp();
//引入插件：微信同声传译
const plugin = requirePlugin('WechatSI');
//获取全局唯一的语音识别管理器recordRecoManager
const manager = plugin.getRecordRecognitionManager();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //语音
    recordState: false, //录音状态
    content:'',//内容
    userInput:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //识别语音
    this.initRecord();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  //识别语音 -- 初始化
  initRecord: function () {
    const that = this;
    // 有新的识别内容返回，则会调用此事件
    manager.onRecognize = function (res) {
      console.log(res)
    }
    // 正常开始录音识别时会调用此事件
    manager.onStart = function (res) {
      console.log("成功开始录音识别", res)
    }
    // 识别错误事件
    manager.onError = function (res) {
      console.error("error msg", res)
    }
    //识别结束事件
    manager.onStop = function (res) {
      console.log('..............结束录音')
      console.log('录音临时文件地址 -->' + res.tempFilePath); 
      console.log('录音总时长 -->' + res.duration + 'ms'); 
      console.log('文件大小 --> ' + res.fileSize + 'B');
      console.log('语音内容 --> ' + res.result);
      if (res.result == '') {
        wx.showModal({
          title: '提示',
          content: '听不清楚，请重新说一遍！',
          showCancel: false,
          success: function (res) {}
        })
        return;
      }
      var text = that.data.userInput + res.result;
      that.setData({
          userInput: text
      })
    }
  },  

  bindInputChange: function (e) {
    this.setData({
      userInput: e.detail.value
    })
  },

  //语音  --按住说话
  touchStart: function (e) {
    this.setData({
      recordState: true
    })
    // 语音开始识别
    manager.start({
      lang: 'zh_CN',// 识别的语言，目前支持zh_CN en_US zh_HK sichuanhua
    })
  },
  //语音  --松开结束
  touchEnd: function (e) {
    this.setData({
      recordState: false
    })
    // 语音结束识别
    manager.stop();
  },
  bindSpeechShopping: function () {
    var self = this
    var requestInfo = {
      clearCookie: false,
      // url: hostUrl + soundBuy + "?sound=" + self.data.userInput,
      url: hostUrl + soundBuy,
      method: "POST",
      data: {
        sound: self.data.userInput
      },
      success: function (res) {

      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) {
        //console.log(res)
      }
    }
    cookieRequest(requestInfo);
    wx.switchTab({
      url: "cart/cart",
      success: function(res){

      }
    })
  },
})