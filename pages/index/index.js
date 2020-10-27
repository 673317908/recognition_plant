//index.js

Page({
  data: {

  },
  // 拍照
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res)
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  // 取消上传
  cancelUpload() {
    this.setData({
      src: ""
    })
  },
  // 上传图片
  checkImg() {
    wx.navigateTo({
      url: `../imgResult/index?uploadUrl=${this.data.src}`,
    })
  },
 
  //事件处理函数
  onLoad: function () {
   
  },
})
