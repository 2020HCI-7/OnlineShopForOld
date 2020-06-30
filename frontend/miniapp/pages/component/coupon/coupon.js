// pages/component/coupon/coupon.js
import { cookieRequest } from "../../../api/cookieRequest"
import { hostUrl,getUserDiscount } from "../../../api/url"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupons: [
      {
        number: 666,
        thumb: "/image/s1.png",
        name: "满减券",
        count: 2,
        describe: "满666减66",
        end: "2020-5-20"
      },
      {
        number: 777,
        thumb: "/image/s1.png",
        name: "满减券",
        count: 5,
        describe: "满777减77",
        end: "2020-5-21"
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var self = this
    var requestInfo = {
      clearCookie: false,
      url: hostUrl + getUserDiscount,
      method: "GET",
      success: function(res) {
        var discounts = []
        for (var i = 0; i < res.data.content.length; i++) {
          var discount = res.data.content[i]
          discount.number = discount.id
          discount.thumb = "/image/s1.png"
          discount.name = "满减卷"
          discount.count = 1
          discount.describe = "满"+ discount.man + "减" + discount.jian
          discounts.push(discount)
        }
        self.setData({
          coupons: discounts
        })
      },
      fail: function(res) {},
      complete: function(res) {}
    }
    cookieRequest(requestInfo);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})