// pages/component/_vdealer/_vdealer.js
import {vdealerUrl} from "../../../api/url"

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dealerId:{
      type: String,
    },
    state : {
      type: String,
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
    moved: function () { },
    detached: function () { }
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
        console.log(newState)
        this.setData({
          state : newState,
          url : vdealerUrl + "?name=" + this.data.dealerId + "&action=" + newState,
        }, () => {
          this.download()
        })

        return true
      }
      else {
        return false
      }
    },

    download: function() {
      console.log(this.data.url)
      var that = this
      wx.downloadFile({
        url: this.data.url,
        success: function (res) {
          if (res.statusCode === 200) {
            that.setData({
              downloadPicturePath: res.tempFilePath
            })
          }
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
  },
})


