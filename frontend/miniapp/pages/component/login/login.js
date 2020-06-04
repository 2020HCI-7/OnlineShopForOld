// pages/login/login.js
import { cookieRequest } from "../../../api/cookieRequest"
import {hostUrl, loginUrl} from "../../../api/url"

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    usernameKey : "username",
    usernamePlaceholder: "请输入用户名(3~10个字符)",
    passwordKey : "password",
    passwordPlaceholder: "请输入密码(6~15个字符)",
    toRegisterLinkKey: "toRegisterLink",
    toRegisterLinkText: "注册",
    finishLoginButtonKey: "finishLogin",
    finishLoginButtonPlaceholder: "登录",
  },

  /**
   * 模型层记录的数据
   */
  record: {
    username: "",
    password: "",
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

  },

  checkInput: function () {
    if (this.record["username"].length < 3 || this.record["username"].length > 10) {
      wx.showToast({
        title: "用户名格式错误",
        icon: "none",
        duration: 1000,
      })
      return false
    }
    if (this.record["password"].length < 6 || this.record["password"].length > 15) {
      wx.showToast({
        title: "密码格式错误",
        icon: "none",
        duration: 1000,
      })
      return false
    }
    
    return true
  },

  handleChange: function(e){
    switch (e.detail["key"]){
      case this.data.usernameKey:
        this.record[this.data.usernameKey] = e.detail["value"]
        break
      case this.data.passwordKey:
        this.record[this.data.passwordKey] = e.detail["value"]
        break
      default:
        console.log(e)
    }
  },

  toRegisterLink: function (e) {
    if (e.detail["value"]) {
      wx.redirectTo({
        url: "../register/register",
      })
    }
  },

  finishLogin: function(e){
    if(e.detail["value"] = true){
      if(this.checkInput()){
        var requestInfo = {
          url: hostUrl + loginUrl,
          method: "POST",
          setCookie: true,
          data: {
            username: this.record.username,
            password: this.record.password,
          },
          success: function (res) {
            if(res.data.success){
              app.setGlobalData({
                hasLogin: true,
              })
              wx.reLaunch({
                url: "/pages/component/index"
              })
            }
            else{
              wx.showToast({
                title: "登录失败",
                icon: "none",
                duration: 2000,//持续的时间
              })
            }
          },
          fali: function (res) {
            wx.showToast({
              title: "登录失败",
              icon: "none",
              duration: 2000,//持续的时间
            })
          },
          complete: function (res) {
          }
        }
        cookieRequest(requestInfo)
      }
    }
  }
});