import { cookieRequest } from "./api/cookieRequest"
import { hostUrl, loginUrl} from "./api/url"

App({
  onLaunch: function () {
    console.log('App Launch')
    // this.login()
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },

  globalData: {
    hasLogin: false,
    code: ""
  },

  //tool function
  setGlobalData(newGlobalData){
    Object.keys(newGlobalData).forEach((key)=>{
      this.globalData[key] = newGlobalData[key];
    });
  },

  login() {
    var t = this
    wx.login({
      success (res) {
        console.log(res.code)
        if (res.code) {
          t.setGlobalData({code: res.code})
          var requestBody = {
            code: res.code,
          }
          cookieRequest({
            url: hostUrl + loginUrl,
            method: "POST",
            setCookie: true,
            data: requestBody,
            success(res) {
              if(res.data.success){
                var tempGlobalData = {
                  hasLogin: true,
                }
                t.setGlobalData(tempGlobalData)
                console.log("登录成功")
              }
              else{
                wx.showToast({
                  title: "登录失败",
                  icon: "none",
                  duration: 2000,//持续的时间
                });
                wx.navigateTo({
                  url: '/pages/component/register/register',
                })
              }
            },
            fail(res) {
              wx.showToast({
                title: "登录失败",
                icon: "none",
                duration: 2000,//持续的时间
              });
              wx.navigateTo({
                url: '/pages/component/register/register',
              })
            },
            complete(res) {
              
            }
          });
        } 
        else {
          wx.showToast({
            title: "登录失败",
            icon: "none",
            duration: 2000//持续的时间
          });
          wx.navigateTo({
            url: '/pages/component/register/register',
          });
        }
      },
      fail(res){
        wx.showToast({
          title: "登录失败",
          icon: "none",
          duration: 2000//持续的时间
        });
        wx.navigateTo({
          url: '/pages/component/register/register',
        });
      }
    })
  }
})
