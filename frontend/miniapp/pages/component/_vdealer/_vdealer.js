// pages/component/_vdealer/_vdealer.js
import {vdealerUrl} from "../../../api/url"

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    storeId:{
      type: String,
      observer: function (newVal, oldVal) {
        this.changeState("idle")
      }
    },
    state : {
      type: String,
      observer: function (newVal, oldVal) {
        // console.log(newVal)
        this.changeState(newVal)
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    downloadPicturePath: "",
    url : "",
  },

  /**
   * 组件生命周期函数
   */
  lifetimes: {
    attached: function () {
      this.changeState(this.data.state)
    },
    moved: function () {
      this.changeState(this.data.state)
    },
    detached: function () {
      this.changeState(this.data.state)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeState: function(newState) {
      if(
        newState === "idle" ||
        newState === "speak" ||
        newState === "nod" ||
        newState === "shake" ||
        newState === "turn_left" ||
        newState === "turn_right" 
      )
      {
        this.setData({
          state : newState,
          url : vdealerUrl + "?name=" + this.data.storeId + "&action=" + newState,
        }, () => {
          var localStorage = wx.getStorageSync(this.data.storeId+ "&" + newState)
          // console.log(localStorage)
          if( localStorage === undefined || localStorage === "") {
            this.download(newState)
          }
          else {
            this.setData({
              downloadPicturePath: localStorage
            })
          }
        })

        return true
      }
      else {
        return false
      }
    },

    download: function(newState) {
      // console.log(this.data.url)
      var that = this
      wx.downloadFile({
        url: this.data.url,
        success: function (res) {
          if (res.statusCode === 200) {
            that.setData({
              downloadPicturePath: res.tempFilePath
            })
            wx.setStorageSync(that.data.storeId+ "&" + newState, res.tempFilePath)
          }
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
  },
})


