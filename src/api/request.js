const requestArr = []

module.exports = (name, options = {}, hideLoading = false) => {
  if (!hideLoading && requestArr.length === 0) {
    wx.showLoading({
      mask: true
    })
  }
  requestArr.push(1)

  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: name,
      data: options,
      success: res => {
        resolve(res.result)
      },
      fail: err => {
        wx.showModal({
          title: '请求异常',
          content: err.errMsg,
          showCancel: false,
          confirmText: '好的'
        })
        reject()
      },
      complete: () => {
        requestArr.pop()
        if (requestArr.length === 0) {
          wx.hideLoading()
        }
      }
    })
  })
}