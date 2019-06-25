const app = getApp()
const regeneratorRuntime = require('../../libs/regenerator-runtime.js')
const observer = require('../../libs/observer').observer
const upload = require('../../api/upload.js')

Page(observer({
  props: {
    stores: app.stores
  },
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    date: '2016-09-01'
  },

  onLoad: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: async function () {
    const res = await app.request('login')
    console.log(res)
  },
 
  // 上传图片
  doUpload:async function(){
    let res=await upload('tianxiang/',2)
    console.log(res)
  },

  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  }

}))
