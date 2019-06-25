const upload = (cloudPath, filePath) => {
  return new Promise((resolve, reject) => {
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: res => {
        resolve(res.fileID)
      },
      fail: e => {
        wx.showToast({
          icon: 'none',
          title: '上传失败',
        })
        reject()
      }
    })
  })
}

module.exports = (cloudPath, count) => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: count,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
          mask: true
        })

        let promises = []
        if (count > 1) {
          res.tempFilePaths.forEach((file, index) => {
            promises.push(upload(`${cloudPath}${index}${file.match(/\.[^.]+?$/)[0]}`, file))
          })
        } else {
          promises.push(upload(cloudPath, file))
        }

        Promise.all(promises).then(result => {
          resolve(result)
          wx.hideLoading()
        }).catch((error) => {
          reject()
          wx.hideLoading()
        })
      },
      fail: e => {
        reject()
      }
    })
  })
}