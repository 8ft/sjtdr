const request = require('./api/request.js')
const util = require('./utils/util.js')
const stores = require('./stores/index')

App({
  stores: stores,
  request: request,
  util: util,

  onLaunch: function () {
    wx.cloud.init({
      env: 'test-500t',
      traceUser: true,
    })
  },

  checkLogin: function () {
    if (!this.stores.account.logged_in) {
      wx.navigateTo({
        url: '/pages/user/wxLogin/index',
      })
    } else {
      return true
    }
  }
})