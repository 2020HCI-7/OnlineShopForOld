import { cookieRequest } from "../../api/cookieRequest"
import { hostUrl, autoBuy } from "../../api/url"
const app = getApp();

Page({
  data: {
    imgUrls: [
      '/image/c2.png',
      '/image/c3.png',
      '/image/c4.png'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
  },

  BindOneClickShopping(params) {
    var requestInfo = {
      clearCookie: false,
      url: hostUrl + autoBuy,
      method: "GET",
      success: function (res) {
        wx.switchTab({
          url: "cart/cart",
          success: function(res){

          }
        })
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) {
        //console.log(res)
      }
    }
    cookieRequest(requestInfo);
  },

  BindVoiceShopping(params) {
    wx.navigateTo({
      url: "speech/speech",
      success: function(res){

      }
    })
  },

  BindMarket(params) {
    wx.navigateTo({
      url: "details/details",
      success: function(res){

      }
    })
  },

  BindAnnounce(params) {
    wx.switchTab({
      url: "user/user",
      success: function(res){

      }
    })
  }

})