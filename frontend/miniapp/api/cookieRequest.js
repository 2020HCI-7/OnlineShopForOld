/*
 * 使用方法：配置一个requestInfo，然后发出请求
    var requestInfo = {
      url: "https://www.baidu.com",
      method: "GET",
      data: {name: ****}
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
      setCookie: true,//可选项，当设为true时会改变会根据返回头改变cookie，在自动登录时需要设定为true
      clearCookie: true,//可选项，当设为true时将在请求前清空cookie，在退出登录时需要设定为true
    }
    cookieRequest(requestInfo)
 */

const cookieRequest = function (requestInfo) {
  var obj = {}
  obj.url = requestInfo.url
  obj.method = requestInfo.method
  obj.data = requestInfo.data
  //设置cookie缓存
  obj.fail = function (err) {
    requestInfo.fail(err)
  }

  obj.success = function (res) {
    if (requestInfo.setCookie){
      // console.log(res.header)
      // console.log(res.header['Set-Cookie'])
      wx.setStorageSync("cookie", res.header['Set-Cookie'])
    }
    requestInfo.success(res)
  }

  obj.complete = function (res) {
    if (requestInfo.setCookie){
      wx.clearStorageSync("cookie")
      try {
        wx.setStorageSync("cookie", res.header['Set-Cookie'])
      } catch (e) { console.log(e) }
      // console.log(res.header['Set-Cookie'])
      // console.log(wx.getStorageSync("cookie"))
    }
    requestInfo.complete(res)
  }
  
  obj.header = {
    "Content-Type": "application/json;charset=UTF-8",
    // "cookie": wx.getStorageSync("cookie"),
  }

  if (!requestInfo.setCookie) {
    obj.header.cookie = wx.getStorageSync("cookie")
  }

  obj.dataType = "json"
  obj.responseType = "text"

  if(requestInfo.clearCookie){
    wx.clearStorageSync("cookie")
  }

  wx.request(obj)
}

module.exports = {
  cookieRequest: cookieRequest
}