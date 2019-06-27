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
    date: '2016-09-01',

    currentType: 2,
    types: [
      {
        id: 0,
        name: '交通',
        icon: 'car'
      },
      {
        id: 1,
        name: '娱乐',
        icon: 'fun'
      },
      {
        id: 2,
        name: '饮食',
        icon: 'food'
      },
      {
        id: 3,
        name: '收入',
        icon: 'income'
      },
      {
        id: 4,
        name: '购物',
        icon: 'shopping'
      }
    ],

    keys: [
      { val: '1', type: 'num' },
      { val: '2', type: 'num' },
      { val: '3', type: 'num' },
      { val: '*', type: 'calculate' },
      { val: '4', type: 'num' },
      { val: '5', type: 'num' },
      { val: '6', type: 'num' },
      { val: '+', type: 'calculate' },
      { val: '7', type: 'num' },
      { val: '8', type: 'num' },
      { val: '9', type: 'num' },
      { val: '=', type: 'calculate' },
      { val: '.', type: 'point' },
      { val: '0', type: 'num' },
      { val: 'del', type: 'del' },
      { val: '确认', type: 'confirm' }
    ]
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

  getNavHeight(e) {
    const systemInfo = wx.getSystemInfoSync()
    const ratio = systemInfo.windowWidth / 750

    const swiperHeight = systemInfo.windowHeight - e.detail.height
    const cellHeight = systemInfo.windowWidth / 4
    const dataHeight = swiperHeight -systemInfo.windowWidth- 160 * ratio

    this.setData({
      swiperHeight: swiperHeight,
      dataHeight: dataHeight,
      cellHeight: cellHeight
    })
  },

  typeChange(e) {
    const current = e.currentTarget.dataset.index
    if (current === this.data.currentType) return
    this.setData({
      currentType: current
    })
  },

  onShareAppMessage(res) {
    return {
      title: '理财，从蒜账开始',
      imageUrl: '/assets/img/logo.png'
    }
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
  doUpload: async function () {
    let res = await upload('tianxiang/', 2)
    console.log(res)
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  }

}))
