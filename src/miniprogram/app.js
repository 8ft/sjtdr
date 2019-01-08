const request = require('./api/request.js')
const util = require('./utils/util.js')
const stores = require('./stores/index')

App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'test-1b298c',
      traceUser: true,
    })
  },

  stores: stores,
  request: request,
  util: util,

  globalData: {
    
  },

  checkLogin: function () {
    if (!this.stores.account.logged_in) {
      wx.navigateTo({
        url: '/pages/user/wxLogin/index',
      })
    } else {
      return true
    }
  },

  bannerJump: function (e) {
    let obj = e.currentTarget.dataset.obj
    if (obj.menuType !== undefined) {
      switch (obj.menuType) {
        case 'view':
          // wx.navigateTo({
          //   url: `/pages/webview/index?url=${encodeURIComponent(obj.menuUrl)}`
          // })
          break;
        case 'click':
          break;
      }
    } else if (obj.type !== undefined) {
      switch (obj.type) {
        case 0:
          wx.navigateTo({
            url: `/packageBlog/pages/detail/index?id=${obj.linkUrl.match(/blog\/(\d*)\.html/)[1]}`
          })
          break;
        case 1:
          break;
      }
    }
  }

})