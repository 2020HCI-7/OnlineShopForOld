// page/component/new-pages/user/address/address.js
import { cookieRequest } from "../../../api/cookieRequest"
import { addressAdd, hostUrl, addressGet } from "../../../api/url"
const app = getApp();
Page({
  data:{
    address:{
      name:'',
      phone:'',
      detail:''
    },
    addressId: -1,
  },
  onLoad(){
    var self = this;
    
    // wx.getStorage({
    //   key: 'address',
    //   success: function(res){
    //     self.setData({
    //       address : res.data
    //     })
    //   }
    // })
    var requestInfo = {
      clearCookie: false,
      url: hostUrl + addressGet,
      method: "GET",
      success: function(res) { 
        var addresses = res.data.content
        
        if (addresses.length != 0) {
          var address = addresses[0]

          var temp = {}
          temp.name = address.receivername
          temp.phone = address.phonenumber
          temp.detail = address.address

          self.setData({
            address: temp,
            addressId: address.id
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {}
    }
    cookieRequest(requestInfo);
  },
  formSubmit(e){
    const value = e.detail.value;
    if (value.name && value.phone && value.detail){
      var address = {
        address: value.detail,
        phonenumber: value.phone,
        receivername: value.name
      }
      if (this.data.addressId != -1) {
        address.id = this.data.addressId
      }
      var requestInfo = {
        clearCookie: false,
        url: hostUrl + addressAdd,
        method: "POST",
        data: address,
        success: function(res) { wx.navigateBack(); },
        fail: function(res) {},
        complete: function(res) {}
      }
      cookieRequest(requestInfo);
      // wx.setStorage({
      //   key: 'address',
      //   data: value,
      //   success(){
      //     wx.navigateBack();
      //   }
      // })
    }else{
      wx.showModal({
        title:'提示',
        content:'请填写完整资料',
        showCancel:false
      })
    }
  }
})